import express from "express";
import * as controller from "../controllers/UserController";

const router = express.Router()

router.post('/register', controller.registerUser)

export default router