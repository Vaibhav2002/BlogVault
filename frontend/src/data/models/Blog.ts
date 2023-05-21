import User from "@/data/models/User";
import Topic from "@/data/models/Topic";

export default interface Blog {
    _id: string
    title: string
    slug: string
    description: string
    content: string
    topics: Topic[]
    createdAt: string
    updatedAt: string
    coverImage: string,
    posterImage: string
    views: number,
    author: User,
    isSaved?: boolean
}

export interface BlogPage {
    page: number
    blogs: Blog[]
    totalPages: number
}