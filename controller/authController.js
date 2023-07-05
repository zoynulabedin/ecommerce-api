import asyncHandler from "express-async-handler";
import { CreateToken } from "../utility/jwt";
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
	const accessToken = CreateToken(checkUser.email, 7);

	res.cookie("access_token", accessToken, {
		httpOnly: false,
		secure: false,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	res.status(200).json({
		token: accessToken,
		user: checkUser,
	});
});
