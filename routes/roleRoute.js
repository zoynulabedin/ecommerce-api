import express from "express";
import {
	UpdateRole,
	UpdateStatusRoleController,
	createRole,
	deleteSingleRole,
	getAllRole,
	getSingleRole,
} from "../controller/roleController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
const RoleRoute = express.Router();

RoleRoute.route("/").get(tokenVerify, getAllRole).post(createRole);
RoleRoute.route("/:id")
	.get(getSingleRole)
	.delete(deleteSingleRole)
	.put(UpdateRole);

RoleRoute.route("/status/:id").patch(UpdateStatusRoleController);

export default RoleRoute;
