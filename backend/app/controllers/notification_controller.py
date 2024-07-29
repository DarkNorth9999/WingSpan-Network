from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.notification import Notification
from app.services.notification_service import get_user_notifications, fetch_notifications_for_user
from app.database import get_db
import uuid
from typing import List

router = APIRouter()

@router.get("/", response_model=List[Notification])
def get_notifications_route(user_id: uuid.UUID, db: Session = Depends(get_db)):
    return get_user_notifications(user_id, db)

@router.get("/users/{user_id}/notifications")
def user_notifications(user_id: str, db: Session = Depends(get_db)):
    try:
        return fetch_notifications_for_user(user_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))