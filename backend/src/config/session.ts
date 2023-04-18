import {SessionOptions} from "express-session";
import env from "../utils/CleanEnv";
import MongoStore from "connect-mongo";

const sessionOptions: SessionOptions = {
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    },
    rolling: true,
    store: MongoStore.create({mongoUrl: env.MONGO_CONNECTION_STRING})
}

export default sessionOptions