import {RequestHandler} from "express";
import * as dataSource from '../dataSources/HashTagDataSource'

export const createHashTag: RequestHandler = async (req, res, next) => {
    try {
        const tag = req.query.hashTag!.toString()
        const hashTag = await dataSource.createHashTag(tag)
        res.status(201).json(hashTag)
    } catch (e) {
        next(e)
    }
}

export const getAllHashTags: RequestHandler = async (req, res, next) => {
    try {
        const hashTags = await dataSource.getAllHashTags()
        res.status(200).json(hashTags)
    } catch (e) {
        next(e)
    }
}