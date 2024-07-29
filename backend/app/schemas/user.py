from pydantic import BaseModel, EmailStr
import uuid
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    user_id: uuid.UUID

    class Config:
        orm_mode = True
