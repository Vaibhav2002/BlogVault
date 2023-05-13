import * as yup from 'yup';

export const getSavedBlogsSchema = yup.object({
    query: yup.object({
        page: yup.number().min(1),
    })
})

export type PageQuery = yup.InferType<typeof getSavedBlogsSchema>['query']