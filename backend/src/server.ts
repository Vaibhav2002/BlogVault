import app from "./app";
import cleanEnv from "./utils/CleanEnv"
import * as mongoose from "mongoose";

const port = cleanEnv.PORT
const mongoConnectionString = cleanEnv.MONGO_CONNECTION_STRING

mongoose.connect(mongoConnectionString)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(port, () => console.log(`Server running on port ${port}`))
    })
    .catch(console.error)