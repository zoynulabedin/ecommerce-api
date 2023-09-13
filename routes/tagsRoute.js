import express from "express";
import {
	UpdateTags,
	createTags,
	deleteSingleTags,
	getAllTags,
	getSingleTags,
} from "../controller/tagController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const TagsRoute = express.Router();

TagsRoute.route("/").get(tokenVerify, getAllTags).post(createTags);
TagsRoute.route("/:id")
	.get(getSingleTags)
	.delete(deleteSingleTags)
	.put(UpdateTags);

export default TagsRoute;
