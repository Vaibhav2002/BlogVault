import hashTags from '../models/entities/HashTag';
import createHttpError from "http-errors";

export const createHashTag = async (name: string) => {

    const doesTagAlreadyExist = await hashTags.findOne({name: name}).exec()
    if (doesTagAlreadyExist)
        throw createHttpError(400, 'HashTag already exists')

    const hashTag = await hashTags.create({name: name})
    return hashTag
}

export const getAllHashTags = async () => {
    return await hashTags.find().exec()
}