import {isExistingEmail} from "./UserDataSource";
import createHttpError from "http-errors";
import * as crypto from "crypto";
import emailVerificationCode from "../models/entities/EmailVerificationCode";
import * as eMailer from "../utils/EMailer";

export const sendVerificationCode = async (email: string) => {
    if(await isExistingEmail(email))
        throw createHttpError(409, "An account with this email already exists. Please login instead")

    const verificationCode = crypto.randomInt(100000, 999999)

    await emailVerificationCode.create({
        email:email,
        code:verificationCode
    })

    await eMailer.sendVerificationCode(email, verificationCode)
}

export const verifyCode = async (email:string, code:number) => {
    const verificationCode = await emailVerificationCode.findOne({email:email, code:code}).exec()
    if(!verificationCode)
        throw createHttpError(404, "Invalid verification code")
    await verificationCode.deleteOne()
}