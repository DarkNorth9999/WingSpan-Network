from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, User
from app.services.user_service import register_user
from app.database import get_db

router = APIRouter()

@router.post("/register", response_model=User)
def register_user_route(user: UserCreate, db: Session = Depends(get_db)):
    try:
        return register_user(user, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
