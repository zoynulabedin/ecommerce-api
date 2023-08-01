import express from "express";
import {
    UpdatePermission,
	UpdateStatusPermission,
	createPermission,
	deleteSinglePermission,
	getAllPermission,
    getSinglePermission,
} from "../controller/permissionController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
const permissionRoute = express.Router();

permissionRoute.route("/").get(tokenVerify, getAllPermission).post(createPermission);
permissionRoute
	.route("/:id")
	.get(getSinglePermission)
	.delete(deleteSinglePermission)
	.put(UpdatePermission);

permissionRoute.route("/status/:id").patch(UpdateStatusPermission);

export default permissionRoute;
