from pydantic import BaseModel

class Message(BaseModel):
    message:str
    topic:str
    flight_id:str