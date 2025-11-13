import { Kafka } from 'kafkajs';
import { config } from '../../config/index.js';

export async function startConsumer(groupId: string, topic: string, eachMessage: (payload: any) => Promise<void>) {
    const kafka = new Kafka({ clientId: config.kafka.clientId, brokers: config.kafka.brokers });
    const consumer = kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ message }) => {
            try {
                const payload = JSON.parse(message.value!.toString());
                await eachMessage(payload);
            } catch (err) {
                // handle error, send to DLQ in production
                console.error('processing error', err);
            }
        }
    });
}