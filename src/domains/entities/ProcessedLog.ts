export type ActivityType = "login" | "page_view" | "purchase" | string;

export interface ProcessedLogProps {
    messageId?: string;
    userId: string;
    activityType: ActivityType;
    timestamp: Date;
    metadata?: Record<string, unknown>;
    processedAt?: Date;
}

export class ProcessedLog {
    public readonly messageId?: string;
    public readonly userId: string;
    public readonly activityType: ActivityType;
    public readonly timestamp: Date;
    public readonly metadata: Record<string, unknown>;
    public readonly processedAt: Date;

    constructor(props: ProcessedLogProps) {
        this.messageId = props.messageId;
        this.userId = props.userId;
        this.activityType = props.activityType;
        this.timestamp = props.timestamp;
        this.metadata = props.metadata ?? {};
        this.processedAt = props.processedAt ?? new Date();
    }
}
