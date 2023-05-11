import express from "express";
import requiresAuth from "../middlewares/AuthMiddleware";
import validateRequest from "../middlewares/validateRequest";
import {getSavedBlogsSchema, saveBlogSchema, unSaveBlogSchema} from "../validation/SavedBlogValidation";
import * as controller from "../controllers/SavedBlogController";

const router = express.Router()

router.get('/', requiresAuth, validateRequest(getSavedBlogsSchema), controller.getAllSavedBlogs)

router.post('/', requiresAuth, validateRequest(saveBlogSchema), controller.saveBlog)

router.delete('/', requiresAuth, validateRequest(unSaveBlogSchema), controller.unSaveBlog)

export default router