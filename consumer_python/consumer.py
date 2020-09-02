from kafka import KafkaConsumer
from json import loads
import os

consumer = KafkaConsumer(
    "kafka-python-topic",
    api_version=(0, 11, 5),
    auto_offset_reset="earliest",
    enable_auto_commit=True,
    group_id="my-group-1",
    value_deserializer=lambda m: loads(m.decode("utf-8")),
    bootstrap_servers=[os.getenv("SERVER_KAFKA")],
)
print("Consumer python")
for m in consumer:
    print(m.value)
