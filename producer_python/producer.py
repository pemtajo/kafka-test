from kafka import KafkaProducer
import json
import random
from time import sleep
from datetime import datetime
import os

# Create an instance of the Kafka producer
producer = KafkaProducer(
    bootstrap_servers=os.getenv("SERVER_KAFKA"),
    value_serializer=lambda v: str(v).encode("utf-8"),
)

# Call the producer.send method with a producer-record
print("Ctrl+c to Stop")
while True:
    producer.send("kafka-python-topic", random.randint(1, 999))

