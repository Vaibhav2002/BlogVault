import api from './AxiosInstance'

export const getAllTopics = async () => {
    const response = await api.get<Topic[]>(`/topics`)
    return response.data as Topic[]
}

export const getTrendingTopics = async () => {
    const response = await api.get<Topic[]>(`/topics/trending`)
    return response.data as Topic[]
}

export const createNewTopic = async (topic: string) => {
    const response = await api.post<Topic>(`/topics`, {topic})
    return response.data as Topic
}