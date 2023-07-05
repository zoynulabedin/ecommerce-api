import asyncHandler from "express-async-handler";
import User from "../models/UserSchema.js";
import { makeHash } from "../utility/hash.js";

/**
 *  @desc get all users
 * @route get/users
 * @access public
 */

export const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password").lean();
	if (!users.length)
		return res.status(404).json({
			message: "No users found",
		});
	res.json(users);
});

/**
 *  @desc create a new user
 * @route post/users
 * @access public
 */

export const createUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	// validate fields
	if (!name || !email || !password)
		return res.status(404).json({
			message: "All Fields are required !",
		});
	// email check
	const checkEmail = await User.findOne({ email: email });
	if (checkEmail)
		return res.status(404).json({
			message: "Email already exists !",
		});

	// create new user
	const user = await User.create({
		name: name,
		email: email,
		password: makeHash(password),
	});
	if (user) {
		return res.status(200).json({
			message: "User created successfully",
		});
	} else {
		return res.status(404).json({
			message: "User creation failed",
		});
	}
});

/**
 *  @desc get single user
 * @route get/user
 * @access public
 */

export const getSingleUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id).select("-password").lean();

	if (!user) return res.status(404).json({ message: "User not found" });
	return res.status(200).json(user);
});

/**
 *  @desc Delete single user
 * @route Delete/user
 * @access public
 */

export const deleteSingleUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const user = await User.findByIdAndDelete(id);
	if (!user) return res.status(404).json({ message: "User not found" });
	res.status(200).json({ message: "User deleted" });
});

/**
 *  @desc Edited single user
 * @route patch/user
 * @access public
 */

export const UpdateUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name, email, password } = req.body;
	if (!name || !email || !password)
		return res.status(404).json({ message: "All Fields are reqquired !" });

	const user = await User.findById(id);
	if (!user) return res.status(404).json({ message: "User not found" });
	user.name = name;
	user.email = email;
	user.password = password;
	const updateUser = await User.findByIdAndUpdate(id, {
		name,
		email,
		password: makeHash(password),
	});
	if (!updateUser) return res.status(404).json({ message: "Not updated" });
	return res.status(200).json({ message: "Updated the user" });
});
