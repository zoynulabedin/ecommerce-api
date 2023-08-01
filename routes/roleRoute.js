import express from "express";
import {
	UpdateRole,
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

export default RoleRoute;
