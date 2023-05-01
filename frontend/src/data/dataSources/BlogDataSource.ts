import api from "./AxiosInstance";
import Blog, {BlogPage} from "@/data/models/Blog";


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
        if (key === "topics")
            formData.append(key, JSON.stringify(value))
        else formData.append(key, value)
    })

    const response = await api.post<Blog>(`/blogs`, formData)
    return response.data as Blog
}


interface UpdateBlogData {
    title: string
    description: string
    content: string
    slug: string
    topics: string[]
    coverImage?: File
}

export const updateBlog = async (blogId: string, blog: UpdateBlogData) => {
    const formData = new FormData()

    console.log(JSON.stringify(blog.topics))
    Object.entries(blog).forEach(([key, value]) => {
        if (key === "topics" && value !== undefined) formData.append(key, JSON.stringify(value))
        else if (value !== undefined) formData.append(key, value)
    })

    console.log(formData.get("topics"))

    await api.patch<Blog>(`/blogs/${blogId}`, formData)
}

export const getAllBlogs = async (page: number = 1) => {
    const response = await api.get<BlogPage>(`/blogs?page=${page}`)
    return response.data as BlogPage
}

export const getBlogsOfUser = async (userId: string, page: number = 1) => {
    const response = await api.get<BlogPage>(`/blogs?authorId=${userId}&page=${page}`)
    return response.data as BlogPage
}

export const getAllSlugs = async () => {
    const response = await api.get<string[]>(`/blogs/slugs`)
    return response.data as string[]
}

export const getBlogBySlug = async (slug: string) => {
    const response = await api.get<Blog>(`/blogs/${slug}`)
    return response.data as Blog
}

export const deleteBlog = async (blogId: string) => {
    await api.delete(`/blogs/${blogId}`)
}