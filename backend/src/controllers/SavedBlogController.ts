import * as dataSource from "../dataSources/SavedBlogDataSource"
import * as blogDataSource from "../dataSources/BlogDataSource";
import {RequestHandler} from "express";
import {assertIsDefined} from "../utils/Helpers";
import {PageQuery} from "../validation/SavedBlogValidation";
import {apiResponse} from "../models/ApiResponse";
import createHttpError from "http-errors";

export const getAllSavedBlogs: RequestHandler<unknown, unknown, unknown, PageQuery> = async (req, res, next) => {
    const userId = req.user?._id
    const page = req.query.page || 1
    try {
        assertIsDefined(userId, "User Id")
        const blogPage = await dataSource.getAllSavedBlogs(userId.toString(), page)
        res.status(200).json(blogPage)
    } catch (e) {
        next(e)
    }
}

export const saveBlog: RequestHandler = async (req, res, next) => {
    const userId = req.user?._id
    const slug = req.params.slug
    try {
        assertIsDefined(userId, "User Id")
        const blog = await getBlogBySlug(slug)
        await dataSource.saveBlog(blog._id.toString(), userId.toString())
        res.status(200).json(apiResponse('Blog Saved successfully'))
    } catch (e) {
        next(e)
    }
}

export const unSaveBlog: RequestHandler = async (req, res, next) => {
    const userId = req.user?._id
    const slug = req.params.slug
    try {
        assertIsDefined(userId, "User Id")
        const blog = await getBlogBySlug(slug)
        await dataSource.unSaveBlog(blog._id.toString(), userId.toString())
        res.status(200).json(apiResponse('Blog Unsaved successfully'))
    } catch (e) {
        next(e)
    }
}

const getBlogBySlug = async (slug: string) => {
    const blog = await blogDataSource.getBlogBySlug(slug)
    if (!blog) throw createHttpError(404, 'Blog with this slug does not exist')
    return blog
}