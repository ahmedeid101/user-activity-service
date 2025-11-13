import { Kafka } from 'kafkajs';
import { config } from '../config/index.js';

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokers,
});

const producer = kafka.producer();

/**
 * Sends an event to Kafka
 * @param topic Kafka topic name
 * @param event Event object
 */
export const producerApi = async (topic: string, event: unknown) => {
  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(event) }],
    });
    console.log(`✅ Event sent to topic "${topic}"`);
  } catch (error) {
    console.error('❌ Failed to send event:', error);
    throw error;
  } finally {
    await producer.disconnect();
  }
};
