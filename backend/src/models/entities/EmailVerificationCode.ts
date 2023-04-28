import {model, Schema} from "mongoose";
import {InferSchemaType} from "mongoose";

const emailVerificationCodeSchema = new Schema({
    email: { type: String, required: true },
    code: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: "10m" }
})

type EmailVerificationCode = InferSchemaType<typeof emailVerificationCodeSchema>

export default model<EmailVerificationCode>("EmailVerificationCode", emailVerificationCodeSchema)