import {RequestHandler} from "express";
import * as dataSource from "../dataSources/UserDataSource";
import {assertIsDefined} from "../utils/Helpers";
import {UpdateProfileRequest} from "../validation/UserValidation";


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const userId = req.user?._id
    try {
        assertIsDefined(userId, "User Id")
        const user = await dataSource.getUserById(userId, "+email")
        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}

export const getUserProfile: RequestHandler = async (req, res, next) => {
    const username = req.params.username

    try {
        assertIsDefined(username, "Username")
        const user = await dataSource.getUserByUsername(username)
        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}

export const updateProfile: RequestHandler<unknown, unknown, UpdateProfileRequest, unknown> = async (req, res, next) => {
    const userId = req.user?._id
    try {
        assertIsDefined(userId, "User Id")
        const {username, displayName, about} = req.body
        const profilePic = req.file
        const user = await dataSource.updateProfile(userId, username, displayName, about, profilePic)
        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}