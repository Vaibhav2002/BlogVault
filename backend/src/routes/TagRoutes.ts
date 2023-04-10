import express from "express";
import * as controller from "../controllers/TagController";

const router = express.Router()

router.get('/', controller.getAllTags)
router.post('/', controller.createTag)

export default router
