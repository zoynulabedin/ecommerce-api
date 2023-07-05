import express from 'express';
import { UserLogin } from '../controller/authController.js';

const authRouter  =  express.Router();

authRouter.route("/login").post(UserLogin);



export default authRouter;