import {isExistingEmail} from "./UserDataSource";
import createHttpError from "http-errors";
import * as crypto from "crypto";
import emailVerificationCode from "../models/entities/EmailVerificationCode";
import passwordResetCode from "../models/entities/PasswordResetCode";
import * as eMailer from "../utils/EMailer";

const createVerificationCode = () => crypto.randomInt(100000, 999999)

export const sendVerificationCode = async (email: string) => {
    if (await isExistingEmail(email))
        throw createHttpError(409, "An account with this email already exists. Please login instead")

    const verificationCode = createVerificationCode()

    await emailVerificationCode.create({
        email: email,
        code: verificationCode
    })

    await eMailer.sendVerificationCode(email, verificationCode)
}

export const verifyCode = async (email: string, code: number) => {
    const verificationCode = await emailVerificationCode.findOne({email: email, code: code}).exec()
    if (!verificationCode)
        throw createHttpError(404, "Invalid verification code")
    await verificationCode.deleteOne()
}

export const sendPasswordResetVerificationCode = async (email: string) => {
    if (!(await isExistingEmail(email)))
        throw createHttpError(401, "No account with this email exists")

    const verificationCode = createVerificationCode()

    await passwordResetCode.create({
        email: email,
        code: verificationCode
    })

    await eMailer.sendPasswordResetCode(email, verificationCode)
}

export const verifyPasswordResetCode = async (email: string, code: number) => {
    const verificationCode = await passwordResetCode.findOne({email: email, code: code}).exec()
    if (!verificationCode)
        throw createHttpError(404, "Invalid verification code")
    await verificationCode.deleteOne()
}