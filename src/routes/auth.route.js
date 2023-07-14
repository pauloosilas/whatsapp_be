import express from "express"
import trimRequest from "trim-request"

import { login, logout, refreshToken, register } from "../controllers/auth.controller.js"
import authMidddleware from "../middlewares/authMidddleware.js"

const router = express.Router()

router.route('/register').post(trimRequest.all, register)
router.route('/login').post(trimRequest.all, login)
router.route('/logout').post(trimRequest.all, logout)
router.route('/refreshtoken').post(trimRequest.all, refreshToken)
router.route('/testinggauthMiddleware',).get(trimRequest.all, authMidddleware, (req, res) => {
    res.send(req.user)
})
 
export default router