import {RequestHandler} from "express";
import {
    CreateCommentBody,
    CreateCommentParams,
    GetCommentsParams,
    GetCommentsQuery,
    UpdateCommentBody,
    UpdateCommentParams
} from "../validation/CommentValidation";
import * as dataSource from "../dataSources/CommentDataSource";
import {assertIsDefined} from "../utils/Helpers";

export const getComments:RequestHandler<GetCommentsParams, unknown, unknown, GetCommentsQuery> = async(req, res, next) => {
    try{
        const {blogId} = req.params
        const {continueAfterId} = req.query

        const comments = await dataSource.getComments(blogId, continueAfterId)

        res.status(200).json(comments)
    } catch(e){
        next(e)
    }
}

export const createComment:RequestHandler<CreateCommentParams, unknown, CreateCommentBody, unknown> = async(req, res, next)=>{
    const author = req.user?._id
    try{
        assertIsDefined(author, 'Author')
        const {blogId} = req.params
        const {parentCommentId, comment} = req.body

        const newComment = await dataSource.createComment(blogId, author.toString(), comment, parentCommentId)
        res.status(201).json(newComment)
    } catch (e) {
        next(e)
    }
}

export const updateComment: RequestHandler<UpdateCommentParams, unknown, UpdateCommentBody, unknown> = async (req, res, next) => {
    const author = req.user?._id
    try {
        assertIsDefined(author, 'Author')
        const {commentId} = req.params
        const {comment} = req.body

        const updatedComment = await dataSource.updateComment(author.toString(), commentId, comment)
        res.status(200).json(updatedComment)
    } catch (e) {
        next(e)
    }
}