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