import api from "./AxiosInstance";
import Blog, {BlogPage} from "@/data/models/Blog";
import User from "@/data/models/User";


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

export const uploadInBlogImage = async (image: File) => {
    const formData = new FormData()
    formData.append('inBlogImage', image)
    const response = await api.post<{ url: string }>(`/blogs/upload-image`, formData)
    return response.data
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

    Object.entries(blog).forEach(([key, value]) => {
        if (key === "topics" && value !== undefined) formData.append(key, JSON.stringify(value))
        else if (value !== undefined) formData.append(key, value)
    })

    await api.patch<Blog>(`/blogs/${blogId}`, formData)
}

export const getAllBlogs = async (page: number = 1, cookies?: any) => {
    const response = await api.get<BlogPage>(`/blogs`, {
        params: {page: page},
        withCredentials: true,
        headers: {Cookie: cookies}
    })
    return response.data as BlogPage
}

export const getTrendingBlogs = async (page: number = 1, limit?: number) => {
    const response = await api.get<BlogPage>(`/blogs/trending`, {
        params: {limit: limit, page: page}
    })
    return response.data as BlogPage
}

export const getDiscoverTrendingBlogs = async () => getTrendingBlogs(1, 5)
    .then(page => page.blogs)

export const getTrendingAuthors = async (limit?: number) => {
    const response = await api.get<User[]>(`/blogs/trending/authors`, {
        params: {limit: limit}
    })
    return response.data as User[]
}

export const getDiscoverTrendingAuthors = async () => getTrendingAuthors(5)

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

interface SearchBlogQuery {
    q?: string,
    topic?: string,
    page: number
}

export const searchBlogs = async (query: SearchBlogQuery) => {
    return api.get<BlogPage>(`/blogs/search`, {params: query})
        .then(response => response.data as BlogPage)
}
