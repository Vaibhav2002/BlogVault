import {InferSchemaType, model, Schema} from "mongoose";

const passwordResetCodeSchema = new Schema({
    email: { type: String, required: true },
    code: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: "10m" }
})

type PasswordResetCode = InferSchemaType<typeof passwordResetCodeSchema>

export default model<PasswordResetCode>("PasswordResetCode", passwordResetCodeSchema)