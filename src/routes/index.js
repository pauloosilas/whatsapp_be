import express from "express"
import authRouter from "./auth.route.js"
import conversationRoutes from './conversation.route.js'
import MessageRoutes from './message.route.js'

const router = express.Router()
router.use('/auth', authRouter)
router.use('/conversation', conversationRoutes)
router.use('/message', MessageRoutes)

export default router