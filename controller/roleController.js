import asyncHandler from "express-async-handler";
import RoleSchema from "../models/Roles.js";
import createSlug from "../utility/createSlug.js";

/**
 *  @desc get all Role
 * @route get/Role
 * @access public
 */

export const getAllRole = asyncHandler(async (req, res) => {
	const Role = await RoleSchema.find();
	if (!Role.length)
		return res.status(404).json({
			message: "No Role found",
		});
	res.json(Role);
});

/**
 *  @desc create a new Role
 * @route post/Role
 * @access public
 */

export const createRole = asyncHandler(async (req, res) => {
	const { name } = req.body;
	// validate fields
	if (!name)
		return res.status(404).json({
			message: "empty fields",
		});


	// create new user
	const Role = await RoleSchema.create({
		name: name,
		slug: createSlug(name),
	});
	if (Role) {
		return res.status(200).json({
			message: "Role created successfully",
		});
	} else {
		return res.status(404).json({
			message: "Role creation failed",
		});
	}
});

/**
 *  @desc get single Role
 * @route get/Role
 * @access public
 */

export const getSingleRole = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const Role = await RoleSchema.findById(id);

	if (!Role) return res.status(404).json({ message: "Role not found" });
	return res.status(200).json(Role);
});

/**
 *  @desc Delete single Role
 * @route Delete/Role
 * @access public
 */

export const deleteSingleRole = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const Role = await RoleSchema.findByIdAndDelete(id);
	if (!Role)
		return res.status(404).json({ message: "Role not found" });
	res.status(200).json({ message: "Role deleted" });
});

/**
 *  @desc Edited single Role
 * @route patch/Role
 * @access public
 */

export const UpdateRole = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	if (!name) return res.status(404).json({ message: "Field is reqquired !" });

	const Role = await RoleSchema.findById(id);
	if (!Role)
		return res.status(404).json({ message: "Role not found" });
	Role.name = name;

	const updateRole = await RoleSchema.findByIdAndUpdate(id, {
		name,
		slug: createSlug(name),
	});
	if (!updateRole)
		return res.status(404).json({ message: "Not updated" });
	return res.status(200).json({ message: "Updated the Role" });
});
