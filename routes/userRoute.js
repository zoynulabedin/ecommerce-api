import express from "express";
import {
	UpdateStatusUser,
	UpdateUser,
	UpdateUserRole,
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
userRouter.route("/status/:id").patch(UpdateStatusUser);
userRouter.route("/role/:id").put(UpdateUserRole);

export default userRouter;
