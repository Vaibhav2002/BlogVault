import express from "express";
import * as controller from "../controllers/BlogController";
import {coverImageMiddleware} from "../middlewares/FileMiddleware";
import validateRequest from "../middlewares/validateRequest";
import {createBlogSchema, deleteBlogSchema, getBlogsSchema, updateBlogSchema} from "../validation/BlogValidation";
import requiresAuth from "../middlewares/AuthMiddleware";
import {postBlogRateLimit, updateBlogRateLimit} from "../middlewares/RateLimit";
import * as commentsController from "../controllers/CommentController";
import {
    createCommentSchema,
    deleteCommentSchema,
    getCommentsSchema,
    updateCommentSchema
} from "../validation/CommentValidation";

const router = express.Router()

router.get('/', validateRequest(getBlogsSchema), controller.getAllBlogs)
router.get('/slugs', controller.getAllSlugs)
router.get('/:slug', controller.getBlogBySlug)

router.post(
    '/',
    requiresAuth,
    postBlogRateLimit,
    coverImageMiddleware.single("coverImage"),
    validateRequest(createBlogSchema),
    controller.createBlog
)

router.patch(
    '/:blogId',
    requiresAuth,
    updateBlogRateLimit,
    coverImageMiddleware.single("coverImage"),
    validateRequest(updateBlogSchema),
    controller.updateBlog
)

router.delete('/:blogId', requiresAuth, validateRequest(deleteBlogSchema), controller.deleteBlog)

/**
 * Comments
 */
router.get('/:blogId/comments', validateRequest(getCommentsSchema), commentsController.getComments)
router.post('/:blogId/comment', requiresAuth, validateRequest(createCommentSchema), commentsController.createComment)
router.patch('/comments/:commentId', requiresAuth, validateRequest(updateCommentSchema), commentsController.updateComment)
router.delete('/comments/:commentId', requiresAuth, validateRequest(deleteCommentSchema), commentsController.deleteComment)

export default router