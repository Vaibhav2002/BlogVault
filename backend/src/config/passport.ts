import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {getUserByUsername} from "../dataSources/UserDataSource";
import bcrypt from "bcrypt";
import {assertIsDefined} from "../utils/Helpers";
import * as mongoose from "mongoose";

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id: string, done) => {
    done(null, {_id: new mongoose.Types.ObjectId(id)})
})

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const existingUser = await getUserByUsername(username, "+email +password")
        if (!existingUser) return done(null, false, {message: "User does not exist"})

        assertIsDefined(existingUser.password, "password")

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return done(null, false, {message: "Password is incorrect"})

        const user = existingUser.toObject()
        delete user.password

        done(null, user)
    } catch (e) {
        done(e)
    }
}));