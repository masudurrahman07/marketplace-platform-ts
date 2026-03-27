import express from 'express';
import { chatWithAI } from './ai.controller';

const router = express.Router();

router.post('/chat', chatWithAI);

export default router;