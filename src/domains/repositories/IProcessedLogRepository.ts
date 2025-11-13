import { ProcessedLog } from '../entities/ProcessedLog.js';


export interface QueryOptions {
    limit?: number;
    before?: Date;
    after?: Date;
    skip?: number;
}

export interface IProcessedLogRepository {
    save(log: ProcessedLog): Promise<void>;
    find(filter: Partial<Pick<ProcessedLog, 'userId' | 'activityType'>> & { from?: Date; to?: Date }, options?: QueryOptions): Promise<ProcessedLog[]>;
    findById(id: string): Promise<ProcessedLog | null>;
}