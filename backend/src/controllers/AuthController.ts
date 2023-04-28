import {RequestHandler} from "express";
import {RegisterRequest, RequestVerificationCodeRequest} from "../validation/UserValidation";
import * as verificationDataSource from "../dataSources/VerificationDataSource";
import ApiResponse from "../models/ApiResponse";
import * as dataSource from "../dataSources/UserDataSource";

export const requestVerificationCode:RequestHandler<unknown, unknown, RequestVerificationCodeRequest, unknown> = async(req, res, next) => {
    try{
        const {email} = req.body
        await verificationDataSource.sendVerificationCode(email)
        res.status(200).json({message: 'Verification code sent'} as ApiResponse)
    }catch(e){
        next(e)
    }
}

export const registerUser: RequestHandler<unknown, unknown, RegisterRequest, unknown> = async (req, res, next) => {
    try {
        const {username, email, password, code} = req.body
        const user = await dataSource.registerUser(username, email, password, code)
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
