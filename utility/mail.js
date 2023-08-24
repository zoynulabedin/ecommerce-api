import nodemailer from "nodemailer";

export const sendMail = async ({ to, sub, msg }) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			// TODO: replace `user` and `pass` values from <https://forwardemail.net>
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	await transporter.sendMail({
		from: " <trustcodernet@gmail.com>", // sender address
		to: to,
		subject: sub, // Subject line
		html: msg,
	});
};

