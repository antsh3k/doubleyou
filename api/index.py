from dotenv import load_dotenv
import os
from fastapi import FastAPI
from .mistral import router as mistral_router

load_dotenv()

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

# add 
app.include_router(mistral_router)

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

