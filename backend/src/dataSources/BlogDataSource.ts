import blogs from '../models/entities/Blog';
import * as topicDataSource from "./TopicDataSource";
import {getAllTopics} from "./TopicDataSource";
import createHttpError from "http-errors";
import {saveCoverImage, savePosterImage} from "./ImageDataSource";
import * as mongoose from "mongoose";
import {BlogBody} from "../validation/BlogValidation";
import {appendLastUpdated, MongoId} from "../utils/Helpers";

export const createBlog = async (userId: mongoose.Types.ObjectId, coverImage: Express.Multer.File, req: BlogBody) => {

    if (await isSlugTaken(req.slug)) throw createHttpError('409', 'Slug already used')

    if(await topicDataSource.areTopicsValid(JSON.parse(req.topics)))
        throw createHttpError('400', 'Invalid topics')

    const id = new mongoose.Types.ObjectId()

    const [coverImagePath, posterPath] = await Promise.all([
        saveCoverImage(coverImage, id.toString()), savePosterImage(coverImage, id.toString())
    ])

    return await blogs.create({
        _id: id,
        slug: req.slug,
        title: req.title,
        description: req.description,
        content: req.content,
        topics: JSON.parse(req.topics),
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

export const getAllBlogs = async (page: number, authorId?: string) => {
    const filter = authorId ? {author: authorId} : {}
    const pageSize = 10
    const skip = (page - 1) * pageSize

    const blogQuery = blogs.find(filter)
        .sort({_id: -1})
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


export const updateBlog = async (userId: MongoId, blogId: string, blogBody: BlogBody, coverImage?: Express.Multer.File) => {

    if (await isSlugTaken(blogBody.slug, blogId))
        throw createHttpError(409, 'Slug already used')

    const blog = await blogs.findById(blogId).populate("author").exec()

    if (!blog)
        throw createHttpError(404, 'Blog not found')

    if (!blog.author._id.equals(userId))
        throw createHttpError(401, 'You are not authorized to edit this blog as you are not the author')

    if (!(await topicDataSource.areTopicsValid(JSON.parse(blogBody.topics))))
        throw createHttpError(400, 'Invalid topics present')

    const [coverImagePath, posterImagePath] = coverImage ? await Promise.all([
        saveCoverImage(coverImage, blogId.toString()),
        savePosterImage(coverImage, blogId.toString())
    ]) : [undefined, undefined]

    blog.title = blogBody.title
    blog.slug = blogBody.slug
    blog.description = blogBody.description
    blog.content = blogBody.content
    blog.topics = JSON.parse(blogBody.topics)

    if(coverImagePath) blog.coverImage = appendLastUpdated(coverImagePath)
    if(posterImagePath) blog.posterImage = appendLastUpdated(posterImagePath)

    await blog.save()
}

const isSlugTaken = async (slug: string, blogId?: string) => {
    const blog = await blogs.findOne({slug: slug}).populate("author").exec()
    if(blogId) return blog && !blog._id.equals(blogId)
    return blog
}