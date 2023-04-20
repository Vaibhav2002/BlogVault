import express from "express";
import * as controller from "../controllers/UserController";
import passport from "passport";

const router = express.Router()

router.get('/me', controller.getAuthenticatedUser)
router.post('/register', controller.registerUser)
router.post('/login', passport.authenticate('local'), controller.loginUser)
router.post('/logout', controller.logoutUser)

export default router