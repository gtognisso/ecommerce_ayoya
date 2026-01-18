from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException
from pathlib import Path
import json
import uuid
from typing import List
from PIL import Image
import io

from app.models import Visual, Video
from app.auth import verify_token

router = APIRouter(prefix="/api", tags=["media"])
UPLOADS_DIR = Path("/app/uploads")
VISUALS_DIR = UPLOADS_DIR / "visuals"
VIDEOS_DIR = UPLOADS_DIR / "videos"
FAVICON_DIR = UPLOADS_DIR / "favicon"
CONFIG_DIR = Path("/app/config")

VISUALS_DIR.mkdir(parents=True, exist_ok=True)
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
FAVICON_DIR.mkdir(parents=True, exist_ok=True)
CONFIG_DIR.mkdir(parents=True, exist_ok=True)


def load_json(filename: str):
    filepath = CONFIG_DIR / filename
    if filepath.exists():
        with open(filepath) as f:
            return json.load(f)
    return []


def save_json(filename: str, data):
    filepath = CONFIG_DIR / filename
    with open(filepath, "w") as f:
        json.dump(data, f, indent=2)


@router.post("/admin/visuals", dependencies=[Depends(verify_token)])
async def upload_visual(file: UploadFile = File(...), visual_type: str = Form(...), description: str = Form("")):
    visual_id = str(uuid.uuid4())
    filename = f"{visual_id}_{file.filename}"
    filepath = VISUALS_DIR / filename

    content = await file.read()
    with open(filepath, "wb") as f:
        f.write(content)

    visual = {
        "id": visual_id,
        "type": visual_type,
        "path": f"/uploads/visuals/{filename}",
        "description": description,
        "filename": filename
    }

    visuals = load_json("visuals.json")
    visuals.append(visual)
    save_json("visuals.json", visuals)

    return visual


@router.get("/admin/visuals", dependencies=[Depends(verify_token)])
async def list_visuals():
    return load_json("visuals.json")


@router.delete("/admin/visuals/{visual_id}", dependencies=[Depends(verify_token)])
async def delete_visual(visual_id: str):
    visuals = load_json("visuals.json")
    visual = next((v for v in visuals if v["id"] == visual_id), None)

    if not visual:
        raise HTTPException(status_code=404, detail="Visual not found")

    filepath = VISUALS_DIR / visual["filename"]
    if filepath.exists():
        filepath.unlink()

    visuals = [v for v in visuals if v["id"] != visual_id]
    save_json("visuals.json", visuals)

    return {"message": "Visual deleted"}


@router.post("/admin/videos", dependencies=[Depends(verify_token)])
async def upload_video(file: UploadFile = File(...), title: str = Form(...), description: str = Form("")):
    video_id = str(uuid.uuid4())
    filename = f"{video_id}_{file.filename}"
    filepath = VIDEOS_DIR / filename

    content = await file.read()
    with open(filepath, "wb") as f:
        f.write(content)

    video = {
        "id": video_id,
        "title": title,
        "path": f"/uploads/videos/{filename}",
        "description": description,
        "filename": filename
    }

    videos = load_json("videos.json")
    videos.append(video)
    save_json("videos.json", videos)

    return video


@router.get("/admin/videos", dependencies=[Depends(verify_token)])
async def list_videos():
    return load_json("videos.json")


@router.delete("/admin/videos/{video_id}", dependencies=[Depends(verify_token)])
async def delete_video(video_id: str):
    videos = load_json("videos.json")
    video = next((v for v in videos if v["id"] == video_id), None)

    if not video:
        raise HTTPException(status_code=404, detail="Video not found")

    filepath = VIDEOS_DIR / video["filename"]
    if filepath.exists():
        filepath.unlink()

    videos = [v for v in videos if v["id"] != video_id]
    save_json("videos.json", videos)

    return {"message": "Video deleted"}


@router.post("/admin/favicon", dependencies=[Depends(verify_token)])
async def upload_favicon(file: UploadFile = File(...)):
    content = await file.read()
    img = Image.open(io.BytesIO(content))

    img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    img_32.save(FAVICON_DIR / "favicon-32x32.png")

    img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
    img_16.save(FAVICON_DIR / "favicon-16x16.png")

    return {
        "message": "Favicon uploaded",
        "favicon_32": "/uploads/favicon/favicon-32x32.png",
        "favicon_16": "/uploads/favicon/favicon-16x16.png"
    }


@router.get("/public/visuals")
async def get_public_visuals():
    return load_json("visuals.json")


@router.get("/public/videos")
async def get_public_videos():
    return load_json("videos.json")
