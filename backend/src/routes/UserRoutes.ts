import express from "express";
import * as controller from "../controllers/UserController";
import passport from "passport";
import validateRequest from "../middlewares/validateRequest";
import {getProfileSchema, registerSchema, updateProfileSchema} from "../validation/UserValidation";
import requiresAuth from "../middlewares/AuthMiddleware";
import {profilePic} from "../middlewares/FileMiddleware";

const router = express.Router()

router.get('/me', requiresAuth, controller.getAuthenticatedUser)
router.get('/profile/:username', validateRequest(getProfileSchema), controller.getUserProfile)
router.post('/register', validateRequest(registerSchema), controller.registerUser)
router.post('/login', passport.authenticate('local'), controller.loginUser)
router.post('/logout', requiresAuth, controller.logoutUser)

router.patch(
    '/me',
    requiresAuth,
    profilePic.single("profilePic"),
    validateRequest(updateProfileSchema),
    controller.updateProfile
)

export default router