import users from './../models/entities/User';
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import env from "../utils/CleanEnv";
import RegisterRequest from "../models/requests/RegisterRequest";

export const registerUser = async ({username, email, password:passwordRaw}: RegisterRequest) => {
    const existingUser = await users.findOne({username: username})
        .collation({locale: "en", strength: 2})
        .exec()

    if(existingUser) throw createHttpError("Username already taken")

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