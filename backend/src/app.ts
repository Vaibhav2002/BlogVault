import "dotenv/config"
import express from 'express';
import {errorMiddleware, notFoundMiddleware} from "./middlewares/ErrorMiddlewares";
import blogRoutes from "./routes/BlogRoutes";
import hashTagRoutes from "./routes/HashTagRoutes";

const app = express()

app.use(express.json())

app.use("/blogs", blogRoutes)
app.use("/hashtags", hashTagRoutes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app