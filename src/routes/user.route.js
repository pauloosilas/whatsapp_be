import express from "express"
import trimRequest from "trim-request"

import { searchUsers } from "../controllers/user.controller.js"
import authMidddleware from "../middlewares/authMidddleware.js"

const router = express.Router()

router.route('/').get(trimRequest.all, authMidddleware, searchUsers)

export default router