import express from 'express';
import trimRequest from 'trim-request'
import authMiddleware from '../middlewares/authMidddleware.js'
import {create_open_conversation, getconversations} from '../controllers/conversation.controller.js'
const router = express.Router();

router.route('/').post(trimRequest.all, authMiddleware, create_open_conversation)
router.route('/').get(trimRequest.all, authMiddleware, getconversations)

export default router;