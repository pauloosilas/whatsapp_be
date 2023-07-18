import express from 'express';
import trimRequest from 'trim-request';
import authMidddleware from '../middlewares/authMidddleware.js';
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.route('/').post(trimRequest.all, authMidddleware, sendMessage);
router.route('/:convo_id').get(trimRequest.all, authMidddleware, getMessages);

export default router;