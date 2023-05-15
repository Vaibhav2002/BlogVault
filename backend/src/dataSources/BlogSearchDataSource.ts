import * as topicDataSource from './TopicDataSource';
import * as userDataSource from './UserDataSource';
import blogModel from '../models/entities/Blog';
import createHttpError from "http-errors";
import {MongoId} from "../utils/Helpers";
import {attachIsSaved} from "./BlogDataSource";

interface SearchBlogQueries {
    query?: string,
    topicQuery?: string,
    authorNameQuery?: string,
    page?: number
}

const searchBlogs = async ({query, topicQuery, authorNameQuery, page = 1}: SearchBlogQueries, userId?: MongoId) => {
    let topic = topicQuery ? await validateTopic(topicQuery) : undefined
    let author = authorNameQuery ? await validateAuthor(authorNameQuery) : undefined

    const filter = {
        ...(topic && {topics: topic._id}),
        ...(author && {author: author._id}),
    }
    const searchFilter = query ? {$text: {$search: query}} : {}

    const pageSize = 10
    const skip = (page - 1) * pageSize

    const blogsQuery = blogModel
        .find(filter)
        .find(searchFilter)
        .sort({
            ...(query ? {score: {$meta: "textScore"}} : {createdAt: -1})
        })
        .skip(skip)
        .limit(pageSize)
        .populate('author topics')
        .lean()
        .exec()

    const totalCountQuery = blogModel.countDocuments({...filter, ...searchFilter}).exec()

    const [blogs, totalCount] = await Promise.all([blogsQuery, totalCountQuery])
    const totalPages = Math.ceil(totalCount / pageSize)

    return {
        page: page,
        blogs: userId ? await attachIsSaved(blogs, userId) : blogs,
        totalPages: totalPages
    }

}

const validateTopic = async (topicName: string) => {
    const topic = await topicDataSource.getTopicByName(topicName);
    if (!topic) throw createHttpError(404, 'Topic with this name not found');
    return topic
}

const validateAuthor = async (authorName: string) => {
    const author = await userDataSource.getUserByUsername(authorName);
    if (!author) throw createHttpError(404, 'User with this username not found');
    return author
}

export default searchBlogs