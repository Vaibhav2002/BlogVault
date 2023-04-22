import users from './../models/entities/User';
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import env from "../utils/CleanEnv";
import * as mongoose from "mongoose";

export const registerUser = async (username:string, email:string, passwordRaw:string) => {
    const existingUser = await users.findOne({username: username})
        .collation({locale: "en", strength: 2})
        .exec()

    if(existingUser) throw createHttpError(409, "Username already taken")

    const existingUserByEmail = await getUserByEmail(email)
    if(existingUserByEmail) throw createHttpError(409, "Email already taken")

    const hashedPassword = await bcrypt.hash(passwordRaw, env.PWD_SALTING_ROUNDS)

    const result = await users.create({
        username:username,
        email:email,
        password:hashedPassword
    })
    const user = result.toObject()
    delete user.password

    return user
}

export const getUserByUsername = async (username: string, select:string = "") => {
    return await users.findOne({username: username}).select(select).exec()
}

export const getUserById = async (id: mongoose.Types.ObjectId, select:string = "") => {
    return await users.findById(id).select(select).exec()
}

export const getUserByEmail = async (email: string, select:string = "") => {
    return await users.findOne({email: email}).select(select).exec()
}