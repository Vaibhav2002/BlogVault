import {NextFunction, Request, RequestHandler, Response} from "express";
import createHttpError, {isHttpError} from "http-errors"

const notFoundMiddleware: RequestHandler = (req, res, next) => {
    next(createHttpError(404, "Not found"))
}

const errorMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
    let message: string = "Unknown error occurred"
    let statusCode: number = 500
    if (isHttpError(error)) {
        message = error.message
        statusCode = error.statusCode
    }
    res.status(statusCode).json({error: message})
}

export {notFoundMiddleware, errorMiddleware}