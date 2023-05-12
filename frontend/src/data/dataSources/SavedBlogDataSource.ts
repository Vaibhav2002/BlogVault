import api from './AxiosInstance';
import {BlogPage} from "@/data/models/Blog";

export const getSavedBlogs = async (page: number = 1) => {
    const response = await api.get<BlogPage>(`/blogs/saved?page?=${page}`)
    return response.data
}