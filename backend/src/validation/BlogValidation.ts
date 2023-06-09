import * as yup from 'yup'
import {imageSchema, mongoIdSchema} from "../utils/Validation";

const blogBodySchema = yup.object({
    title: yup.string().required().max(100),
    description: yup.string().required().max(300),
    slug: yup.string().required().matches(/^[a-zA-Z0-9_-]*$/),
    content: yup.string().required(),
    topics: yup.string().required().test(
        'valid-topics',
        'Topics must be a comma separated list of topic ids of at most 3 size',
        topics => {
            try {
                const topicArray = JSON.parse(topics) as string[]
                return topicArray.length > 0 && topicArray.length <= 3
            } catch (e) {
                return false
            }
        }
    )
})

export const createBlogSchema = yup.object({
    body: blogBodySchema,
    file: imageSchema.required()
})


export type BlogBody = yup.InferType<typeof blogBodySchema>


export const getBlogsSchema = yup.object({
    query: yup.object({
        authorId: mongoIdSchema,
        page: yup.number().integer().min(1)
    })
})

export type GetBlogsQuery = yup.InferType<typeof getBlogsSchema>['query']

export const getTrendingBlogsSchema = yup.object({
    query: yup.object({
        limit: yup.number().integer().min(1),
        page: yup.number().integer().min(1)
    })
})

export type LimitQuery = yup.InferType<typeof getTrendingBlogsSchema>['query']

export const getTrendingAuthorsSchema = yup.object({
    query: yup.object({
        limit: yup.number().integer().min(1)
    })
})

const blogIdParamSchema = yup.object({
    blogId: mongoIdSchema.required()
})

export type BlogIdParam = yup.InferType<typeof blogIdParamSchema>

export const updateBlogSchema = yup.object({
    params: blogIdParamSchema,
    body: blogBodySchema,
    file: imageSchema
})

export const deleteBlogSchema = yup.object({
    params: blogIdParamSchema
})

export const inBlogImageSchema = yup.object({
    file: imageSchema.required('image is required')
})

export const searchBlogsSchema = yup.object({
    query: yup.object({
        q: yup.string(),
        topic: yup.string(),
        page: yup.number().integer().min(1),
        author: yup.string()
    })
})

export type SearchBlogQuery = yup.InferType<typeof searchBlogsSchema>['query']