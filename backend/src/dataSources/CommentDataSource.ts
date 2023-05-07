import comments from '../models/entities/Comment'
import * as blogDataSource from './BlogDataSource'
import createHttpError from "http-errors";

export const getComments = async (blogId: string, continueAfterId?: string) => {
    await blogDataSource.getBlogById(blogId) //verify if blog exists

    const pageSize = 3
    const query = comments
        .find({blogId: blogId, parentCommentId:undefined})
        .sort({_id: -1})

    if (continueAfterId)
        query.lt('_id', continueAfterId)

    const allComments = await query
        .limit(pageSize + 1)
        .populate('author')
        .exec()

    const blogComments = allComments.slice(0, pageSize)
    const endOfPaginationReached = allComments.length <= pageSize

    const commentWithReplies = await Promise.all(blogComments.map(async comment => {
        const replies = await comments.countDocuments({parentCommentId: comment._id}).exec()
        return {...comment.toObject(), repliesCount: replies}
    }))

    return {
        comments: commentWithReplies,
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

export const deleteComment = async (userId: string, commentId: string) => {
    const commentToDelete = await getCommentById(commentId)
    assertCommentOwnership(commentToDelete, userId)

    await commentToDelete.deleteOne()
    await comments.find({parentCommentId: commentId}).deleteMany()
}

export const getCommentReplies = async (commentId: string, continueAfterId?: string) => {
    await getCommentById(commentId) //assert comment exists

    const pageSize = 3
    const query = comments.find({parentCommentId: commentId})

    if (continueAfterId)
        query.gt('_id', continueAfterId)

    const replies = await query
        .limit(pageSize + 1)
        .populate('author')
        .exec()

    const commentReplies = replies.slice(0, pageSize)
    const endOfPaginationReached = replies.length <= pageSize

    return {
        comments: commentReplies,
        endOfPaginationReached
    }
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