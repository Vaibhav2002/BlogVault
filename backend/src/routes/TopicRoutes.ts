import express from "express";
import * as controller from "../controllers/TopicController";

const router = express.Router()

router.get('/', controller.getAllTopics)
router.get('/trending', controller.getTrendingTopics)

export default router
