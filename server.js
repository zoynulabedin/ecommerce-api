import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoDBConnection from "./config/db.js";
import colors from "colors";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
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
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth", authRoute);
// server listening
app.listen(PORT, () => {
	mongoDBConnection();
	console.log(`server listening on ${PORT}`.bgGreen);
});
