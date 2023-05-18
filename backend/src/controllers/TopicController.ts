import {RequestHandler} from "express";
import * as dataSource from '../dataSources/TopicDataSource'
import {CreateTopicBody} from "../validation/TopicValidation";

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

export const createTopic: RequestHandler<unknown, unknown, CreateTopicBody, unknown> = async (req, res, next) => {
    try {
        const topicName = req.body.topic
        const topic = await dataSource.createTopic(topicName)
        res.status(201).json(topic)
    } catch (e) {
        next(e)
    }
}