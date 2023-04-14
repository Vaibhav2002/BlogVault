import express from "express";
import * as controller from "../controllers/TopicController";

const router = express.Router()

router.get('/', controller.getAllTopics)

export default router
