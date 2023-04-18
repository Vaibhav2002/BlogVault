import express from "express";
import * as controller from "../controllers/UserController";
import passport from "passport";

const router = express.Router()

router.post('/register', controller.registerUser)
router.post('/login', passport.authenticate('local'), (req, res) => res.status(200).json(req.user))

export default router