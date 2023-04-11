import api from "./AxiosInstance";
import Blog from "@/data/models/Blog";


export interface BlogData {
    title: string
    content: string
    tags: string[]
    description: string
}

export const createBlog = async (blog: BlogData) => {
    const response = await api.post<Blog>(`/blogs`, blog)
    return response.data as Blog
}