import blogs from '../models/entities/Blog';
import CreateBlogRequest from "../models/requests/CreateBlogRequest";
import {getAllHashTags} from "./HashTagDataSource";
import createHttpError from "http-errors";

export const createBlog = async (req: CreateBlogRequest) => {

    const hashTags = (await getAllHashTags()).map(hashtag => hashtag.id)
    const areAllHashtagsValid = req.hashtags.every(hashtag => hashTags.includes(hashtag))

    if (!areAllHashtagsValid) throw createHttpError('400', 'Invalid hashtags')

    const isSlugUsed = await blogs.findOne({slug: req.slug}).exec()
    if (isSlugUsed) throw createHttpError('400', 'Slug already used')

    const blog = await blogs.create({
        slug: req.slug,
        title: req.title,
        description: req.description,
        content: req.content,
        hashtags: req.hashtags
    })
    return blog
}

export const getAllBlogs = async () => {
    return await blogs.find().exec()
}