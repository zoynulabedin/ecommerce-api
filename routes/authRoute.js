import express from 'express';
import { UserLogin, me, userLoggout } from '../controller/authController.js';
import { tokenVerify } from '../middleware/tokenVerify.js';

const authRouter  =  express.Router();

authRouter.route("/login").post(UserLogin);
authRouter.route("/me").post(tokenVerify,me);
authRouter.route("/loggout").get(userLoggout);



export default authRouter;