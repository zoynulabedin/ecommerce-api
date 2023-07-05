import jwt from "jsonwebtoken";

/**
 * access token create token
 */

export const CreateToken = (email, expires) => {
	return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET_KEY, {
		expiresIn: expires,
	});
};


/**
 *  refreash token
 */

export const RefreshToken = (email, expires) => {
    return jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET_KEY,{
        expiresIn: expires
    });    
};