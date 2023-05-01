import axios from "axios";
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
    TooManyRequestsError,
    UnauthorizedError
} from "@/data/HttpErrors";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 5000,
    withCredentials: true
})

axiosInstance.interceptors.response.use(null, error => {
    if(!axios.isAxiosError(error)) throw error
    const errMessage = error.response?.data.message || error.message || "Oops something went wrong"
    switch(error.response?.status){
        case 400: throw new BadRequestError(errMessage)
        case 401: throw new UnauthorizedError(errMessage)
        case 404: throw new NotFoundError(errMessage)
        case 409: throw new ConflictError(errMessage)
        case 429: throw new TooManyRequestsError(errMessage)
    }
}, { synchronous: true })

export default axiosInstance