import asyncHandler from "express-async-handler";
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
	if(!passwordMatch) return res.status(404).json({ message: "Password dose not match" }); //

    // access token
	const accessToken =  jwt
});
