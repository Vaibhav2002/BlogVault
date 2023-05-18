import * as yup from 'yup'

export const createTopicSchema = yup.object({
    body: yup.object({
        topic: yup.string()
            .matches(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/, 'Special characters are not allowed')
            .max(20, 'Topic name must be less than 20 characters')
            .required('Required')
    })
})

export type CreateTopicBody = yup.InferType<typeof createTopicSchema>['body']