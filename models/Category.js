import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
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
		cat_icon: {
			type: String,
			default: null,
		},
		cat_photo: {
			type: String,
			default: null,
		},
		parentCat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			default: null,
		},
		subCat: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Category",
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
export default mongoose.model("Category", categorySchema);
