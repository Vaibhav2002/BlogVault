import {RequestHandler} from "express";
import * as dataSource from "../dataSources/UserDataSource";
import RegisterRequest from "../models/requests/RegisterRequest";

export const registerUser: RequestHandler<unknown, unknown, RegisterRequest, unknown> = async (req, res, next) => {
    try {
        const user = await dataSource.registerUser(req.body)
        res.status(201).send(user)
    } catch (error) {
        next(error)
    }
}