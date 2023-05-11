import * as yup from 'yup';
import {mongoIdSchema} from "../utils/Validation";

export const getSavedBlogsSchema = yup.object({
    query: yup.object({
        page: yup.number().min(1),
    })
})

export type PageQuery = yup.InferType<typeof getSavedBlogsSchema>['query']

export const saveBlogSchema = yup.object({
    body: yup.object({
        blogId: mongoIdSchema.required()
    })
})

export type BlogIdBody = yup.InferType<typeof saveBlogSchema>['body']

export const unSaveBlogSchema = yup.object({
    body: yup.object({
        blogId: mongoIdSchema.required()
    })
})