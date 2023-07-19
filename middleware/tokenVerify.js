import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

export const tokenVerify = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader) {
		return res.status(400).json({
			message: "unauthorized access",
		});
	}

	const token = authHeader.split(" ")[1];
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET_KEY,
		asyncHandler(async (error, decode) => {
			if (error) {
				return res.status(401).json({
					message: "Invalid token",
				});
			}
			const me = await User.findOne({
				email: decode.email,
			}).select("-password");
			req.me = me;
			next();
		})
	);
};
