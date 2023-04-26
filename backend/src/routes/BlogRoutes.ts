import express from "express";
import * as controller from "../controllers/BlogController";
import {coverImageMiddleware} from "../middlewares/FileMiddleware";
import validateRequest from "../middlewares/validateRequest";
import {createBlogSchema, deleteBlogSchema, getBlogsSchema, updateBlogSchema} from "../validation/BlogValidation";
import requiresAuth from "../middlewares/AuthMiddleware";

const router = express.Router()

router.get('/', validateRequest(getBlogsSchema), controller.getAllBlogs)
router.get('/slugs', controller.getAllSlugs)
router.get('/:slug', controller.getBlogBySlug)

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

router.delete('/:blogId', requiresAuth, validateRequest(deleteBlogSchema), controller.deleteBlog)

export default router