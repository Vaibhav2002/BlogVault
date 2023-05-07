import rateLimit from "express-rate-limit";
import {apiResponse} from "../models/ApiResponse";

export const loginRateLimit = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: apiResponse("Too many login attempts, please try again after 10 minutes"),
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false
})

export const verificationCodeRateLimit = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 1, // limit each IP to 1 requests per windowMs
    message: apiResponse("Too many verification code requests, please try again after a minute"),
    skipFailedRequests: true,
    standardHeaders: true,
    legacyHeaders: false
})

export const postBlogRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 requests per windowMs
    message: apiResponse("You're publishing too many blogs, please try again after 3 hours"),
    skipFailedRequests: true,
    standardHeaders: true,
    legacyHeaders: false
})

export const updateBlogRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // limit each IP to 50 requests per windowMs
    message: apiResponse("You're updating too frequently, please try again after 1 hour"),
    skipFailedRequests: true,
    standardHeaders: true,
    legacyHeaders: false
})

export const uploadInBlogImageRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // limit each IP to 5 requests per windowMs
    message: apiResponse("You're uploading too many images, please try again after 1 hour"),
    skipFailedRequests: true,
    standardHeaders: true,
    legacyHeaders: false
})