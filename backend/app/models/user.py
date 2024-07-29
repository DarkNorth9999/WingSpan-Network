from sqlalchemy import Column, String, TIMESTAMP, UUID
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True)
    phone = Column(String, unique=True)
    created_at = Column(TIMESTAMP, nullable=False)
    last_login = Column(TIMESTAMP)
