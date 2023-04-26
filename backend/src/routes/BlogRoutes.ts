import express from "express";
import * as controller from "../controllers/BlogController";
import {coverImageMiddleware} from "../middlewares/FileMiddleware";
import validateRequest from "../middlewares/validateRequest";
import {createBlogSchema, getBlogsSchema, updateBlogSchema} from "../validation/BlogValidation";
import requiresAuth from "../middlewares/AuthMiddleware";

const router = express.Router()

router.get('/', validateRequest(getBlogsSchema), controller.getAllBlogs)

router.post(
    '/',
    requiresAuth,
    coverImageMiddleware.single("coverImage"),
    validateRequest(createBlogSchema),
    controller.createBlog
)

router.patch(
    '/:blogId',
    requiresAuth,
    coverImageMiddleware.single("coverImage"),
    validateRequest(updateBlogSchema),
    controller.updateBlog
)

router.get('/slugs', controller.getAllSlugs)
router.get('/:slug', controller.getBlogBySlug)

export default router