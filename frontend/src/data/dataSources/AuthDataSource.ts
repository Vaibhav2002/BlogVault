import api from "./AxiosInstance"
import User from "@/data/models/User";

export interface RegisterData {
    email: string
    password: string
    username: string
}

export const registerUser = async (data: RegisterData) => {
    const response = await api.post(`/users/register`, data)
    return response.data as User
}

export interface LoginData {
    username: string
    password: string
}

export const loginUser = async (data:LoginData) => {
    const response = await api.post(`/users/login`, data)
    return response.data as User
}

export const getAuthenticatedUser = async () => {
    const response = await api.get(`/users/me`)
    return response.data as User
}

export const logoutUser = async () => {
    const response = await api.post(`/users/logout`)
    return response.data
}

export const googleLoginUrl = (returnTo:string) => {
    return process.env.NEXT_PUBLIC_BACKEND_URL + `/users/login/google?returnTo=${returnTo}`
}