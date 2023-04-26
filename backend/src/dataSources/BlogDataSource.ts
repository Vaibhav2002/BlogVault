import blogs from '../models/entities/Blog';
import {getAllTopics} from "./TopicDataSource";
import createHttpError from "http-errors";
import {saveCoverImage, savePosterImage} from "./ImageDataSource";
import * as mongoose from "mongoose";
import {BlogBody} from "../validation/BlogValidation";

export const createBlog = async (userId: mongoose.Types.ObjectId, coverImage: Express.Multer.File, req: BlogBody) => {

    const topics = (await getAllTopics()).map(topic => topic._id.toString())
    const blogTopics = JSON.parse(req.topics) as string[]

    const areAllTopicsValid = blogTopics.every(topic => topics.includes(topic))
    if (!areAllTopicsValid) throw createHttpError('400', 'Invalid topic')

    const isSlugUsed = await blogs.findOne({slug: req.slug}).exec()
    if (isSlugUsed) throw createHttpError('409', 'Slug already used')

    const id = new mongoose.Types.ObjectId()

    const coverImagePath = await saveCoverImage(coverImage, id.toString())
    const posterPath = await savePosterImage(coverImage, id.toString())

    return await blogs.create({
        _id: id,
        slug: req.slug,
        title: req.title,
        description: req.description,
        content: req.content,
        topics: blogTopics,
        coverImage: coverImagePath,
        posterImage: posterPath,
        author: userId
    })
}

export const getAllSlugs = async () => {
    const allBlogs = await blogs.find().select('slug').exec()
    const slugs = allBlogs.map(blog => blog.slug)
    return slugs
}

export const getBlogBySlug = async (slug: string) => {
    const blog = await blogs.findOne({slug: slug})
        .populate("topics author")
        .exec()
    if (!blog) throw createHttpError('404', 'Blog not found')
    return blog
}

export const getAllBlogs = async (page:number, authorId?:string) => {
    const filter = authorId ? {author: authorId} : {}
    const pageSize = 10
    const skip = (page - 1) * pageSize

    const blogQuery = blogs.find(filter)
        .sort({_id:-1})
        .skip(skip)
        .limit(pageSize)
        .populate('author topics')
        .exec()

    const totalPagesQuery = blogs.countDocuments(filter).exec()

    const [allBlogs, totalCount] = await Promise.all([blogQuery, totalPagesQuery])

    const totalPages = Math.ceil(totalCount / pageSize)

    return {
        blogs: allBlogs,
        page: page,
        totalPages: totalPages
    }
}