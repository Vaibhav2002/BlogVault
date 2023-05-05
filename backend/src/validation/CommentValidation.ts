import * as yup from 'yup'
import {mongoIdSchema} from "../utils/Validation";

const commentBodySchema = yup.string().required().max(300)

export const createCommentSchema = yup.object({
    params: yup.object({
        blogId: mongoIdSchema.required()
    }),
    body:yup.object({
        comment: commentBodySchema,
        parentCommentId: mongoIdSchema
    })
})

export type CreateCommentBody = yup.InferType<typeof createCommentSchema>['body']
export type CreateCommentParams = yup.InferType<typeof createCommentSchema>['params']

export const getCommentsSchema = yup.object({
    params: yup.object({
        blogId: mongoIdSchema.required()
    }),
    query: yup.object({
        continueAfterId: mongoIdSchema
    })
})

export type GetCommentsParams = yup.InferType<typeof getCommentsSchema>['params']
export type GetCommentsQuery = yup.InferType<typeof getCommentsSchema>['query']

export const updateCommentSchema = yup.object({
    params: yup.object({
        commentId: mongoIdSchema.required(),
    }),
    body: yup.object({
        comment: commentBodySchema
    })
})

export type UpdateCommentBody = yup.InferType<typeof updateCommentSchema>['body']
export type UpdateCommentParams = yup.InferType<typeof updateCommentSchema>['params']

export const deleteCommentSchema = yup.object({
    params: yup.object({
        commentId: mongoIdSchema.required()
    })
})

export type DeleteCommentParams = yup.InferType<typeof deleteCommentSchema>['params']