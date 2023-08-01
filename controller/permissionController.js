import asyncHandler from "express-async-handler";
import PermissionSchema from "../models/Permission.js";
import createSlug from "../utility/createSlug.js";

/**
 *  @desc get all Permission
 * @route get/Permission
 * @access public
 */

export const getAllPermission = asyncHandler(async (req, res) => {
	const Permission = await PermissionSchema.find();
	if (!Permission.length)
		return res.status(404).json({
			message: "No Permission found",
		});
	res.json(Permission);
});

/**
 *  @desc create a new permission
 * @route post/permission
 * @access public
 */

export const createPermission = asyncHandler(async (req, res) => {
	const { name } = req.body;
	// validate fields
	if (!name)
		return res.status(404).json({
			message: "empty fields",
		});

	// check if existing permission

	const existPermission = await PermissionSchema.findOne({ name });

	if (existPermission)
		return res.status(404).json({
			message: "permission already exists",
		});

	// create new user
	const permission = await PermissionSchema.create({
		name: name,
		slug: createSlug(name),
	});
	if (permission) {
		return res.status(200).json({
			message: "Permission created successfully",
			permission: permission,
		});
	} else {
		return res.status(404).json({
			message: "Permission creation failed",
		});
	}
});

/**
 *  @desc get single permission
 * @route get/permission
 * @access public
 */

export const getSinglePermission = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const permission = await PermissionSchema.findById(id);

	if (!permission)
		return res.status(404).json({ message: "permission not found" });
	return res.status(200).json(permission);
});

/**
 *  @desc Delete single permission
 * @route Delete/permission
 * @access public
 */

export const deleteSinglePermission = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const permission = await PermissionSchema.findByIdAndDelete(id);
	if (!permission)
		return res.status(404).json({ message: "permission not found" });
	res.status(200).json({ permission, message: "Permission deleted" });
});

/**
 *  @desc Edited single permission
 * @route patch/permission
 * @access public
 */

export const UpdatePermission = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	if (!name) return res.status(404).json({ message: "Field is reqquired !" });

	const permission = await PermissionSchema.findById(id);
	if (!permission)
		return res.status(404).json({ message: "permission not found" });
	permission.name = name;

	const updatePermission = await PermissionSchema.findByIdAndUpdate(id, {
		name,
		slug: createSlug(name),
	});
	if (!updatePermission)
		return res.status(404).json({ message: "Not updated" });
	return res.status(200).json({ message: "Updated the permission" });
});

/**
 *  @desc permisson status update
 * @route patch/permission
 * @access public
 */

export const UpdateStatusPermission = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const { status } = req.body;
	const updatePermission = await PermissionSchema.findByIdAndUpdate(id, {
		status: !status,
	});

	return res
		.status(200)
		.json({ permission: updatePermission, message: "Updated the permission" });
});
