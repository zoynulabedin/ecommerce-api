import mongoose from "mongoose";
const PermissionSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		slug: {
			type: String,
			required: true,
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
export default mongoose.model("Permission", PermissionSchema);
