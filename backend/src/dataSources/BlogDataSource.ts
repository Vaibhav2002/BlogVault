import blogs from '../models/entities/Blog';
import CreateBlogRequest from "../models/requests/CreateBlogRequest";
import {getAllTopics} from "./TopicDataSource";
import createHttpError from "http-errors";

export const createBlog = async (req: CreateBlogRequest) => {

    const topics = (await getAllTopics()).map(topic => topic._id.toString())
    const areAllTopicsValid = req.topics.every(topic => topics.includes(topic))

    if (!areAllTopicsValid) throw createHttpError('400', 'Invalid topic')

    const isSlugUsed = await blogs.findOne({slug: req.slug}).exec()
    if (isSlugUsed) throw createHttpError('400', 'Slug already used')

    return await blogs.create({
        slug: req.slug,
        title: req.title,
        description: req.description,
        content: req.content,
        topics: req.topics
    })
}

export const getAllBlogs = async () => {
    return await blogs.find().exec()
}