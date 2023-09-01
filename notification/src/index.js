// notification-service.js
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const app = express();
const port = process.env.PORT || 4000;

// Create a Kafka consumer
const client = new kafka.KafkaClient({ kafkaHost: 'YOUR_KAFKA_BROKER_ENDPOINT' });
const consumer = new Consumer(client, [{ topic: 'notification-topic' }], {
  autoCommit: false,
  fromOffset: 'latest',
});

consumer.on('message', (message) => {
  console.log('Received message from Kafka:', message.value);
  // Handle the notification logic here
});

consumer.on('error', (err) => {
  console.error('Kafka consumer error:', err);  
});

app.listen(port, () => {
  console.log(`Notification service is running on port ${port}`);
});
