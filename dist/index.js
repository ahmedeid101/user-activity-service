import express from 'express';
import pino from 'pino';
import routes from './infrastructure/http/producerRouter.js';
import producerRouter from './infrastructure/http/producerRouter.js';
import { connectDb } from './infrastructure/persistence/mongoClient.js';
import { ProcessedLogRepository } from './infrastructure/persistence/ProcessedLogRepository.js';
import { ProcessActivityUseCase } from './application/usecases/ProcessActivityUseCase.js';
import { startConsumer } from './infrastructure/kafka/consumer.js';
import { config } from './config/index.js';
const logger = pino();
const app = express();
app.use(express.json());
app.use('/api', routes);
app.use('/producer', producerRouter);
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).json({ error: err.message });
});
async function bootstrap() {
    await connectDb();
    const repo = new ProcessedLogRepository();
    const usecase = new ProcessActivityUseCase(repo);
    // start consumer
    await startConsumer('activity-processor-group', config.kafka.topic, async (payload) => {
        try {
            await usecase.execute(payload);
        }
        catch (err) {
            logger.error({ err, payload }, 'failed to process');
        }
    });
    app.listen(config.port, () => logger.info({ port: config.port }, 'service listening'));
}
bootstrap().catch(err => {
    console.error('startup error', err);
    process.exit(1);
});
