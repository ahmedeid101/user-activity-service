export class ProcessedLog {
    messageId;
    userId;
    activityType;
    timestamp;
    metadata;
    processedAt;
    constructor(props) {
        this.messageId = props.messageId;
        this.userId = props.userId;
        this.activityType = props.activityType;
        this.timestamp = props.timestamp;
        this.metadata = props.metadata ?? {};
        this.processedAt = props.processedAt ?? new Date();
    }
}
