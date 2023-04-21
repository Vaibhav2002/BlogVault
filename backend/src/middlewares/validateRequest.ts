import {Schema, ValidationError} from "yup";
import {RequestHandler} from "express";
import createHttpError from "http-errors";

const validate = (schema: Schema): RequestHandler =>
    async (req, res, next) => {
        try {
            await schema.validate(req)
            next()
        } catch (e) {
            if(e instanceof ValidationError) next(createHttpError(400, e.message))
            else next(e)
        }
    }

export default validate