import users from './../models/entities/User';
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import env from "../utils/CleanEnv";
import * as mongoose from "mongoose";
import {saveProfilePic} from "./ImageDataSource";


export const registerUser = async (username: string, email: string, passwordRaw: string) => {

    if (await isExistingUsername(username))
        throw createHttpError(409, "Username already taken")

    const existingUserByEmail = await getUserByEmail(email)
    if (existingUserByEmail) throw createHttpError(409, "Email already taken")

    const hashedPassword = await bcrypt.hash(passwordRaw, env.PWD_SALTING_ROUNDS)

    const result = await users.create({
        username: username,
        email: email,
        password: hashedPassword
    })
    const user = result.toObject()
    delete user.password

    return user
}

export const updateProfile = async (
    userId: mongoose.Types.ObjectId,
    username: string | undefined,
    displayName: string | undefined,
    about: string | undefined,
    profilePic: Express.Multer.File | undefined
) => {
    if (username && await isExistingUsername(username))
        throw createHttpError(409, "Username already taken")

    let profilePicUrl:string | undefined = undefined
    if(profilePic)
        profilePicUrl = await saveProfilePic(profilePic, userId.toString())
            .then(path => path.replace(".png", `?lastUpdatedAt=${Date.now()}.png`))

    const user = await users.findByIdAndUpdate(userId, {
        $set:{
            ...(username && {username}),
            ...(displayName && {displayName}),
            ...(about && {about}),
            ...(profilePicUrl && {profilePicUrl})
        }
    }, {new: true}).exec()

    return user
}

const isExistingUsername = async (username: string) =>{
    const existingUser = await users.findOne({username: username})
        .collation({locale: "en", strength: 2})
        .exec()

    return !!existingUser
}

export const getUserByUsername = async (username: string, select: string = "") => {
    return await users.findOne({username: username}).select(select).exec()
}

export const getUserById = async (id: mongoose.Types.ObjectId, select: string = "") => {
    return await users.findById(id).select(select).exec()
}

export const getUserByEmail = async (email: string, select: string = "") => {
    return await users.findOne({email: email}).select(select).exec()
}