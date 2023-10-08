import asyncHandler from "express-async-handler";
import tagsSchema from "../models/Tags.js";
import createSlug from "../utility/createSlug.js";

/**
 *  @desc get all Tags
 * @route get/Tags
 * @access public
 */

export const getAllTags = asyncHandler(async (req, res) => {
	const Tags = await tagsSchema.find();
	return res.status(200).json(Tags);
});

/**
 *  @desc create a new Tags
 * @route post/Tags
 * @access public
 */

export const createTags = asyncHandler(async (req, res) => {
	const { name } = req.body;
	// validate fields
	if (!name)
		return res.status(404).json({
			message: "empty fields",
		});

	const existTags = await tagsSchema.findOne({ name });

	if (existTags)
		return res.status(404).json({
			message: "Tags already exists",
		});

	// create new user
	const Tags = await tagsSchema.create({
		name: name,
		slug: createSlug(name),
	});
	if (Tags) {
		return res.status(200).json({
			tags: Tags,
			message: "Tags created successfully",
		});
	} else {
		return res.status(404).json({
			message: "Tags creation failed",
		});
	}
});

/**
 *  @desc get single Brand
 * @route get/brand
 * @access public
 */

export const getSingleTags = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const Tags = await tagsSchema.findById(id);

	if (!Tags) return res.status(404).json({ message: "Tags not found" });
	return res.status(200).json(Tags);
});

/**
 *  @desc Delete single Tags
 * @route Delete/Tags
 * @access public
 */

export const deleteSingleTags = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const Tags = await tagsSchema.findByIdAndDelete(id);
	if (!Tags) return res.status(404).json({ message: "Tags not found" });
	res.status(200).json({tags:Tags, message: "Tags deleted" });
});

/**
 *  @desc Update Tags
 * @route Update/Tags 
 * @access public
 */

export const UpdateTags = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	if (!name) return res.status(404).json({ message: "Field is required !" });

	const Tags = await tagsSchema.findById(id);
	if (!Tags) return res.status(404).json({ message: "Tags  le not found" });
	Tags.name = name;

	const updateTags = await tagsSchema.findByIdAndUpdate(
		id,
		{
			name,
			slug: createSlug(name),
		},
		{ new: true }
	);
	if (!updateTags) return res.status(404).json({ message: "Not updated" });
	return res
		.status(200)
		.json({ Tags: updateTags, message: "Tags updated successfully" });
});



export const UpdateStatusTags = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const { status } = req.body;
	const updateTagsStatus = await tagsSchema.findByIdAndUpdate(id, {
		status: !status,
	});

	return res
		.status(200)
		.json({ tags: updateTagsStatus, message: "Updated the Tag",});
});
