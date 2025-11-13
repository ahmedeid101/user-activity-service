import { MongoClient } from 'mongodb';
import { config } from '../../config/index.js';
let client;
let db;
export async function connectDb() {
    if (db)
        return db;
    client = new MongoClient(config.mongoUri);
    await client.connect();
    db = client.db();
    const col = db.collection('processed_logs');
    await col.createIndex({ userId: 1, timestamp: -1 });
    await col.createIndex({ activityType: 1, timestamp: -1 });
    await col.createIndex({ timestamp: -1 });
    return db;
}
export function getDb() {
    if (!db)
        throw new Error('DB not connected');
    return db;
}
