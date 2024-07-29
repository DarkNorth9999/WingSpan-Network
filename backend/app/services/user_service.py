from sqlalchemy.orm import Session
from app.repositories.user_repository import get_user_by_username, create_user
from app.schemas.user import UserCreate

def register_user(user: UserCreate, db: Session):
    db_user = get_user_by_username(db, user.username)
    if db_user:
        raise ValueError("Username already registered")
    return create_user(db, user)
