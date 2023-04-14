import api from './AxiosInstance'

export const getAllTags = async () => {
    const response = await api.get<Topic[]>(`/topics`)
    return response.data
}