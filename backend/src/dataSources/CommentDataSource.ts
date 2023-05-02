import comments from '../models/entities/Comment'
import * as blogDataSource from './BlogDataSource'

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
        parentCommentId:parentCommentId
    })

    await comments.populate(newComment, {path: 'author'})

    return newComment
}