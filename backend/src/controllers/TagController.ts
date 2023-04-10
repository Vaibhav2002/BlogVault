import {RequestHandler} from "express";
import * as dataSource from '../dataSources/TagDataSource'

export const createTag: RequestHandler = async (req, res, next) => {
    try {
        const tagName = req.query.tag!.toString()
        const tag = await dataSource.createTag(tagName)
        res.status(201).json(tag)
    } catch (e) {
        next(e)
    }
}

export const getAllTags: RequestHandler = async (req, res, next) => {
    try {
        const hashTags = await dataSource.getAllTags()
        res.status(200).json(hashTags)
    } catch (e) {
        next(e)
    }
}