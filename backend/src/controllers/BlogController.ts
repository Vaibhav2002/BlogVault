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