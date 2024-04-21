import { DateTime } from "luxon";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
	first_name: { type: String, required: true, maxLength: 100 },
	family_name: { type: String, required: true, maxLength: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
	let fullname = "";
	if (this.first_name && this.family_name) {
		fullname = `${this.family_name}, ${this.first_name}`;
	}

	return fullname;
});

AuthorSchema.virtual("date_of_birth_ISO").get(function () {
	const date_of_birth_ISO = this.date_of_birth
		? DateTime.fromJSDate(this.date_of_birth).toISODate()
		: "";

	return date_of_birth_ISO;
});

AuthorSchema.virtual("date_of_death_ISO").get(function () {
	const date_of_death_ISO = this.date_of_death
		? DateTime.fromJSDate(this.date_of_death).toISODate()
		: "";

	return date_of_death_ISO;
});

AuthorSchema.virtual("lifespan").get(function () {
	const date_of_birth_formatted = this.date_of_birth
		? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
		: "";
	const date_of_death_formatted = this.date_of_death
		? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
		: "";

	return `(${date_of_birth_formatted}—${date_of_death_formatted})`;
});

AuthorSchema.virtual("url").get(function () {
	return `/catalog/author/${this._id}`;
});

const Author = mongoose.model("Author", AuthorSchema);

export default Author;
