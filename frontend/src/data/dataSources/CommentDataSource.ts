import api from "./AxiosInstance"
import Comment, {CommentPage} from "@/data/models/Comment";

export const getAllComments = async (blogId:string, lastCommentId?:string) => {
    const response = await api.get<CommentPage>(`/blogs/${blogId}/comments`, {
        params: {continueAfterId: lastCommentId}
    })
    return response.data as CommentPage
}

interface CommentValues {
    comment: string,
    parentCommentId?: string
}

export const createComment = async (blogId: string, comment: CommentValues) => {
    const response = await api.post<Comment>(`/blogs/${blogId}/comment`, comment)
    return response.data
}

interface UpdateCommentValues {
    comment: string,
}

export const updateComment = async (commentId: string, comment: UpdateCommentValues) => {
    const response = await api.patch<Comment>(`blogs/comments/${commentId}`, comment)
    return response.data
}

export const deleteComment = async (commentId: string) => {
    await api.delete(`/blogs/comments/${commentId}`)
}

export const getCommentReplies = async (commentId: string, lastCommentId?: string) => {
    const response = await api.get<CommentPage>(`/blogs/comments/${commentId}/replies`, {
        params: {continueAfterId: lastCommentId}
    })
    return response.data as CommentPage
}