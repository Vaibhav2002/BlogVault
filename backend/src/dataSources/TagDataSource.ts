import hashTags from '../models/entities/Tag';
import createHttpError from "http-errors";

export const createTag = async (name: string) => {

    const doesTagAlreadyExist = await hashTags.findOne({name: name}).exec()
    if (doesTagAlreadyExist)
        throw createHttpError(400, 'Tag already exists')

    return await hashTags.create({name: name})
}

export const getAllTags = async () => {
    return await hashTags.find().exec()
}