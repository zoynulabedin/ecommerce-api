import express from "express";

import {
	UpdateProduct,
	createProduct,
	deleteSingleProduct,
	getAllProduct,
	getSingleProduct,
} from "../controller/productController.js";
import { tokenVerify } from "../middleware/tokenVerify.js";
import { ProductPhoto } from "../utility/multer.js";


const ProductRoute = express.Router();
ProductRoute.use(tokenVerify);
ProductRoute.route("/").get(getAllProduct).post(ProductPhoto, createProduct);
ProductRoute.route("/:id")
	.get(getSingleProduct)
	.delete(deleteSingleProduct)
	.put(ProductPhoto,UpdateProduct);


export default ProductRoute;
