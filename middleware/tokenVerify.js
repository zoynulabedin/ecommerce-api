export const tokenVerify = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader) {
		return res.status(400).json({
			message: "unauthorized access",
		});
	}
};
