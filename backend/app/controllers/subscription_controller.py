from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.subscription import SubscriptionCreate, Subscription
from app.services.subscription_service import subscribe_user, list_user_subscriptions, list_users_for_flight
from app.database import get_db
import uuid
from typing import List


router = APIRouter()

@router.post("/", response_model=Subscription)
def subscribe_user_route(subscription: SubscriptionCreate, db: Session = Depends(get_db)):
    return subscribe_user(subscription, db)

@router.get("/", response_model=List[Subscription])
def list_subscriptions_route(user_id: uuid.UUID, db: Session = Depends(get_db)):
    return list_user_subscriptions(user_id, db)

@router.get("/flights/{flight_id}/subscribers")
def flight_subscribers(flight_id: str, db: Session = Depends(get_db)):
    try:
        return list_users_for_flight(flight_id, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))