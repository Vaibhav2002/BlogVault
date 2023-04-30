import {SessionOptions} from "express-session";
import env from "../utils/CleanEnv";
import MongoStore from "connect-mongo";
import * as crypto from "crypto";

const sessionOptions: SessionOptions = {
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    },
    rolling: true,
    store: MongoStore.create({mongoUrl: env.MONGO_CONNECTION_STRING}),
    genid(req): string {
        const userId = req.user?._id
        const randomId = crypto.randomUUID()
        if(userId) return `${userId}-${randomId}`
        else return randomId
    }
}

export default sessionOptions