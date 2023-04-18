import * as mongoose from "mongoose";

declare global {
    namespace Express {
        interface User {
            _id: mongoose.Types.ObjectId;
        }
    }
}