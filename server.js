import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoDBConnection from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import BrandRoute from "./routes/brandRoute.js";
import permissionRoute from "./routes/permissionRoute.js";
import RoleRoute from "./routes/roleRoute.js";
import userRoute from "./routes/userRoute.js";
import TagsRoute from "./routes/tagsRoute.js";
import colors from "colors";
import CategoryRoute from "./routes/categoryRoute.js";
// environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

/**
 * set middleware
 */

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/permission", permissionRoute);
app.use("/api/v1/role", RoleRoute);
app.use("/api/v1/brand", BrandRoute);
app.use("/api/v1/tags", TagsRoute);;
app.use("/api/v1/category", CategoryRoute);
// server listening
app.listen(PORT, () => {
	mongoDBConnection();
	console.log(`server listening on ${PORT}`.bgGreen);
});
