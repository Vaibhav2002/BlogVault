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
    email: string
    password: string
}

export const loginUser = async (data:LoginData) => {
    const response = await api.post(`/users/login`, data)
    return response.data as User
}