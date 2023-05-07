import blogs from '../models/entities/Blog';
import * as topicDataSource from "./TopicDataSource";
import createHttpError from "http-errors";
import * as imageDataSource from "./ImageDataSource";
import * as mongoose from "mongoose";
import {BlogBody} from "../validation/BlogValidation";
import {appendLastUpdated, MongoId} from "../utils/Helpers";
import env from "../utils/CleanEnv";
import * as crypto from "crypto";

export const createBlog = async (userId: mongoose.Types.ObjectId, coverImage: Express.Multer.File, req: BlogBody) => {

    if (await isSlugTaken(req.slug)) throw createHttpError('409', 'Slug already used')

    if (!(await topicDataSource.areTopicsValid(JSON.parse(req.topics))))
        throw createHttpError('400', 'Invalid topics')

    const id = new mongoose.Types.ObjectId()

    const [coverImagePath, posterPath] = await Promise.all([
        imageDataSource.saveCoverImage(coverImage, id.toString()),
        imageDataSource.savePosterImage(coverImage, id.toString())
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

export const uploadInBlogImage = async (image: Express.Multer.File) => {
    const fileName = crypto.randomBytes(20).toString('hex')
    const url = await imageDataSource.saveInBlogImage(image, fileName)
    return {
        url: url
    }
}

export const getAllSlugs = async () => {
    const allBlogs = await blogs.find().select('slug').exec()
    return allBlogs.map(blog => blog.slug)
}

export const getBlogBySlug = async (slug: string) => {
    const blog = await blogs.findOne({slug: slug})
        .populate("topics author")
        .exec()
    if (!blog) throw createHttpError('404', 'Blog not found')
    return blog
}

export const getBlogById = async (id: string) => {
    const blog = await blogs.findById(id).exec()
    if (!blog) throw createHttpError('404', 'Blog with this id not found')
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

    const blog = await assertBlogExistsAndIsOfUser(userId, blogId)

    if (!(await topicDataSource.areTopicsValid(JSON.parse(blogBody.topics))))
        throw createHttpError(400, 'Invalid topics present')

    const [coverImagePath, posterImagePath] = coverImage ? await Promise.all([
        imageDataSource.saveCoverImage(coverImage, blogId.toString()),
        imageDataSource.savePosterImage(coverImage, blogId.toString())
    ]) : [undefined, undefined]

    blog.title = blogBody.title
    blog.slug = blogBody.slug
    blog.description = blogBody.description
    blog.content = blogBody.content
    blog.topics = JSON.parse(blogBody.topics)

    if (coverImagePath) blog.coverImage = appendLastUpdated(coverImagePath)
    if (posterImagePath) blog.posterImage = appendLastUpdated(posterImagePath)

    await blog.save()
}

export const deleteBlog = async (userId: MongoId, blogId: string) => {
    const blog = await assertBlogExistsAndIsOfUser(userId, blogId)

    if (blog.coverImage.startsWith(env.SERVER_URL)) imageDataSource.removeImage(blog.coverImage)
    if (blog.posterImage.startsWith(env.SERVER_URL)) imageDataSource.removeImage(blog.posterImage)

    await blog.deleteOne()
}


const assertBlogExistsAndIsOfUser = async (userId: MongoId, blogId: string) => {
    const blog = await blogs.findById(blogId).populate("author").exec()

    if (!blog) throw createHttpError(404, 'Blog not found')

    if (!blog.author._id.equals(userId))
        throw createHttpError(401, 'You are not authorized to access this blog')

    return blog
}

const isSlugTaken = async (slug: string, blogId?: string) => {
    const blog = await blogs.findOne({slug: slug}).populate("author").exec()
    if (blogId) return blog && !blog._id.equals(blogId)
    return blog
}