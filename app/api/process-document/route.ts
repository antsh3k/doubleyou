import { mistral } from "@ai-sdk/mistral";
import { streamText, convertToCoreMessages, generateText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { id, imageUrl } = await req.json();

  const result = await generateText({
    model: mistral("pixtral-12b-2409"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Extract information from the given document or image to generate structured data. The extraction includes categorizing the type of document/image and capturing specific event information.

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
Use this format to extract and present the data accurately in JSON format.`,
          },
          {
            type: "image",
            image: imageUrl,

            // ImagePart: imageUrl,
          },
        ],
      },
    ],
  });

  return result.text;
}
