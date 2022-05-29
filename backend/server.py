import boto3
import psycopg2
from typing import List
from pydantic import BaseModel
import uvicorn
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(debug=True)

# create endpoint


@app.get("/status")
async def check_status():
    return "Hello World"

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port="8000", reload=False)
