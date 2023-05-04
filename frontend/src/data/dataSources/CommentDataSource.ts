import api from "./AxiosInstance"
import {CommentPage} from "@/data/models/Comment";

export const getAllComments = async (blogId:string, lastCommentId?:string) => {
    const response = await api.get<CommentPage>(`/blogs/${blogId}/comments`, {
        params: {continueAfterId: lastCommentId}
    })
    return response.data as CommentPage
}