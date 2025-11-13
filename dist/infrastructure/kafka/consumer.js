import { Kafka } from 'kafkajs';
export async function startConsumer(groupId, topic, onMessage) {
    const kafka = new Kafka({ clientId: 'activity-service', brokers: ['kafka:9092'] });
    const consumer = kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true }); // ensure you get all messages
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (!message.value) {
                console.log("Skipping empty message");
                return;
            }
            let payload;
            try {
                payload = JSON.parse(message.value.toString());
            }
            catch (err) {
                console.error("Failed to parse message", err);
                return;
            }
            console.log("✅ Consumed message:", payload);
            await onMessage(payload);
        },
    });
}
// import { Kafka } from 'kafkajs';
// import { config } from '../../config/index.js';
// export async function startConsumer(groupId: string, topic: string, eachMessage: (payload: any) => Promise<void>) {
//     const kafka = new Kafka({ clientId: config.kafka.clientId, brokers: config.kafka.brokers });
//     const consumer = kafka.consumer({ groupId });
//     await consumer.connect();
//     await consumer.subscribe({ topic, fromBeginning: false });
//     await consumer.run({
//         eachMessage: async ({ message }) => {
//             try {
//                 const payload = JSON.parse(message.value!.toString());
//                 await eachMessage(payload);
//             } catch (err) {
//                 // handle error, send to DLQ in production
//                 console.error('processing error', err);
//             }
//         }
//     });
// }
