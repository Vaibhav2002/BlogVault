import {cleanEnv, num, port, str} from "envalid";

const env = cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MONGO_CONNECTION_STRING: str(),
    WEBSITE_URL: str(),
    SERVER_URL: str(),
    PWD_SALTING_ROUNDS: num(),
    SESSION_SECRET: str(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    GITHUB_CLIENT_ID: str(),
    GITHUB_CLIENT_SECRET: str(),
    SMTP_HOST: str(),
    SMTP_PORT: num(),
    SMTP_EMAIL: str(),
    SMTP_PWD: str()
})

export default env