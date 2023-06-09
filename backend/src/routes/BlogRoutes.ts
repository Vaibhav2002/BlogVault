import express from "express";
import * as controller from "../controllers/BlogController";
import * as savedController from "../controllers/SavedBlogController";
import {coverImageMiddleware, inBlogImage} from "../middlewares/FileMiddleware";
import validateRequest from "../middlewares/validateRequest";
import {
    createBlogSchema,
    deleteBlogSchema,
    getBlogsSchema,
    getTrendingAuthorsSchema,
    getTrendingBlogsSchema,
    inBlogImageSchema,
    searchBlogsSchema,
    updateBlogSchema
} from "../validation/BlogValidation";
import requiresAuth from "../middlewares/AuthMiddleware";
import {postBlogRateLimit, updateBlogRateLimit, uploadInBlogImageRateLimit} from "../middlewares/RateLimit";
import * as commentsController from "../controllers/CommentController";
import {
    createCommentSchema,
    deleteCommentSchema,
    getCommentRepliesSchema,
    getCommentsSchema,
    updateCommentSchema
} from "../validation/CommentValidation";
import {getSavedBlogsSchema} from "../validation/SavedBlogValidation";

const router = express.Router()

router.get('/', validateRequest(getBlogsSchema), controller.getAllBlogs)
router.get('/slugs', controller.getAllSlugs)
router.get('/trending', validateRequest(getTrendingBlogsSchema), controller.getTrendingBlogs)
router.get('/trending/authors', validateRequest(getTrendingAuthorsSchema), controller.getTrendingAuthors)

router.get('/saved', requiresAuth, validateRequest(getSavedBlogsSchema), savedController.getAllSavedBlogs)
router.get('/search', validateRequest(searchBlogsSchema), controller.searchBlogs)

router.get('/:slug', controller.getBlogBySlug)

router.post('/:slug/save', requiresAuth, savedController.saveBlog)

router.delete('/:slug/un-save', requiresAuth, savedController.unSaveBlog)


router.post(
    '/',
    requiresAuth,
    postBlogRateLimit,
    coverImageMiddleware.single("coverImage"),
    validateRequest(createBlogSchema),
    controller.createBlog
)

router.post(
    '/upload-image',
    requiresAuth,
    uploadInBlogImageRateLimit,
    inBlogImage.single("inBlogImage"),
    validateRequest(inBlogImageSchema),
    controller.uploadInBlogImage
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
router.get('/comments/:commentId/replies', validateRequest(getCommentRepliesSchema), commentsController.getCommentReplies)

export default router