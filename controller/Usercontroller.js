import asyncHandler from "express-async-handler";
import User from "../models/UserSchema.js";
import { makeHash } from "../utility/hash.js";
import { sendMail } from "../utility/mail.js";

/**
 *  @desc get all users
 * @route get/users
 * @access public
 */

export const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password").lean().populate('role');
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
	const { name, email, password, role } = req.body;
	console.log(req.body);
	// validate fields
	if (!name || !email || !password )
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
		role: role,
	});

	// email send for account info
	sendMail({
		to: email,
		sub: "Account info",
		msg: `Hello ${name} sir, your email is ${email} and your password is ${password}`,
	});
	if (!user)
		return res.status(404).json({
			message: "User creation failed",
		});

	return res.status(200).json({
		message: "User created successfully",
		user: user,
	});
});

/**
 *  @desc get single user
 * @route get/user
 * @access public
 */

export const getSingleUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id).select("-password").lean().populate('role');

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
	res.status(200).json({ user: user, message: "User deleted" });
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

	const user = await User.findById(id).populate("role");
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

/**
 *  @desc user status update
 * @route patch/user
 * @access public
 */

export const UpdateStatusUser = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const { status } = req.body;
	const updateUserStatus = await User.findByIdAndUpdate(id, {
		status: !status,
	});

	return res
		.status(200)
		.json({ user: updateUserStatus, message: "Updated the User" });
});


/*
 update user role
*/


export const UpdateUserRole = asyncHandler(async (req, res) => {
	
	const { id } = req.params;
	const {name, role } = req.body;
	console.log(req.body);
	if(!name || !role) return res.status(404).json({message: "All fields are required !"});

	const updateRole = await User.findByIdAndUpdate(
		id,
		{
			name,
			role,
		},
		{ new: true }
	).populate("role");
	return res.status(200).json({message: "Updated the user role",user: updateRole});
});