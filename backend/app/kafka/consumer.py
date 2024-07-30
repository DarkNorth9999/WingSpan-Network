from aiokafka import AIOKafkaConsumer
import asyncio

class KafkaConsumer:
    def __init__(self, servers, topic, group_id):
        self.servers = servers
        self.topic = topic
        self.group_id = group_id
        self.consumer = None

    async def start(self):
        self.consumer = AIOKafkaConsumer(
            self.topic,
            bootstrap_servers=self.servers,
            group_id=self.group_id
        )
        await self.consumer.start()
        asyncio.create_task(self.consume_messages())

    async def consume_messages(self):
        try:
            async for message in self.consumer:
                print(f"Received: {message.topic}:{message.partition}:{message.offset}: key={message.key} value={message.value.decode('utf-8')}")
        finally:
            await self.consumer.stop()

    async def stop(self):
        await self.consumer.stop()
