import topics from '../models/entities/Topic';

export const getAllTopics = async () => {
    return await topics.find().exec()
}

export const areTopicsValid = async (ids: string[]) => {
    const topics = (await getAllTopics()).map(topic => topic._id.toString())
    return ids.every(id => topics.includes(id))
}