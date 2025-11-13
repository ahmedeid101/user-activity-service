import { ProcessedLog } from '../../domains/entities/ProcessedLog.js';
export class ProcessActivityUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async execute(payload) {
        if (!payload || !payload.userId)
            throw new Error('invalid payload');
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
