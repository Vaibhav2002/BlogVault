import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import {VerifyCallback} from "passport-oauth2";
import {Profile, Strategy as GithubStrategy} from "passport-github2";
import * as userDataSource from "../dataSources/UserDataSource";
import bcrypt from "bcrypt";
import {assertIsDefined} from "../utils/Helpers";
import * as mongoose from "mongoose";
import env from "../utils/CleanEnv";
import {githubRedirectUrl, googleRedirectUrl} from "../utils/Constants";

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id: string, done) => {
    done(null, {_id: new mongoose.Types.ObjectId(id)})
})

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const existingUser = await userDataSource.getUserByUsername(username, "+email +password")
        if (!existingUser)
            return done(null, false, {message: "User does not exist"})

        assertIsDefined(existingUser.password, "password")

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect)
            return done(null, false, {message: "Password is incorrect"})

        const user = existingUser.toObject()
        delete user.password

        done(null, user)
    } catch (e) {
        done(e)
    }
}));

passport.use(new GoogleStrategy({
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.SERVER_URL + googleRedirectUrl,
    scope: ["profile"]
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        let user = await userDataSource.getUserByGoogleId(profile.id)
        if(!user) user = await userDataSource.registerGoogleUser(profile)
        cb(null, user)
    } catch(e){
        if(e instanceof Error)
            cb(e)
        else throw e
    }
}))

passport.use(new GithubStrategy({
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    callbackURL: env.SERVER_URL + githubRedirectUrl,
}, async (accessToken:string, refreshToken:string, profile:Profile, cb:VerifyCallback) => {
    try{
        let user = await userDataSource.getUserByGithubId(profile.id)
        if(!user) user = await userDataSource.registerGithubUser(profile)
        cb(null, user)
    } catch(e){
        if(e instanceof Error)
            cb(e)
        else throw e
    }
}))
