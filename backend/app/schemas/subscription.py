from pydantic import BaseModel
import uuid

class SubscriptionBase(BaseModel):
    user_id: uuid.UUID
    flight_id: uuid.UUID

class SubscriptionCreate(SubscriptionBase):
    pass

class Subscription(SubscriptionBase):
    subscription_id: uuid.UUID

    class Config:
        orm_mode = True
