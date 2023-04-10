import blogs from '../models/entities/Blog';
import CreateBlogRequest from "../models/requests/CreateBlogRequest";
import {getAllTags} from "./TagDataSource";
import createHttpError from "http-errors";

export const createBlog = async (req: CreateBlogRequest) => {

    const tags = (await getAllTags()).map(tag => tag.id)
    const areAllHashtagsValid = req.tags.every(tag => tags.includes(tag))

    if (!areAllHashtagsValid) throw createHttpError('400', 'Invalid tags')

    const isSlugUsed = await blogs.findOne({slug: req.slug}).exec()
    if (isSlugUsed) throw createHttpError('400', 'Slug already used')

    const blog = await blogs.create({
        slug: req.slug,
        title: req.title,
        description: req.description,
        content: req.content,
        tags: req.tags
    })
    return blog
}

export const getAllBlogs = async () => {
    return await blogs.find().exec()
}