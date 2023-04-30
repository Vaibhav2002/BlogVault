import api from "./AxiosInstance"
import User from "@/data/models/User";

export interface RegisterData {
    email: string
    password: string
    username: string
}

export const registerUser = async (data: RegisterData) => {
    const response = await api.post(`/auth/register`, data)
    return response.data as User
}

export const sendVerificationCode = async (email: string) => {
    const response = await api.post(`/auth/requestVerificationCode`, {email})
    return response.data
}

export interface LoginData {
    username: string
    password: string
}

export const loginUser = async (data: LoginData) => {
    const response = await api.post(`/auth/login`, data)
    return response.data as User
}

export const logoutUser = async () => {
    const response = await api.post(`/auth/logout`)
    return response.data
}

export const googleLoginUrl = (returnTo: string) => {
    return process.env.NEXT_PUBLIC_BACKEND_URL + `/auth/login/google?returnTo=${returnTo}`
}

export const githubLoginUrl = (returnTo: string) => {
    return process.env.NEXT_PUBLIC_BACKEND_URL + `/auth/login/github?returnTo=${returnTo}`
}