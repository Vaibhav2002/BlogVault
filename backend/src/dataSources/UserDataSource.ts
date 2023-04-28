import users from './../models/entities/User';
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import env from "../utils/CleanEnv";
import * as mongoose from "mongoose";
import {saveProfilePic} from "./ImageDataSource";
import {Profile as GoogleProfile} from "passport-google-oauth20";
import {Profile as GithubProfile} from "passport-github2";
import {appendLastUpdated} from "../utils/Helpers";
import * as verificationDataSource from "./VerificationDataSource";


export const registerUser = async (username: string, email: string, passwordRaw: string, code:number) => {

    if (await isExistingUsername(username))
        throw createHttpError(409, "Username already taken")

    await verificationDataSource.verifyCode(email, code)

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
            .then(path => appendLastUpdated(path))

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

export const registerGoogleUser = async (profile:GoogleProfile) => {
    return await users.create({
        googleId: profile.id,
        displayName: profile.displayName,
        profilePicUrl: profile.photos?.[0].value.replace("s96-c", "s512-c")
    })
}

export const registerGithubUser = async (profile:GithubProfile) => {
    return await users.create({
        githubId: profile.id,
        displayName: profile.displayName,
        profilePicUrl: profile.photos?.[0].value
    })
}

const isExistingUsername = async (username: string) =>{
    const existingUser = await users.findOne({username: username})
        .collation({locale: "en", strength: 2})
        .exec()

    return !!existingUser
}

export const isExistingEmail = async (email: string) => {
    const existingUser = await users.findOne({email: email})
        .collation({locale: "en", strength: 2})
        .exec()

    return !!existingUser
}

export const getUserByUsername = async (username: string, select: string = "") => {
    return await users.findOne({username: username}).select(select).exec()
}

export const getUserByGoogleId = async (googleId:string, select: string = "") => {
    return await users.findOne({googleId: googleId}).select(select).exec()
}

export const getUserByGithubId = async (githubId:string, select: string = "") => {
    return await users.findOne({githubId: githubId}).select(select).exec()
}

export const getUserById = async (id: mongoose.Types.ObjectId, select: string = "") => {
    return await users.findById(id).select(select).exec()
}

export const getUserByEmail = async (email: string, select: string = "") => {
    return await users.findOne({email: email}).select(select).exec()
}