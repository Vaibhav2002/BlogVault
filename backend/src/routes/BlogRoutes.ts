import express from "express";
import * as controller from "../controllers/BlogController";

const router = express.Router()

router.get('/', controller.getAllBlogs)
router.post('/', controller.createBlog)

export default router