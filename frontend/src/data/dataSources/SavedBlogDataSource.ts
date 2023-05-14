import api from './AxiosInstance';
import {BlogPage} from "@/data/models/Blog";

export const getSavedBlogs = async (page: number = 1) => {
    return await api.get<BlogPage>(`/blogs/saved?page?=${page}`)
        .then(response => response.data)
        .then(blogPage => ({
            ...blogPage,
            blogs: blogPage.blogs.map(blog => ({
                ...blog,
                isSaved: true
            }))
        }))
}

export const saveBlog = async (slug: string) => {
    await api.post(`/blogs/${slug}/save`)
}

export const unSaveBlog = async (slug: string) => {
    await api.delete(`/blogs/${slug}/un-save`)
}