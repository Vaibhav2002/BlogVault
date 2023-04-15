import blogs from '../models/entities/Blog';
import CreateBlogRequest from "../models/requests/CreateBlogRequest";
import {getAllTopics} from "./TopicDataSource";
import createHttpError from "http-errors";
import * as Mongoose from "mongoose";
import {saveCoverImage} from "./ImageDataSource";

export const createBlog = async (
    coverImage: Express.Multer.File,
    req: CreateBlogRequest
) => {

    const topics = (await getAllTopics()).map(topic => topic._id.toString())
    const areAllTopicsValid = req.topics.every(topic => topics.includes(topic))

    if (!areAllTopicsValid) throw createHttpError('400', 'Invalid topic')

    const isSlugUsed = await blogs.findOne({slug: req.slug}).exec()
    if (isSlugUsed) throw createHttpError('400', 'Slug already used')

    const id = new Mongoose.Types.ObjectId()

    const coverImagePath = await saveCoverImage(coverImage, id.toString())

    return await blogs.create({
        _id: id,
        slug: req.slug,
        title: req.title,
        description: req.description,
        content: req.content,
        topics: req.topics,
        coverImage:coverImagePath
    })
}

export const getAllBlogs = async () => {
    return await blogs.find().exec()
}