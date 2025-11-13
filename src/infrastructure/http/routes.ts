import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { producerApi } from '../producerApi.js';

const router = express.Router();

router.post('/produce', async (req, res) => {
  try {
    const body = req.body;

    const event = {
      messageId: body.messageId ?? uuidv4(),
      userId: body.userId ?? `user_${Math.floor(Math.random() * 1000)}`,
      activityType:
        body.activityType ??
        ['login', 'page_view', 'purchase'][Math.floor(Math.random() * 3)],
      timestamp: body.timestamp ?? new Date().toISOString(),
      metadata: body.metadata ?? {},
    };

    await producerApi(process.env.KAFKA_TOPIC ?? 'user-activity', event);
    res.json({ sent: true, event });
  } catch (error) {
    console.error('❌ Error producing event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;


// import { Router } from 'express';
// import { getLogs, getLogById } from './controllers/LogController.js';


// const router = Router();
// router.get('/logs', getLogs);
// router.get('/logs/:id', getLogById);


// export default router;