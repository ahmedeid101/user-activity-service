import { Kafka, Producer } from 'kafkajs';
import { config } from '../../config/index.js';

let producer: Producer;

export async function initProducer() {
    const kafka = new Kafka({ clientId: config.kafka.clientId, brokers: config.kafka.brokers });
    producer = kafka.producer();
    await producer.connect();
}

export async function sendEvent(topic: string, message: any, key?: string) {
    if (!producer) await initProducer();
    await producer.send({
        topic,
        messages: [{ key: key ?? message.userId, value: JSON.stringify(message) }]
    });
}

export async function disconnectProducer() {
    if (producer) await producer.disconnect();
}