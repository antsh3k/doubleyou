import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from mistralai import Mistral

router = APIRouter()

class Message(BaseModel):
    content: str

class PixtralMessage(BaseModel):
    image_url: str
    prompt: str

@router.post("/mistral")
async def mistral_endpoint(message: Message):
    api_key = os.environ.get("MISTRAL_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="MISTRAL_API_KEY not found in environment variables")

    model = "mistral-large-latest"
    client = Mistral(api_key=api_key)

    chat_response = client.chat.complete(
        model=model,
        messages=[
            {
                "role": "user",
                "content": message.content,
            },
        ]
    )

    return {"response": chat_response.choices[0].message.content}


@router.post("/pixtral")
async def pixtral_endpoint(message: PixtralMessage):
    api_key = os.environ.get("MISTRAL_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="MISTRAL_API_KEY not found in environment variables")

    model = "pixtral-12b-2409"
    client = Mistral(api_key=api_key)

    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": f"{message.prompt}",
                },
                {
                    "type": "image_url",
                    "image_url": message.image_url
                }
            ]
        }
    ]

    chat_response = client.chat.complete(
        model=model,
        messages=messages,
        response_format={
            "type": "json_object",
        }
    )

    return {"response": chat_response.choices[0].message.content}

