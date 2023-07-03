import express  from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
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
app.use(express.urlencoded({ extended:false }));


// server listening
app.listen(PORT,() => {
    console.log(`server listening on ${PORT}`.bgGreen);
});