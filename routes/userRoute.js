import express from "express";
import {
    UpdateUser,
	createUser,
	deleteSingleUser,
	getAllUsers,
	getSingleUser,
} from "../controller/Usercontroller.js";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter
	.route("/:id")
	.get(getSingleUser)
	.delete(deleteSingleUser)
	.patch(UpdateUser);

export default userRouter;
