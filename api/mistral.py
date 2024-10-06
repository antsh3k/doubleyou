import os
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from mistralai import Mistral
from typing import List
import json

router = APIRouter()

class Message(BaseModel):
    content: str

class Conversation(BaseModel):
    messages: List[dict] = []

class PixtralMessage(BaseModel):
    image_url: str

class MedicalEvent(BaseModel):
    category: str
    disease: str
    chronic: bool
    medication: List[str]
    body_part: List[str]
    date_time: str

class MedicalSummary(BaseModel):
    medical_history: str
    medication_history: str
    current_complaint: str

class SimulationResult(BaseModel):
    next_event: MedicalEvent

async def get_conversation() -> Conversation:
    return Conversation()

@router.post("/mistral")
async def mistral_endpoint(message: Message, conversation: Conversation = Depends(get_conversation)):
    api_key = os.environ.get("MISTRAL_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="MISTRAL_API_KEY not found in environment variables")

    model = "mistral-large-latest"
    client = Mistral(api_key=api_key)

    conversation.messages.append({"role": "user", "content": message.content})

    chat_response = client.chat.complete(
        model=model,
        messages=conversation.messages
    )

    # Add the assistant's message to the conversation history
    conversation.messages.append({"role": "assistant", "content": chat_response.choices[0].message.content})

    return {"response": chat_response.choices[0].message.content}


@router.post("/pixtral")
async def pixtral_endpoint(message: PixtralMessage):
    api_key = os.environ.get("MISTRAL_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="MISTRAL_API_KEY not found in environment variables")

    model = "pixtral-12b-2409"
    client = Mistral(api_key=api_key)

    # Hardcoded prompt
    prompt = """
Extract information from the given document or image to generate structured data. The extraction includes categorizing the type of document/image and capturing specific event information.

Extraction Requirements:
1) Category Extraction:
Determine and specify the category of the document/image using one one of the following options: Medical document, medication, physical, MISC.

2) Event Information Extraction:
Extract key details from the document/image, including:
Disease: The medical condition or diagnosis.
Chronic (bool): Whether the condition is chronic (True/False).
Medication: List of medications mentioned.
Body Part: Affected body part(s) from the given list: ['left_arm', 'left_hand', 'right_shoulder', 'left_leg_lower', 'right_arm', 'right_hand', 'left_leg_upper', 'left_foot', 'right_leg_upper', 'right_leg_lower', 'right_foot']
Date/Time: The date and/or time when the event occurred.
Return the results in the following JSON format:

json
{
  "category": "<string>",  // e.g., "Medical document"
  "events": [
    {
      "disease": "<string>",  // e.g., "Diabetes"
      "chronic": <bool>,  // true or false
      "medication": ["<string>", "<string>"],  // e.g., ["Metformin", "Insulin"]
      "body_part": ["<string>"],  // e.g., ["right_leg_upper", "left_hand"]
      "date_time": "<string>"  // e.g., "2023-09-15 14:30"
    }
  ]
}
Example:
Analyze the input document/image and output the information using the JSON schema:

Category: Specify the category (Medical document, medication, physical, MISC).
Events: Capture all relevant medical events as a list of objects.
Input: (Provide the document or image description here)

Output Example:

json
{
  "category": "Medical document",
  "events": [
    {
      "disease": "Hypertension",
      "chronic": true,
      "medication": ["Amlodipine"],
      "body_part": ["right_arm"],
      "date_time": "2024-02-10 09:00"
    },
    {
      "disease": "Fracture",
      "chronic": false,
      "medication": ["Painkillers"],
      "body_part": ["left_leg_lower"],
      "date_time": "2024-02-12 16:30"
    }
  ]
}
Use this format to extract and present the data accurately in JSON format.
"""

    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": prompt,
                },
                {
                    "type": "image_url",
                    "image_url": message.image_url,
                }
            ]
        }
    ]

    chat_response = client.chat.complete(
        model=model,
        messages=messages,
        response_format={
            "type": "json_object",
        },
        temperature=0
    )

    return {"response": chat_response.choices[0].message.content}

@router.post("/medical_summary")
async def medical_summary_endpoint(events: List[MedicalEvent]):
    api_key = os.environ.get("MISTRAL_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="MISTRAL_API_KEY not found in environment variables")

    model = "mistral-large-latest"
    client = Mistral(api_key=api_key)

    events_str = "\n".join([f"- {event.disease} ({'Chronic' if event.chronic else 'Acute'}), Medication: {', '.join(event.medication)}, Body Part: {', '.join(event.body_part)}, Date/Time: {event.date_time}" for event in events])

    prompt = f"""
    Based on the following medical events, generate a short summary in the following format:

    __Medical history:__
    {events_str}

    __Medication history:__
    - Medication 1
    - Medication 2
    ...

    __Current complaint:__
    Disease (Body part), Date/Time

    If there is not enough information to fill a category, return "Unknown" for that category.
    """

    messages = [
        {
            "role": "user",
            "content": prompt,
        }
    ]

    chat_response = client.chat.complete(
          model = model,
          messages = messages,
          response_format={
            "type": "text",
        },
        temperature=0
    )

    return {"summary": chat_response.choices[0].message.content}

@router.post("/simulate")
async def simulate_endpoint(events: List[MedicalEvent]):
    api_key = os.environ.get("MISTRAL_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="MISTRAL_API_KEY not found in environment variables")

    model = "mistral-large-latest"
    client = Mistral(api_key=api_key)

    prompt = f"""
    Based on the current medical events, forecast me the next medical event on the list of previous medical events.

    Previous medical events:
    {json.dumps(events, indent=2)}

    Output format:
    {json.dumps(MedicalEvent.schema(), indent=2)}

    If there is not enough information to return an accurate forecast, return "UNK" in each category.
    """

    messages = [
        {
            "role": "user",
            "content": prompt
        }
    ]

    chat_response = client.chat.complete(
        model=model,
        messages=messages,
        response_format={
            "type": "json_object",
        },
        temperature=0
    )

    next_event = MedicalEvent.parse_raw(chat_response.choices[0].message.content)

    return SimulationResult(next_event=next_event)

