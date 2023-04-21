import express from "express";
import * as controller from "../controllers/UserController";
import passport from "passport";
import validateRequest from "../middlewares/validateRequest";
import {registerSchema} from "../validation/UserValidation";

const router = express.Router()

router.get('/me', controller.getAuthenticatedUser)
router.post('/register', validateRequest(registerSchema), controller.registerUser)
router.post('/login', passport.authenticate('local'), controller.loginUser)
router.post('/logout', controller.logoutUser)

export default router