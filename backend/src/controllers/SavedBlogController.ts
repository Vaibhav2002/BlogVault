import * as dataSource from "../dataSources/SavedBlogDataSource"
import {RequestHandler} from "express";
import {assertIsDefined} from "../utils/Helpers";
import {BlogIdBody, PageQuery} from "../validation/SavedBlogValidation";
import {apiResponse} from "../models/ApiResponse";

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

export const saveBlog: RequestHandler<unknown, unknown, BlogIdBody, unknown> = async (req, res, next) => {
    const userId = req.user?._id
    const blogId = req.body.blogId
    try {
        assertIsDefined(userId, "User Id")
        await dataSource.saveBlog(blogId, userId.toString())
        res.status(200).json(apiResponse('Blog Saved successfully'))
    } catch (e) {
        next(e)
    }
}

export const unSaveBlog: RequestHandler<unknown, unknown, BlogIdBody, unknown> = async (req, res, next) => {
    const userId = req.user?._id
    const blogId = req.body.blogId
    try {
        assertIsDefined(userId, "User Id")
        await dataSource.unSaveBlog(blogId, userId.toString())
        res.status(200).json(apiResponse('Blog Unsaved successfully'))
    } catch (e) {
        next(e)
    }
}