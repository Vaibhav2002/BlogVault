import express from "express";
import * as controller from "../controllers/BlogController";
import {coverImageMiddleware} from "../middlewares/FileMiddleware";
import validateRequest from "../middlewares/validateRequest";
import {blogRequestSchema} from "../validation/CreateBlogValidation";

const router = express.Router()

router.get('/', controller.getAllBlogs)

router.post(
    '/',
    coverImageMiddleware.single("coverImage"),
    validateRequest(blogRequestSchema),
    controller.createBlog
)

router.get('/slugs', controller.getAllSlugs)
router.get('/:slug', controller.getBlogBySlug)

export default router