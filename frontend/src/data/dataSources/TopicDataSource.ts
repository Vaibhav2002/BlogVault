import api from './AxiosInstance'

export const getAllTopics = async () => {
    const response = await api.get<Topic[]>(`/topics`)
    return response.data
}

export const getTrendingTopics = async () => {
    const response = await api.get<Topic[]>(`/topics/trending`)
    return response.data
}