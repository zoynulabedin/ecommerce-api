import asyncHandler from "express-async-handler";
import brandSchema from "../models/Brand.js";
import createSlug from "../utility/createSlug.js";
import { findPublicId } from "../utility/helpers.js";
import { cloudDelete, cloudinaryUpload } from "../utility/cloudinary.js";



/**
 *  @desc get all brand
 * @route get/Brand
 * @access public
 */

export const getAllBrand = asyncHandler(async (req, res) => {
	const Brand = await brandSchema.find();
	return res.status(200).json(Brand);
});

/**
 *  @desc create a new brand
 * @route post/brand
 * @access public
 */

export const createBrand = asyncHandler(async (req, res) => {
	const { name } = req.body;
	
	// validate fields
	if (!name)
		return res.status(404).json({
			message: "empty fields",
		});

	const existBrand = await brandSchema.findOne({ name });

	if (existBrand)
		return res.status(404).json({
			message: "Brand already exists",
		});
		
		const logos = await cloudinaryUpload(req.file.path);
		
	
	// create new user
	const Brand = await brandSchema.create({
		name: name,
		slug: createSlug(name),
		logo:logos.secure_url,
		
	});
	if (Brand) {
		return res.status(200).json({
			brand: Brand,
			message: "Brand created successfully",
		});
	} else {
		return res.status(404).json({
			message: "Brand creation failed",
		});
	}
});

/**
 *  @desc get single Brand
 * @route get/brand
 * @access public
 */

export const getSingleBrand = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const Brand = await brandSchema.findById(id);

	if (!Brand) return res.status(404).json({ message: "Brand not found" });
	return res.status(200).json(Brand);
});

/**
 *  @desc Delete single Brand
 * @route Delete/Brand
 * @access public
 */

export const deleteSingleBrand = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const Brand = await brandSchema.findByIdAndDelete(id);
	if(!Brand){
		return res.status(404).json({ message: "Brand not found" });
	}

	if(Brand.logo){
		const imagePublicID = findPublicId(Brand.logo);
		 await cloudDelete(imagePublicID);
	}
	return res.status(200).json({ message: "Brand deleted successfully" });

});

/**
 *  @desc Update brand
 * @route Update/Brand
 * @access public
 */

export const UpdateBrand = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name,slug } = req.body;
	if (!name) return res.status(404).json({ message: "Field is reqquired !" });

	const Brand = await brandSchema.findById(id);


	if (!Brand) return res.status(404).json({ message: "Brand  not found" });

	let updateLogo = Brand.logo

	if(req.file){
		const logo = await cloudinaryUpload(req.file.path);
		updateLogo = logo.secure_url;
	}
	Brand.name = name;
	Brand.slug = createSlug(name);
	Brand.logo = updateLogo;
	Brand.save();
	return res
		.status(200)
		.json({ Brands: updateLogo, message: "Brand updated successfully" });
});
