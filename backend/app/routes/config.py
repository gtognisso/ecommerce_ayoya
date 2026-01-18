from fastapi import APIRouter, Depends, HTTPException
from pathlib import Path
import json
import uuid
from typing import List

from app.models import SiteConfig, ContactInfo, SocialLinks, NotificationEmail
from app.auth import verify_token

router = APIRouter(prefix="/api", tags=["config"])
CONFIG_DIR = Path("/app/config")
CONFIG_DIR.mkdir(exist_ok=True)


def load_json(filename: str):
    filepath = CONFIG_DIR / filename
    if filepath.exists():
        with open(filepath) as f:
            return json.load(f)
    return None


def save_json(filename: str, data):
    filepath = CONFIG_DIR / filename
    with open(filepath, "w") as f:
        json.dump(data, f, indent=2)


@router.get("/public/config")
async def get_public_config():
    site_config = load_json("site_config.json")
    contact_info = load_json("contact_info.json")
    social_links = load_json("social_links.json")

    return {
        "site": site_config or {"bottle_price": 5000, "delivery_price": 1000, "carton_price": 25000, "carton_size": 6},
        "contact": contact_info,
        "social": social_links
    }


@router.get("/admin/config/site", dependencies=[Depends(verify_token)])
async def get_site_config():
    data = load_json("site_config.json")
    return data or {"bottle_price": 5000, "delivery_price": 1000, "carton_price": 25000, "carton_size": 6}


@router.put("/admin/config/site", dependencies=[Depends(verify_token)])
async def update_site_config(config: SiteConfig):
    save_json("site_config.json", config.model_dump())
    return {"message": "Site config updated"}


@router.get("/admin/config/contact", dependencies=[Depends(verify_token)])
async def get_contact_config():
    data = load_json("contact_info.json")
    return data or {}


@router.put("/admin/config/contact", dependencies=[Depends(verify_token)])
async def update_contact_config(contact: ContactInfo):
    save_json("contact_info.json", contact.model_dump())
    return {"message": "Contact info updated"}


@router.get("/admin/config/social", dependencies=[Depends(verify_token)])
async def get_social_config():
    data = load_json("social_links.json")
    return data or {}


@router.put("/admin/config/social", dependencies=[Depends(verify_token)])
async def update_social_config(social: SocialLinks):
    save_json("social_links.json", social.model_dump())
    return {"message": "Social links updated"}


@router.get("/admin/config/emails", dependencies=[Depends(verify_token)])
async def get_notification_emails():
    data = load_json("notification_emails.json")
    return data or []


@router.post("/admin/config/emails", dependencies=[Depends(verify_token)])
async def add_notification_email(email: NotificationEmail):
    email.id = str(uuid.uuid4())
    emails = load_json("notification_emails.json") or []
    emails.append(email.model_dump())
    save_json("notification_emails.json", emails)
    return email


@router.delete("/admin/config/emails/{email_id}", dependencies=[Depends(verify_token)])
async def delete_notification_email(email_id: str):
    emails = load_json("notification_emails.json") or []
    emails = [e for e in emails if e.get("id") != email_id]
    save_json("notification_emails.json", emails)
    return {"message": "Email removed"}
