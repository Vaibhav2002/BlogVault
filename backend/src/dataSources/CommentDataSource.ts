import comments from '../models/entities/Comment'
import * as blogDataSource from './BlogDataSource'
import createHttpError from "http-errors";

export const getComments = async (blogId: string, continueAfterId?: string) => {
    await blogDataSource.getBlogById(blogId) //verify if blog exists

    const pageSize = 3
    const query = comments
        .find({blogId: blogId, parentCommentId:undefined})
        .sort({_id: -1})

    if(continueAfterId)
        query.lt('_id', continueAfterId)

    const allComments = await query
        .populate('author')
        .limit(pageSize + 1)
        .exec()

    const blogComments = allComments.slice(0, pageSize)
    const endOfPaginationReached = allComments.length <= pageSize

    return {
        comments: blogComments,
        endOfPaginationReached
    }
}

export const createComment = async (blogId:string, authorId:string, comment:string, parentCommentId?:string) => {
    await blogDataSource.getBlogById(blogId) //verify if blog exists

    const newComment = await comments.create({
        blogId: blogId,
        author: authorId,
        comment: comment,
        parentCommentId: parentCommentId
    })

    await comments.populate(newComment, {path: 'author'})

    return newComment
}

export const updateComment = async (userId: string, commentId: string, comment: string) => {
    const commentToUpdate = await getCommentById(commentId)
    assertCommentOwnership(commentToUpdate, userId)

    commentToUpdate.comment = comment
    await commentToUpdate.save()

    return commentToUpdate
}

const getCommentById = async (commentId: string) => {
    const comment = await comments.findById(commentId).populate('author').exec()
    if (!comment) throw createHttpError(404, 'Comment not found')
    return comment
}

const assertCommentOwnership = (comment: any, userId: string) => {
    if (!comment.author._id.equals(userId))
        throw createHttpError(403, 'You are not the owner of this comment')
}