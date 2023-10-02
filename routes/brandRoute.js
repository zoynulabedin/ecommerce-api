import express from "express";

import {
	UpdateBrand,
	UpdateStatusBrand,
	createBrand,
	deleteSingleBrand,
	getAllBrand,
	getSingleBrand,
} from "../controller/brandController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import { BrandLogo } from "../utility/multer.js";

const BrandRoute = express.Router();
BrandRoute.use(tokenVerify);
BrandRoute.route("/").get(getAllBrand).post(BrandLogo, createBrand);
BrandRoute.route("/:id")
	.get(getSingleBrand)
	.delete(deleteSingleBrand)
	.put(BrandLogo,UpdateBrand);
	BrandRoute.route("/status/:id").patch(UpdateStatusBrand);


export default BrandRoute;
