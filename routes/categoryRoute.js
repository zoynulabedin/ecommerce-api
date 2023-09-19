import express from "express";

import { tokenVerify } from "../middleware/tokenVerify.js";

import { UpdateCategory, createCategory, deleteSingleCategory, getAllCategory, getSingleCategory } from "../controller/categoryController.js";
import { CategoryLogo } from "../utility/multer.js";
const CategoryRoute = express.Router();
CategoryRoute.use(tokenVerify);
CategoryRoute.route("/")
	.get( getAllCategory)
	.post(CategoryLogo, createCategory);
CategoryRoute.route("/:id")
	.get(getSingleCategory)
	.delete(deleteSingleCategory)
	.put(CategoryLogo,UpdateCategory);

export default CategoryRoute;
