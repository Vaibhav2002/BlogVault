import * as dataSource from '../dataSources/BlogDataSource'
import {RequestHandler} from "express";
import {assertIsDefined} from "../utils/Helpers";
import {BlogBody, GetBlogsQuery} from "../validation/BlogValidation";

export const getAllBlogs: RequestHandler<unknown, unknown, unknown, GetBlogsQuery> = async (req, res, next) => {
    const authorId = req.query.authorId
    const page = req.query.page || 1
    try {
        const blogs = await dataSource.getAllBlogs(page, authorId)
        res.status(200).json(blogs)
    } catch (e) {
        next(e)
    }
}

export const createBlog: RequestHandler<unknown, unknown, BlogBody, unknown> = async (req, res, next) => {
    const userId = req.user?._id
    try {
        assertIsDefined(userId, "User Id")
        const blogReq = req.body
        const file = req.file
        assertIsDefined(file, "coverImage")
        const blog = await dataSource.createBlog(userId, file, blogReq)
        res.status(201).json(blog)
    } catch (e) {
        next(e)
    }
}

export const getAllSlugs:RequestHandler = async (req, res, next) => {
    try {
        const slugs = await dataSource.getAllSlugs()
        res.status(200).json(slugs)
    } catch (e) {
        next(e)
    }
}

export const getBlogBySlug: RequestHandler = async (req, res, next) => {
    try {
        const blog = await dataSource.getBlogBySlug(req.params.slug)
        res.status(200).json(blog)
    } catch (e) {
        next(e)
    }
}