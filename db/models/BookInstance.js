import mongoose from "mongoose";
import { DateTime } from "luxon";

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
	book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
	imprint: { type: String, required: true },
	status: {
		type: String,
		required: true,
		enum: ["Available", "Maintenance", "Loaned", "Reserved"],
		default: "Maintenance",
	},
	due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
	// We don't use an arrow function as we'll need the this object
	return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
	const dt = DateTime.fromJSDate(this.due_back).toLocaleString(
		DateTime.DATE_MED,
	);
	return dt;
});

BookInstanceSchema.virtual("due_back_yyyy_mm_dd").get(function () {
	return DateTime.fromJSDate(this.due_back).toISODate();
});
// Export model
const BookInstance = mongoose.model("BookInstance", BookInstanceSchema);
export default BookInstance;
