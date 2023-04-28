import validateRequest from "../middlewares/validateRequest";
import {registerSchema, requestVerificationCodeSchema} from "../validation/UserValidation";
import * as controller from "../controllers/AuthController";
import passport from "passport";
import requiresAuth from "../middlewares/AuthMiddleware";
import setSessionReturnTo from "../middlewares/SetSessionReturnTo";
import env from "../utils/CleanEnv";
import express from "express";

const router = express.Router()

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

export default router