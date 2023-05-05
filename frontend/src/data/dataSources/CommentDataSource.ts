import api from "./AxiosInstance"
import Comment, {CommentPage} from "@/data/models/Comment";

export const getAllComments = async (blogId:string, lastCommentId?:string) => {
    const response = await api.get<CommentPage>(`/blogs/${blogId}/comments`, {
        params: {continueAfterId: lastCommentId}
    })
    return response.data as CommentPage
}

interface CommentValues{
    comment:string,
    parentCommentId?:string
}

export const createComment = async (blogId:string, comment:CommentValues) => {
    const response = await api.post<Comment>(`/blogs/${blogId}/comment`, comment)
    return response.data
}