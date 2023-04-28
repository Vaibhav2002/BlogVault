import * as yup from 'yup'
import {imageSchema} from "../utils/Validation";

const usernameSchema = yup.string().max(20).matches(/^[a-zA-Z0-9_]*$/)

const emailSchema = yup.string().email();

const passwordSchema = yup.string().min(8).matches(/^(?!.* )/)

export const registerSchema = yup.object({
    body: yup.object({
        username: usernameSchema.required(),
        email: emailSchema.required(),
        password: passwordSchema.required(),
        code: yup.number().integer()
            .test('len', 'Must be exactly 6 digits', val => val?.toString().length === 6)
            .required()
    })
})

export type RegisterRequest = yup.InferType<typeof registerSchema>['body']

export const getProfileSchema = yup.object({
    params: yup.object({
        username: usernameSchema.required()
    })
})


export const updateProfileSchema = yup.object({
    body: yup.object({
        username: usernameSchema,
        displayName: yup.string().max(20),
        about: yup.string().max(200),
    }),
    file: imageSchema
})

export type UpdateProfileRequest = yup.InferType<typeof updateProfileSchema>['body']

export const requestVerificationCodeSchema = yup.object({
    body: yup.object({
        email: emailSchema.required()
    })
})

export type RequestVerificationCodeRequest = yup.InferType<typeof requestVerificationCodeSchema>['body']