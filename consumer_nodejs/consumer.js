
const Kafka = require('no-kafka');

// Create an instance of the Kafka consumer
var valueSum = 0;
var count = 1

const consumer = new Kafka.SimpleConsumer({ "connectionString": process.env.SERVER_KAFKA })
var data = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {
        var value = parseInt(m.message.value.toString('utf8'));
        valueSum = valueSum + value;
        console.log(valueSum / count);
        count = count + 1;
    });
};

// Subscribe to the Kafka topic
return consumer.init().then(function () {
    return consumer.subscribe('kafka-python-topic', data);
});