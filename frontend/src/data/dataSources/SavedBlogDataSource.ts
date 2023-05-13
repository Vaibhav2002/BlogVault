import api from './AxiosInstance';
import {BlogPage} from "@/data/models/Blog";

export const getSavedBlogs = async (page: number = 1) => {
    const response = await api.get<BlogPage>(`/blogs/saved?page?=${page}`)
    return response.data
}

export const saveBlog = async (slug: string) => {
    await api.post(`/blogs/${slug}/save`)
}

export const unSaveBlog = async (slug: string) => {
    await api.delete(`/blogs/${slug}/un=save`)
}