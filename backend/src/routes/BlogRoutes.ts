import express from "express";
import * as controller from "../controllers/BlogController";
import {coverImageMiddleware} from "../middlewares/FileMiddleware";

const router = express.Router()

router.get('/', controller.getAllBlogs)
router.post('/', coverImageMiddleware.single("coverImage"), controller.createBlog)

router.get('/slugs', controller.getAllSlugs)
router.get('/:slug', controller.getBlogBySlug)

export default router