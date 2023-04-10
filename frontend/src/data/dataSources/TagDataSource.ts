import api from './AxiosInstance'

export const getAllTags = async () => {
    const response = await api.get<Tag[]>(`/tags`)
    return response.data
}