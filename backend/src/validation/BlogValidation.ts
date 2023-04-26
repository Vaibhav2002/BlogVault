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
            try{
                const topicArray = JSON.parse(topics) as string[]
                return topicArray.length > 0 && topicArray.length <= 3
            } catch(e){
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


export const updateBlogSchema = yup.object({
    params: yup.object({
        blogId: mongoIdSchema.required()
    }),
    body: blogBodySchema,
    file: imageSchema
})

export type UpdateBlogParams = yup.InferType<typeof updateBlogSchema>['params']