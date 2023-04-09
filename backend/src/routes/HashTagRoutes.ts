import express from "express";
import * as controller from "../controllers/HashTagController";

const router = express.Router()

router.get('/', controller.getAllHashTags)
router.post('/', controller.createHashTag)

export default router
