
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.SERVER_KAFKA, 'kafka1:9092', 'kafka2:9092']
});

// Create an instance of the Kafka consumer
var valueSum = 0;
var count = 1;

const consumer = kafka.consumer({ groupId: 'test-group' });
console.log('Connecting in kafka ' + process.env.SERVER_KAFKA);

var data = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {
        var value = parseInt(m.message.value.toString('utf8'));
        valueSum = valueSum + value;
        console.log(valueSum / count);
        count = count + 1;
    });
};
const run = async () => {

    await consumer.connect();
    await consumer.subscribe({ topic: 'kafka-python-topic', fromBeginning: true });

    // Subscribe to the Kafka topic
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    });
};

run().catch(console.error);