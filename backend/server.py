import os
import boto3
import psycopg2
from typing import List
from dotenv import load_dotenv
from pydantic import BaseModel
import uvicorn
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()


POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")


class VideoModel(BaseModel):
    id: int
    video_title: str
    video_url: str


app = FastAPI(debug=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/status")
async def check_status():
    return ("Hello, " + POSTGRES_USER)


@app.get("/videos", response_model=List[VideoModel])
async def get_videos():
    # connect to database
    conn = psycopg2.connect(
        database=POSTGRES_DB, user=POSTGRES_USER, password=POSTGRES_PASSWORD, host="localhost",
    )
    cur = conn.cursor()
    cur.execute("SELECT * FROM video ORDER BY id DESC")
    rows = cur.fetchall()

    formatted_videos = []
    for row in rows:
        formatted_videos.append(
            VideoModel(id=row[0], video_title=row[1], video_url=row[2])
        )

    cur.close()
    conn.close()
    return formatted_videos
if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port="8000", reload=False)
