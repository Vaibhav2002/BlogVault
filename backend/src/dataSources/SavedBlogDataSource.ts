import savedBlogs from '../models/entities/SavedBlog'
import createHttpError from "http-errors";
import {MongoId} from "../utils/Helpers";

export const saveBlog = async (blogId: string, userId: string) => {
    const savedBlog = await savedBlogs.findOne({blog: blogId, user: userId})
    if (savedBlog) throw createHttpError(400, 'Blog is already saved')
    await savedBlogs.create({
        blog: blogId,
        user: userId
    })
}

export const unSaveBlog = async (blogId: string, userId: string) => {
    const savedBlog = savedBlogs.findOne({blog: blogId, user: userId})
    if (!savedBlog) throw createHttpError(404, 'Blog is not saved')
    await savedBlog.deleteOne()
}

export const getAllSavedBlogs = async (userId: string, page: number) => {
    const pageSize = 10
    const skip = (page - 1) * pageSize
    const filter = {user: userId}

    const blogs = await savedBlogs.find(filter)
        .select('blog -_id')
        .sort({_id: -1})
        .skip(skip)
        .limit(pageSize)
        .populate({
            path: 'blog',
            populate: {
                path: 'author topics',
            }
        })
        .exec()

    const total = await savedBlogs.countDocuments(filter)
    const totalPages = Math.ceil(total / pageSize)

    const allBlogs = blogs.map(blog => blog.blog)

    return {
        blogs: allBlogs,
        page: page,
        totalPages: totalPages
    }
}

export const getSavedBlogIds = async (userId: string) => {
    const savedBlogIds = await savedBlogs.find({user: userId}).select('blog -_id').lean().exec()
    return savedBlogIds.map(savedBlog => savedBlog.blog)
}

export const isSaved = async (blogId: MongoId, userId: MongoId) => {
    return !!(await savedBlogs.findOne({blog: blogId, user: userId}).exec())
}