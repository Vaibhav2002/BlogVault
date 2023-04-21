import {RequestHandler} from "express";
import * as dataSource from "../dataSources/UserDataSource";
import RegisterRequest from "../models/requests/RegisterRequest";
import ApiResponse from "../models/ApiResponse";
import {assertIsDefined} from "../utils/Helpers";


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

export const registerUser: RequestHandler<unknown, unknown, RegisterRequest, unknown> = async (req, res, next) => {
    try {
        const user = await dataSource.registerUser(req.body)
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