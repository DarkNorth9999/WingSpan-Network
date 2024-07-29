from sqlalchemy.orm import Session
from app.models.subscription import Subscription
from app.models.user import User
from app.schemas.subscription import SubscriptionCreate
import uuid

def get_subscription(db: Session, subscription_id: uuid.UUID):
    return db.query(Subscription).filter(Subscription.subscription_id == subscription_id).first()

def get_subscriptions_by_user(db: Session, user_id: uuid.UUID):
    return db.query(Subscription).filter(Subscription.user_id == user_id).all()

def create_subscription(db: Session, subscription: SubscriptionCreate):
    db_subscription = Subscription(**subscription.dict())
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

def get_subscribed_users(flight_id, db: Session):
    return db.query(User).join(
        Subscription, User.user_id == Subscription.user_id
    ).filter(Subscription.flight_id == flight_id).all()