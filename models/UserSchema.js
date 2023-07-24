import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},

		birtdate: {
			type: String,
			default: null,
		},
		address: {
			type: String,
			default: null,
		},
		city: {
			type: String,
			default: null,
		},
		state: {
			type: String,
			default: null,
		},
		zipcode: {
			type: String,
			default: null,
		},
		country: {
			type: String,
			default: null,
		},
		email: {
			type: String,
			trim: true,
			required: true,
		},
		mobile: {
			type: String,
			trim: true,
			default: null,
		},
		password: {
			type: String,
			trim: true,
			required: true,
		},
		role: {
			type: String,
			default: "admin",
		},
		gender: {
			type: String,
			enum: ["male", "female"],
		},
		photo: {
			type: String,
			default: null,
		},
		status: {
			type: Boolean,
			default: true,
		},
		trash: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);
export default mongoose.model("User", UserSchema);
