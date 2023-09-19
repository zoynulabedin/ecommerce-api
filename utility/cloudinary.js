import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: "djqogqun6",
	api_key: "115497648127335",
	api_secret: "kMNUIK7J6QZBK2TyDVudI2rt7Fo",
});

const cloudinaryUpload = async (path) => {
	try {
		const result = await cloudinary.uploader.upload(path);
		return result;
	} catch (error) {
		console.error("Error uploading to Cloudinary:", error.message);
		throw error; // Re-throw the error to propagate it to the caller
	}
};

//  delete image from cloudinary
const cloudDelete = async (publicID) => {
	try {
		const result = await cloudinary.uploader.destroy(publicID);
		return result;
	} catch (error) {
		console.error("Error uploading to Cloudinary:", error.message);
		throw error; // Re-throw the error to propagate it to the caller
	}
}

export {cloudinaryUpload, cloudDelete}