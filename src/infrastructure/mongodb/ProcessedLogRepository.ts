import { IProcessedLogRepository, QueryOptions } from '../../domains/repositories/IProcessedLogRepository.js';
import { ProcessedLog } from '../../domains/entities/ProcessedLog.js';
import { getDb } from './mongoClient.js';
import { ObjectId } from 'mongodb';

export class ProcessedLogRepository implements IProcessedLogRepository {
    private collectionName = 'processed_logs';


    async save(log: ProcessedLog): Promise<void> {
        const document = { ...log, _id: undefined } as any;
        await getDb().collection(this.collectionName).insertOne(document);
    }


    async find(filter: any = {}, options: QueryOptions = {}): Promise<ProcessedLog[]> {
        const q: any = {};
        if (filter.userId) q.userId = filter.userId;
        if (filter.activityType) q.activityType = filter.activityType;
        if (filter.from || filter.to) q.timestamp = {};
        if (filter.from) q.timestamp.$gte = filter.from;
        if (filter.to) q.timestamp.$lte = filter.to;


        const cursor = getDb().collection(this.collectionName).find(q).sort({ timestamp: -1 });
        if (options.skip) cursor.skip(options.skip);
        if (options.limit) cursor.limit(options.limit);
        const rows = await cursor.toArray();
        return rows.map(r => new ProcessedLog({
            messageId: r.messageId,
            userId: r.userId,
            activityType: r.activityType,
            timestamp: new Date(r.timestamp),
            metadata: r.metadata,
            processedAt: new Date(r.processedAt)
        }));
    }


    async findById(id: string): Promise<ProcessedLog | null> {
        const r = await getDb().collection(this.collectionName).findOne({ _id: new ObjectId(id) });
        if (!r) return null;
        return new ProcessedLog({
            messageId: r.messageId,
            userId: r.userId,
            activityType: r.activityType,
            timestamp: new Date(r.timestamp),
            metadata: r.metadata,
            processedAt: new Date(r.processedAt)
        });
    }
}