import User from "@/data/models/User";

export default interface Comment {
    _id: string
    blogId: string
    parentCommentId?: string
    author:User,
    comment: string
    createdAt: string
    updatedAt: string
}

export interface CommentPage {
    comments: Comment[]
    endOfPaginationReached: boolean
}