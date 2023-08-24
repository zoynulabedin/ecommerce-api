import mongoose from "mongoose";
const Roleschema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		slug: {
			type: String,
			trim: true,
			required: true,
		},
		permissions: {
			type: Array,
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
export default mongoose.model("Role", Roleschema);
