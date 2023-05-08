import * as dataSource from '../dataSources/BlogDataSource'
import {RequestHandler} from "express";
import {assertIsDefined} from "../utils/Helpers";
import {BlogBody, BlogIdParam, GetBlogsQuery, LimitQuery} from "../validation/BlogValidation";
import ApiResponse from "../models/ApiResponse";

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

export const getTrendingBlogs: RequestHandler<unknown, unknown, unknown, LimitQuery> = async (req, res, next) => {
    try {
        const limit = req.query.limit || 20
        const blogs = await dataSource.getTrendingBlogs(limit)
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

export const uploadInBlogImage: RequestHandler = async (req, res, next) => {
    const image = req.file
    try {
        assertIsDefined(image, "Image")
        const url = await dataSource.uploadInBlogImage(image)
        res.status(200).json(url)
    } catch (e) {
        next(e)
    }
}

export const getAllSlugs: RequestHandler = async (req, res, next) => {
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

export const updateBlog: RequestHandler<BlogIdParam, unknown, BlogBody, unknown> = async (req, res, next) => {
    const userId = req.user?._id
    try {
        assertIsDefined(userId, "User Id")
        const blogId = req.params.blogId
        const blogReq = req.body
        const file = req.file
        await dataSource.updateBlog(userId, blogId, blogReq, file)
        res.status(200).json({message: "Blog updated successfully"} as ApiResponse)
    } catch (e) {
        next(e)
    }
}

export const deleteBlog: RequestHandler<BlogIdParam, unknown, unknown, unknown> = async (req, res, next) => {
    const userId = req.user?._id
    try {
        assertIsDefined(userId, "User Id")
        const blogId = req.params.blogId
        await dataSource.deleteBlog(userId, blogId)
        res.status(200).json({message: "Blog deleted successfully"} as ApiResponse)
    } catch (e) {
        next(e)
    }
}

export const getTrendingAuthors: RequestHandler<unknown, unknown, unknown, LimitQuery> = async (req, res, next) => {
    try {
        const limit = req.query.limit || 5
        const authors = await dataSource.getTrendingAuthors(limit)
        res.status(200).json(authors)
    } catch (e) {
        next(e)
    }
}