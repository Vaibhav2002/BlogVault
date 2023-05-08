import {RequestHandler} from "express";
import * as dataSource from '../dataSources/TopicDataSource'

export const getAllTopics: RequestHandler = async (req, res, next) => {
    try {
        const topics = await dataSource.getAllTopics()
        res.status(200).json(topics)
    } catch (e) {
        next(e)
    }
}

export const getTrendingTopics: RequestHandler = async (req, res, next) => {
    try {
        const topics = await dataSource.getTrendingTopics()
        res.status(200).json(topics)
    } catch (e) {
        next(e)
    }
}