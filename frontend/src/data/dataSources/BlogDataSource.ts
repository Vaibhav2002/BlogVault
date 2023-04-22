import api from "./AxiosInstance";
import Blog from "@/data/models/Blog";


export interface BlogData {
    title: string
    description: string
    content: string
    slug: string
    topics: string[]
    coverImage: File
}

export const createBlog = async (blog: BlogData) => {
    const formData = new FormData()

    Object.entries(blog).forEach(([key, value]) => {
        if(key === "topics")
            formData.append(key, JSON.stringify(value))
        else formData.append(key, value)
    })

    formData.forEach((value, key) => {
        console.log(`${key} =  ${value}`)
    })

    const response = await api.post<Blog>(`/blogs`, formData)
    return response.data as Blog
}

export const getAllBlogs = async () => {
    const response = await api.get<Blog[]>(`/blogs`)
    return response.data as Blog[]
}

export const getBlogsOfUser = async(userId:string) => {
    const response = await api.get<Blog[]>(`/blogs?authorId=${userId}`)
    return response.data as Blog[]
}

export const getAllSlugs = async () => {
    const response = await api.get<string[]>(`/blogs/slugs`)
    return response.data as string[]
}

export const getBlogBySlug = async (slug: string) => {
    const response = await api.get<Blog>(`/blogs/${slug}`)
    return response.data as Blog
}