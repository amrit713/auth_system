import express, { Request, Response, NextFunction } from "express";
import { login, signup } from "../controllers/authController";

const router = express.Router();

//handle routes
router.route("/signup").post(signup);
router.route("/login").post(login);

export default router;
