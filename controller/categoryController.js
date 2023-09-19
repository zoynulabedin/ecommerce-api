import asyncHandler from "express-async-handler";
import categorySchema from "../models/Category.js";
import createSlug from "../utility/createSlug.js";
import { cloudDelete, cloudinaryUpload } from "../utility/cloudinary.js";
import { findPublicId } from "../utility/helpers.js";

/**
 *  @desc get all brand
 * @route get/Brand
 * @access public
 */

export const getAllCategory = asyncHandler(async (req, res) => {
	const Category = await categorySchema
		.find()
		.populate({
			path: "parentCat",
			populate: {
				path: "parentCat",
				populate: {
					path: "parentCat",
				}
			},
		})
		.populate({
			path: "subCat",
			populate: {
				path: "subCat",
				populate: {
					path: "subCat",
				}
			}
		});
	return res.status(200).json(Category);
});

/**
 *  @desc create a new Category
 * @route post/Category
 * @access public
 */

export const createCategory = asyncHandler(async (req, res) => {
	const { name, parentCat,cat_icon } = req.body;
	// validate fields

	if (!name)
		return res.status(404).json({
			message: "empty fields",
		});

	const existCategory = await categorySchema.findOne({ name });

	if (existCategory)
		return res.status(404).json({
			message: "existCategory already exists",
		});

	let catIcon = null;
	if(cat_icon){
		catIcon = cat_icon;
	}
	const cat_photo = await cloudinaryUpload(req.file.path);
	// create new user
	const Category = await categorySchema.create({
		name: name,
		slug: createSlug(name),
		parentCat: parentCat ? parentCat : null,
		cat_icon: catIcon,
		cat_photo: cat_photo.secure_url,
	});
	if (parentCat) {
		const parent = await categorySchema.findByIdAndUpdate(parentCat, {
			$push: { subCat: Category._id },
		});
	}
	if (Category) {
		return res.status(200).json({
			Category: Category,
			message: "Category created successfully",
		});
	} else {
		return res.status(404).json({
			message: "Category creation failed",
		});
	}
});

/**
 *  @desc get single Category
 * @route get/Category
 * @access public
 */

export const getSingleCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const Category = await categorySchema.findById(id).populate({
			path: "parentCat",
			populate: {
				path: "parentCat",
				populate: {
					path: "parentCat",
				}
			},
		})
		.populate({
			path: "subCat",
			populate: {
				path: "subCat",
				populate: {
					path: "subCat",
				}
			}
		});

	if (!Category) return res.status(404).json({ message: "Category not found" });
	return res.status(200).json(Category); 
});

/**
 *  @desc Delete single Category
 * @route Delete/Category
 * @access public
 */

export const deleteSingleCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const Category = await categorySchema.findByIdAndDelete(id);
	if (!Category) return res.status(404).json({ message: "Category not found" });

	if (Category.cat_photo) {
		const imagePublicID = findPublicId(Category.cat_photo);
		 await cloudDelete(imagePublicID);
	}
	res.status(200).json({ message: "Category deleted" });
});

/**
 *  @desc Update Category
 * @route Update/Category
 * @access public
 */

export const UpdateCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name, parentCat, cat_icon} = req.body;

	if (!name) return res.status(404).json({ message: "Field is reqquired !" });

	const Category = await categorySchema.findById(id);


	if (!Category)
		return res.status(404).json({ message: "Category  le not found" });

	let parentCatt =  Category.parentCat;
	if(parentCat){
		parentCatt = parentCat;
	}
	 let catFile = Category.cat_photo;
	if(req.file){
		const catPhoto = await cloudinaryUpload(req.file.path);
		catFile = catPhoto.secure_url;
		if (Category.cat_photo) {
			const imagePublicID = findPublicId(Category.cat_photo);
			 await cloudDelete(imagePublicID);
		}
	}

	Category.name = name;
	Category.slug = createSlug(name);
	Category.cat_icon = cat_icon;
	Category.parentCat = parentCatt;
	Category.cat_photo = catFile;
	await Category.save();
	
	
	if (!Category) return res.status(404).json({ message: "Not updated" });
	return res.status(200).json({
		category: Category,
		message: "Category updated successfully",
	});
});


