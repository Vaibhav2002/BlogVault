import "dotenv/config"
import express from 'express';
import {errorMiddleware, notFoundMiddleware} from "./middlewares/ErrorMiddlewares";
import blogRoutes from "./routes/BlogRoutes";
import topicRoutes from "./routes/TopicRoutes";
import userRoutes from "./routes/UserRoutes";
import cors from "cors";
import env from "./utils/CleanEnv";

const app = express()

app.use(cors({
    origin: env.WEBSITE_URL
}))

app.use(express.json())

app.use("/uploads", express.static("uploads"))

app.use('/users', userRoutes)
app.use("/blogs", blogRoutes)
app.use("/topics", topicRoutes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app