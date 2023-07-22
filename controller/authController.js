import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/UserSchema.js";
import { CreateToken, RefreshToken } from "../utility/jwt.js";
/**
 * user login method
 * @POST /Login
 * @access public
 */

export const UserLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		return res.status(400).json({ message: "Invalid email or password" });

	// check user
	const checkUser = await User.findOne({ email: email });
	if (!checkUser) return res.status(404).json({ message: "User not found" }); //

	// password match
	const passwordMatch = await bcrypt.compare(password, checkUser.password);
	if (!passwordMatch)
		return res.status(404).json({ message: "Password dose not match" }); //

	// access token
	const accessToken = CreateToken(
		checkUser.email,
		process.env.ACCESS_TOKEN_EXPIRY
	);
	const refreashToken = RefreshToken(
		checkUser.email,
		process.env.REFRESH_TOKEN_EXPIRY
	);

	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		secure: process.env.APP_ENV === "development" ? false : true,
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	res.status(200).json({
		token: accessToken,
		user: checkUser,
		message: "Login successful",
	});
});

/**
 * me controller
 * @POST /me
 * @access Private
 */

export const me = (req, res) => {
	if (!req.me) {
		return res.status(404).json({
			message: "You do not have permission",
		});
	}
	res.status(200).json(req.me);
};

/**
 * loggout controller
 * @get /me
 * @access Private
 */

export const userLoggout = asyncHandler(async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.accessToken)
		return res.status(400).json({
			message: "Already loggout",
		});
	res
		.clearCookie("accessToken", {
			httpOnly: false,
			secure: false,
		})
		.json({
			message: "logout successfully",
		});
});
