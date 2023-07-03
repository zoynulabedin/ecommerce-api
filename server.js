import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoDBConnection from "./config/db.js";
import colors from "colors";

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

// server listening
app.listen(PORT, () => {
	mongoDBConnection();
	console.log(`server listening on ${PORT}`.bgGreen);
});
