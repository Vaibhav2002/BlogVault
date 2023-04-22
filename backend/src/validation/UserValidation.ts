import * as yup from 'yup'

const usernameSchema = yup.string().max(20).matches(/^[a-zA-Z0-9_]*$/)

const emailSchema = yup.string().email();

const passwordSchema = yup.string().min(8).matches(/^(?!.* )/)

export const registerSchema = yup.object({
    body: yup.object({
        username: usernameSchema.required(),
        email: emailSchema.required(),
        password: passwordSchema.required(),
    })
})

export type RegisterRequest = yup.InferType<typeof registerSchema>['body']

export const getProfileSchema = yup.object({
    params: yup.object({
        username: usernameSchema.required()
    })
})