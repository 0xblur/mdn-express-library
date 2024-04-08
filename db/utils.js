import mongoose from "mongoose";

export async function connectToDB() {
	mongoose.set("strictQuery", false);
	const DB_PASS = process.env.DB_PASS;
	const DB_NAME = "local_library";
	const uri = `mongodb+srv://admin:${DB_PASS}@cluster0.wbafhwk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
	await mongoose.connect(uri);
}
