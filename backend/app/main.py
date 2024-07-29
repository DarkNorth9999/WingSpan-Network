from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.controllers import auth_controller, flight_controller, subscription_controller, notification_controller

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500","*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(auth_controller.router, prefix="/auth")
app.include_router(flight_controller.router, prefix="/flights")
app.include_router(subscription_controller.router, prefix="/subscriptions")
app.include_router(notification_controller.router, prefix="/notifications")

@app.get("/")
async def root():
    return {"message": "Server is up"}

if __name__ == "__main__":
    print('FastAPI uvicorn launched')
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)