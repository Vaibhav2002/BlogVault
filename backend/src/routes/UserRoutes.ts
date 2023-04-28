import express from "express";
import * as controller from "../controllers/UserController";
import validateRequest from "../middlewares/validateRequest";
import {getProfileSchema, updateProfileSchema} from "../validation/UserValidation";
import requiresAuth from "../middlewares/AuthMiddleware";
import {profilePic} from "../middlewares/FileMiddleware";

const router = express.Router()

router.get('/me', requiresAuth, controller.getAuthenticatedUser)
router.get('/profile/:username', validateRequest(getProfileSchema), controller.getUserProfile)

router.patch(
    '/me',
    requiresAuth,
    profilePic.single("profilePic"),
    validateRequest(updateProfileSchema),
    controller.updateProfile
)

export default router