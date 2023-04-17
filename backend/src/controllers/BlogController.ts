import * as dataSource from '../dataSources/BlogDataSource'
import {RequestHandler} from "express";
import CreateBlogRequest from "../models/requests/CreateBlogRequest";
import {assertIsDefined} from "../utils/Helpers";

export const getAllBlogs: RequestHandler = async (req, res, next) => {
    try {
        const blogs = await dataSource.getAllBlogs()
        res.status(200).json(blogs)
    } catch (e) {
        next(e)
    }
}

export const createBlog: RequestHandler<unknown, unknown, CreateBlogRequest, unknown> = async (req, res, next) => {
    try {
        const blogReq = req.body
        const file = req.file
        assertIsDefined(file, "coverImage")
        const blog = await dataSource.createBlog(file, blogReq)
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