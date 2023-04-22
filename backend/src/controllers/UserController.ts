import {RequestHandler} from "express";
import * as dataSource from "../dataSources/UserDataSource";
import ApiResponse from "../models/ApiResponse";
import {assertIsDefined} from "../utils/Helpers";
import {RegisterRequest, UpdateProfileRequest} from "../validation/UserValidation";


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

export const registerUser: RequestHandler<unknown, unknown, RegisterRequest, unknown> = async (req, res, next) => {
    try {
        const {username, email, password} = req.body
        const user = await dataSource.registerUser(username, email, password)
        req.login(user, err => {
            if (err) throw err
            else res.status(201).send(user)
        })
    } catch (error) {
        next(error)
    }
}

export const loginUser: RequestHandler = (req, res, next) => {
    res.status(200).json(req.user)
}

export const logoutUser: RequestHandler = (req, res, next) => {
    req.logout(err => {
        if (err) throw err
        else res.status(200).json({message: "User logged out"} as ApiResponse)
    })
}

export const updateProfile:RequestHandler<unknown, unknown, UpdateProfileRequest, unknown> = async (req, res, next) => {
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