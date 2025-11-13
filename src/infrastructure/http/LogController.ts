import { Request, Response } from 'express';
import { ProcessedLogRepository } from '../mongodb/ProcessedLogRepository.js';

const repo = new ProcessedLogRepository();

export async function getLogs(req: Request, res: Response) {
    const { page = '1', limit = '20', userId, activityType, from, to } = req.query as Record<string, string>;
    const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
    const filter: any = {};
    if (userId) filter.userId = userId;
    if (activityType) filter.activityType = activityType;
    if (from || to) {
        filter.from = from ? new Date(from) : undefined;
        filter.to = to ? new Date(to) : undefined;
    }
    const results = await repo.find(filter, { limit: Number(limit), skip });
    res.json({ data: results, page: Number(page), limit: Number(limit) });
}

export async function getLogById(req: Request, res: Response) {
    const { id } = req.params;
    const doc = await repo.findById(id);
    if (!doc) return res.status(404).json({ message: 'not found' });
    res.json(doc);
}