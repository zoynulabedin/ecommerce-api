import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoDBConnection from "./config/db.js";
import colors from "colors";
import userRoute from "./routes/userRoute.js";

// environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

/**
 * set middleware
 */

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1/user", userRoute);
// server listening
app.listen(PORT, () => {
	mongoDBConnection();
	console.log(`server listening on ${PORT}`.bgGreen);
});
