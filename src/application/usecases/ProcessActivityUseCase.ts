import { ProcessedLog } from '../../domains/entities/ProcessedLog.js';
import { IProcessedLogRepository } from '../../domains/repositories/IProcessedLogRepository.js';


export class ProcessActivityUseCase {
    constructor(private repo: IProcessedLogRepository) { }


    async execute(payload: any) {
        if (!payload || !payload.userId) throw new Error('invalid payload');
        const log = new ProcessedLog({
            messageId: payload.messageId,
            userId: payload.userId,
            activityType: payload.activityType || 'unknown',
            timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
            metadata: payload.metadata || {},
            processedAt: new Date()
        });


        await this.repo.save(log);
        return log;
    }
}