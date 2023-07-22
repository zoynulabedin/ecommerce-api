import express from "express";
import { UserLogin, me, userLoggout } from "../controller/authController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const authRouter = express.Router();

authRouter.route("/login").post(UserLogin);
authRouter.route("/me").get(tokenVerify, me);
authRouter.route("/loggout").post(userLoggout);

export default authRouter;
