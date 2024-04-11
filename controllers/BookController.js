import Book from "../db/models/Book.js";
import Author from "../db/models/Author.js";
import Genre from "../db/models/Genre.js";
import BookInstance from "../db/models/BookInstance.js";

import asyncHandler from "express-async-handler";
import { connectToDB } from "../db/utils.js";

export default class BookController {
	constructor() {
		BookController.init();
	}
	static async init() {
		await connectToDB();
	}
	index = asyncHandler(async (req, res, next) => {
		const [
			numBooks,
			numBookInstances,
			numAvailableBookInstances,
			numAuthors,
			numGenres,
		] = await Promise.all([
			Book.countDocuments({}).exec(),
			BookInstance.countDocuments({}).exec(),
			BookInstance.countDocuments({ status: "Available" }).exec(),
			Author.countDocuments({}).exec(),
			Genre.countDocuments({}).exec(),
		]);

		res.render("index", {
			title: "LocalLibrary | Home",
			book_count: numBooks,
			book_instance_count: numBookInstances,
			book_instance_available_count: numAvailableBookInstances,
			author_count: numAuthors,
			genre_count: numGenres,
		});
	});

	// Display list of all books.
	bookList = asyncHandler(async (req, res, next) => {
		const allBooks = await Book.find({}, "title author")
			.sort({ title: 1 })
			.populate("author")
			.exec();

		res.render("book_list", { title: "Book List", book_list: allBooks });
	});

	// Display detail page for a specific book.
	bookDetail = asyncHandler(async (req, res, next) => {
		res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
	});

	// Display book create form on GET.
	bookCreateGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Book create GET");
	});

	// Handle book create on POST.
	ookCreatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Book create POST");
	});

	// Display book delete form on GET.
	static bookDeleteGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Book delete GET");
	});

	// Handle book delete on POST.
	static bookDeletePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Book delete POST");
	});

	// Display book update form on GET.
	static bookUpdateGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Book update GET");
	});

	// Handle book update on POST.
	static bookUpdatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Book update POST");
	});
}
