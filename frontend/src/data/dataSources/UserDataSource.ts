import api from "./AxiosInstance"
import User from "@/data/models/User";

export const getAuthenticatedUser = async () => {
    const response = await api.get(`/users/me`)
    return response.data as User
}

export const getUserProfile = async (username: string) => {
    const user = await api.get<User>(`users/profile/${username}`)
    return user.data as User
}

export interface UpdateUserRequest {
    username?: string
    displayName?: string
    about?: string
    profilePic?: File
}


export const updateUserProfile = async (user: UpdateUserRequest) => {
    const formData = new FormData()
    Object.entries(user).forEach(([key, value]) => {
        if (value !== undefined)
            formData.append(key, value)
    })
    const response = await api.patch<User>('users/me', formData)
    return response.data as User
}