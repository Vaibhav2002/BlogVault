import {cleanEnv, num, port, str} from "envalid";

const env = cleanEnv(process.env, {
    PORT: port(),
    MONGO_CONNECTION_STRING: str(),
    WEBSITE_URL: str(),
    SERVER_URL: str(),
    PWD_SALTING_ROUNDS: num(),
    SESSION_SECRET: str(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
})

export default env