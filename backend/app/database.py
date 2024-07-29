from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+psycopg2://hack_to_hire_user:xjSmTp3QYTPhCoOCU4Tj9TZzEd9Y4fkd@dpg-cqialmeehbks73bqmbh0-a.oregon-postgres.render.com/hack_to_hire"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

