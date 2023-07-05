import jwt from "jsonwebtoken";

/**
 * create token
 */

export const CreateToken = (email, expires) => {
	return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET_KEY, {
		expiresIn: expires,
	});
};
