import asyncHandler from "express-async-handler";
import ProductSchema from "../models/Product.js";
import createSlug from "../utility/createSlug.js";
import { findPublicId } from "../utility/helpers.js";
import { cloudDelete, cloudinaryUpload } from "../utility/cloudinary.js";



/**
 *  @desc get all Product
 * @route get/Product
 * @access public
 */

export const getAllProduct = asyncHandler(async (req, res) => {
	const Product = await ProductSchema.find();
	return res.status(200).json(Product);
});

/**
 *  @desc create a new Product
 * @route post/Product
 * @access public
 */

export const createProduct = asyncHandler(async (req, res) => {
	const { name,productType,ProductSimple,shortDeescription,longDescription } = req.body;
	
	// validate fields
	if (!name)
		return res.status(404).json({
			message: "empty fields",
		});

	const existProduct = await ProductSchema.findOne({ name });

	if (existProduct)
		return res.status(404).json({
			message: "Product already exists",
		});
		
		// const logos = await cloudinaryUpload(req.file.path);
		
	 // file manage
	 const ProductPhoto = [];
	  if(req.files){
		for(let i = 0; i < req.files.length; i++){
			const logos = await cloudinaryUpload(req.files[i].path);
			ProductPhoto.push(logos.secure_url);
		}
		console.log(ProductPhoto);
	  }

	// create new user
	const Product = await ProductSchema.create({
		name: name,
		slug: createSlug(name),
        productType:productType,
        ProductSimple:productType === "simple" ? {...ProductSimple,ProductPhoto} : null,
        ProductVariable:productType === "variable" ? ProductVariable : null,
        ProductGrouped:productType === "group" ? ProductGrouped : null,
        ProductExternal: productType === "external" ? ProductExternal : null,

        shortDeescription:shortDeescription,
        longDescription:longDescription,
		// logo:logos.secure_url,
		
	});
	if (Product) {
		return res.status(200).json({
			Product: Product,
			message: "Product created successfully",
		});
	} else {
		return res.status(404).json({
			message: "Product creation failed",
		});
	}
});

/**
 *  @desc get single Product
 * @route get/Product
 * @access public
 */

export const getSingleProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const Product = await ProductSchema.findById(id);

	if (!Product) return res.status(404).json({ message: "Product not found" });
	return res.status(200).json(Product);
});

/**
 *  @desc Delete single Product
 * @route Delete/Product
 * @access public
 */

export const deleteSingleProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const Product = await ProductSchema.findByIdAndDelete(id);
	if(!Product){
		return res.status(404).json({ message: "Product not found" });
	}

	if(Product.logo){
		const imagePublicID = findPublicId(Product.logo);
		 await cloudDelete(imagePublicID);
	}
	return res.status(200).json({ message: "Product deleted successfully" });

});

/**
 *  @desc Update Product
 * @route Update/Product
 * @access public
 */

export const UpdateProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name,slug } = req.body;
	if (!name) return res.status(404).json({ message: "Field is reqquired !" });

	const Product = await ProductSchema.findById(id);


	if (!Product) return res.status(404).json({ message: "Product  not found" });

	let updateLogo = Product.logo

	if(req.file){
		const logo = await cloudinaryUpload(req.file.path);
		updateLogo = logo.secure_url;
	}
	Product.name = name;
	Product.slug = createSlug(name);
	Product.logo = updateLogo;
	Product.save();
	return res
		.status(200)
		.json({ Products: updateLogo, message: "Product updated successfully" });
});
