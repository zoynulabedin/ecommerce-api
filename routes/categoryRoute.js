import express from "express";

import { tokenVerify } from "../middleware/tokenVerify.js";

import { UpdateCategory, createCategory, deleteSingleCategory, getAllCategory, getSingleCategory } from "../controller/categoryController.js";
const CategoryRoute = express.Router();
CategoryRoute.use(tokenVerify);
CategoryRoute.route("/")
	.get( getAllCategory)
	.post( createCategory);
CategoryRoute.route("/:id")
	.get(getSingleCategory)
	.delete(deleteSingleCategory)
	.put(UpdateCategory);

export default CategoryRoute;
