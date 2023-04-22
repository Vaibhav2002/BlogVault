import api from "./AxiosInstance"
import User from "@/data/models/User";

export const getUserProfile = async(username:string) => {
    const user = await api.get<User>(`users/profile/${username}`)
    return user.data as User
}