import mongoose from "mongoose";
const brandSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		slug: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		logo: {
			type: String,
			default: "default.png",
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
export default mongoose.model("Brand", brandSchema);
