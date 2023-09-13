import mongoose from "mongoose";
const TagsSchema = mongoose.Schema(
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
export default mongoose.model("Tags", TagsSchema);
