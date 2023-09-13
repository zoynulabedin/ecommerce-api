import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: "djqogqun6",
	api_key: "115497648127335",
	api_secret: "kMNUIK7J6QZBK2TyDVudI2rt7Fo",
});

export const cloudinaryUpload = async (path) => {
	try {
		const result = await cloudinary.uploader.upload(path, {
			folder: "ecommerce",
		});
		return result;
	} catch (error) {
		console.error("Error uploading to Cloudinary:", error.message);
		throw error; // Re-throw the error to propagate it to the caller
	}
};

//  delete image from cloudinary
export const cloudinaryDelete = async (imagePublicID) => {	
	const result = await cloudinary.uploader.destroy(imagePublicID);
	console.log(result);
}