import express from "express";
import * as controller from "../controllers/TopicController";
import requiresAuth from "../middlewares/AuthMiddleware";
import validateRequest from "../middlewares/validateRequest";
import {createTopicSchema} from "../validation/TopicValidation";

const router = express.Router()

router.get('/', controller.getAllTopics)
router.get('/trending', controller.getTrendingTopics)
router.post('/', requiresAuth, validateRequest(createTopicSchema), controller.createTopic)

export default router
