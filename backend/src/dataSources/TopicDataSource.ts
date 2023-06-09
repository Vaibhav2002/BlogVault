import topics from '../models/entities/Topic';
import * as blogDataSource from "./BlogDataSource"
import _ from "lodash";
import {getStartOfTrendingWindow} from "../utils/Helpers";
import createHttpError from "http-errors";

export const getAllTopics = async () => {
    return await topics.find().exec()
}

export const getTrendingTopics = async () => {
    const trendingBlogs = await blogDataSource.getBlogsFrom(getStartOfTrendingWindow())
    const topics = trendingBlogs.flatMap(blog => blog.topics)
    return _.uniqBy(topics, '_id')
}

export const areTopicsValid = async (ids: string[]) => {
    const topics = (await getAllTopics()).map(topic => topic._id.toString())
    return ids.every(id => topics.includes(id))
}

export const getTopicByName = async (name: string) => {
    return await topics.findOne({name: name})
        .collation({locale: "en", strength: 2})
        .exec()
}

export const createTopic = async (topic: string) => {
    if (await getTopicByName(topic)) throw createHttpError(409, 'Topic already exists')
    return await topics.create({name: topic})
}