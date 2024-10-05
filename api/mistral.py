from fastapi import APIRouter, HTTPException
import requests
import os

router = APIRouter()

MISTRAL_API_KEY = os.getenv('MISTRAL_API_KEY')

@router.post("/mistral/generate")
async def generate_text(prompt: str):
    headers = {
        "Authorization": f"Bearer {MISTRAL_API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "prompt": prompt,
        # Additional parameters can go here as required by Mistral API
    }

    response = requests.post(MISTRAL_API_URL, json=data, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)