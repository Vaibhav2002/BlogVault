import express from "express";
import * as controller from "../controllers/UserController";
import passport from "passport";
import validateRequest from "../middlewares/validateRequest";
import {
    getProfileSchema,
    registerSchema,
    requestVerificationCodeSchema,
    updateProfileSchema
} from "../validation/UserValidation";
import requiresAuth from "../middlewares/AuthMiddleware";
import {profilePic} from "../middlewares/FileMiddleware";
import setSessionReturnTo from "../middlewares/SetSessionReturnTo";
import env from "../utils/CleanEnv";

const router = express.Router()

router.get('/me', requiresAuth, controller.getAuthenticatedUser)
router.get('/profile/:username', validateRequest(getProfileSchema), controller.getUserProfile)
router.post('/register', validateRequest(registerSchema), controller.registerUser)
router.post('/login', passport.authenticate('local'), controller.loginUser)
router.post('/logout', requiresAuth, controller.logoutUser)
router.post('/requestVerificationCode', validateRequest(requestVerificationCodeSchema), controller.requestVerificationCode)

router.get('/login/google', setSessionReturnTo, passport.authenticate('google'))
router.get('/oauth2/redirect/google', passport.authenticate('google',{
    successReturnToOrRedirect: env.WEBSITE_URL,
    keepSessionInfo: true
}))

router.get('/login/github', setSessionReturnTo, passport.authenticate('github'))
router.get('/oauth2/redirect/github', passport.authenticate('github',{
    successReturnToOrRedirect: env.WEBSITE_URL,
    keepSessionInfo: true
}))

router.patch(
    '/me',
    requiresAuth,
    profilePic.single("profilePic"),
    validateRequest(updateProfileSchema),
    controller.updateProfile
)

export default router