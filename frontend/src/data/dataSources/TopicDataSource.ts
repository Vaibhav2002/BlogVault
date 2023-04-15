import api from './AxiosInstance'

export const getAllTopics = async () => {
    const response = await api.get<Topic[]>(`/topics`)
    return response.data
}