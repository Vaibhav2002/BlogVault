import "dotenv/config"
import express from 'express';
import {errorMiddleware, notFoundMiddleware} from "./middlewares/ErrorMiddlewares";
import blogRoutes from "./routes/BlogRoutes";
import TagRoutes from "./routes/TagRoutes";
import cors from "cors";
import env from "./utils/CleanEnv";

const app = express()

app.use(cors({
    origin: env.WEBSITE_URL
}))

app.use(express.json())

app.use("/blogs", blogRoutes)
app.use("/tags", TagRoutes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app