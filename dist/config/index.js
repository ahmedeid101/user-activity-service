import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.docker') });
export const config = {
    port: Number(process.env.PORT || 3000),
    env: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI || 'mongodb://mongo:27017/activitydb',
    kafka: {
        brokers: (process.env.KAFKA_BROKERS || 'kafka:9092').split(','),
        clientId: process.env.KAFKA_CLIENT_ID || 'activity-service',
        topic: process.env.KAFKA_TOPIC || 'user-activity'
    }
};
// import dotenv from 'dotenv';
// import path from 'path';
// const envFile = process.env.NODE_ENV === 'production'
//   ? path.resolve(__dirname, '../../.env.docker')
//   : path.resolve(__dirname, '../../.env.local');
// dotenv.config({ path: envFile });
// export const config = {
//   port: Number(process.env.PORT || 3000),
//   env: process.env.NODE_ENV || 'development',
//   mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/activitydb',
//   kafka: {
//     brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
//     clientId: process.env.KAFKA_CLIENT_ID || 'activity-service',
//     topic: process.env.KAFKA_TOPIC || 'user-activity',
//   },
// };
