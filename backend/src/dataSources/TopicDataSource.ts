import topics from '../models/entities/Topic';

export const getAllTopics = async () => {
    return await topics.find().exec()
}