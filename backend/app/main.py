from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.controllers import auth_controller, flight_controller, subscription_controller, notification_controller, token_controller
from app.kafka.producer import KafkaProducer
from app.kafka.consumer import KafkaConsumer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500","*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(auth_controller.router, prefix="/auth")
app.include_router(token_controller.router, prefix="/token")
app.include_router(flight_controller.router, prefix="/flights")
app.include_router(subscription_controller.router, prefix="/subscriptions")
app.include_router(notification_controller.router, prefix="/notifications")

# kafka_servers = 'localhost:9092'
# producer = KafkaProducer(servers=kafka_servers)
# consumer = KafkaConsumer(servers=kafka_servers, topic='notifications', group_id='group1')

# @app.on_event("startup")
# async def startup_event():
#     await producer.start()
#     await consumer.start()
#
# @app.on_event("shutdown")
# async def shutdown_event():
#     await producer.stop()
#     await consumer.stop()


@app.get("/")
async def root():
    return {"message": "Server is up"}

if __name__ == "__main__":
    print('FastAPI uvicorn launched')
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)