import asyncHandler from "express-async-handler";
import categorySchema from "../models/Category.js";
import createSlug from "../utility/createSlug.js";

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
	const { name, parentCat } = req.body;
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

	// create new user
	const Category = await categorySchema.create({
		name: name,
		slug: createSlug(name),
		parentCat: parentCat ? parentCat : null,
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
	res.status(200).json({ message: "Category deleted" });
});

/**
 *  @desc Update Category
 * @route Update/Category
 * @access public
 */

export const UpdateCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	if (!name) return res.status(404).json({ message: "Field is reqquired !" });

	const Category = await categorySchema.findById(id);
	if (!Category)
		return res.status(404).json({ message: "Category  le not found" });
	Category.name = name;

	const updateCategory = await categorySchema.findByIdAndUpdate(
		id,
		{
			name,
			slug: createSlug(name),
			logo: req.files.logo[0].filename,
		},
		{ new: true }
	);
	if (!updateCategory) return res.status(404).json({ message: "Not updated" });
	return res.status(200).json({
		category: updateCategory,
		message: "Category updated successfully",
	});
});


