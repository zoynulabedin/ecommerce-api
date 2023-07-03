import mongoose from "mongoose";
mongoose.set("debug", false);
mongoose.set("strictQuery", false);
const options = {
	strict: "throw",
	strictQuery: false,
};

// mongodb connection

const mongoDBConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected`.bgCyan.black);
	} catch (err) {
		console.log(err.message);
	}
};

export default mongoDBConnection;