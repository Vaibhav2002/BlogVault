import * as yup from 'yup';


export const requiredStringSchema = yup.string().required('Required');

export const usernameSchema = yup.string()
    .matches(/^[a-zA-Z0-9_]*$/, 'Username must only contain letters, numbers, and underscores')
    .max(20, 'Username must be at most 20 characters')

export const emailSchema = yup.string().email('Invalid email');

export const passwordSchema = yup.string()
    .matches(/^(?!.* )/, "Must not contain any whitespaces")
    .min(8, 'Password must be at least 8 characters')

export const slugSchema = yup.string()
    .matches(/^[a-zA-Z0-9_-]*$/, 'No Special Characters or spaces allowed')

export const requiredFileSchema  = yup.mixed<File>().required('Required')
