import Book from "../db/models/Book.js";
import Author from "../db/models/Author.js";
import Genre from "../db/models/Genre.js";
import BookInstance from "../db/models/BookInstance.js";

import asyncHandler from "express-async-handler";
import { connectToDB } from "../db/utils.js";
import { body, validationResult } from "express-validator";

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
		const [book, bookInstances] = await Promise.all([
			Book.findById(req.params.id).populate("author").populate("genre").exec(),
			BookInstance.find({ book: req.params.id }).exec(),
		]);

		if (book === null) {
			const err = new Error("Book not found.");
			err.status = 404;
			return next(err);
		}

		res.render("book_detail", {
			title: book.title,
			book: book,
			book_instances: bookInstances,
		});
	});

	// Display book create form on GET.
	bookCreateGet = asyncHandler(async (req, res, next) => {
		const [allAuthors, allGenres] = await Promise.all([
			Author.find().sort({ family_name: 1 }).exec(),
			Genre.find().sort({ name: 1 }).exec(),
		]);

		res.render("book_form", {
			title: "Create Book",
			authors: allAuthors,
			genres: allGenres,
		});
	});

	// Handle book create on POST.
	bookCreatePost = [
		(req, res, next) => {
			if (!Array.isArray(req.body.genre)) {
				req.body.genre =
					typeof req.body.genre === "undefined" ? [] : [req.body.genre];
			}
			next();
		},

		body("title", "Title must not be empty.")
			.trim()
			.isLength({ min: 3 })
			.escape(),

		body("author", "Author must not be empty.")
			.trim()
			.isLength({ min: 3 })
			.escape(),

		body("summary", "Summary must not be empty.")
			.trim()
			.isLength({ min: 10 })
			.escape(),

		body("isbn", "ISBN must not be empty")
			.trim()
			.isLength({ min: 13 })
			.escape(),

		body("genre.*").escape(),

		asyncHandler(async (req, res, next) => {
			const errs = validationResult(req);

			const book = new Book({
				title: req.body.title,
				author: req.body.author,
				summary: req.body.summary,
				isbn: req.body.isbn,
				genre: req.body.genre,
			});

			if (!errs.isEmpty()) {
				const [allAuthors, allGenres] = await Promise.all([
					Author.find().sort({ family_name: 1 }).exec(),
					Genre.find().sort({ name: 1 }).exec(),
				]);

				for (const genre of allGenres) {
					if (book.genre.includes(genre._id)) {
						genre.checked = "true";
					}
				}

				res.render("book_form", {
					title: "Create Book",
					authors: allAuthors,
					genres: allGenres,
					book,
					errors: errs.array(),
				});

				return;
			}

			await book.save();
			res.redirect(book.url);
		}),
	];

	// Display book delete form on GET.
	bookDeleteGet = asyncHandler(async (req, res, next) => {
		const [book, bookInstances] = await Promise.all([
			Book.findById(req.params.id).exec(),
			BookInstance.find({ book: req.params.id }, "status"),
		]);

		if (book === null) {
			res.redirect("/catalog/books");
			return;
		}

		res.render("book_delete", {
			title: "Delete Book",
			book,
			book_instances: bookInstances,
		});
	});

	// Handle book delete on POST.
	bookDeletePost = asyncHandler(async (req, res, next) => {
		const [book, bookInstances] = await Promise.all([
			Book.findById(req.params.id).exec(),
			BookInstance.find({ book: req.params.id }, "status"),
		]);

		if (bookInstances.length > 0) {
			res.render("book_delete", {
				title: "Delete Book",
				book,
				book_instances: bookInstances,
			});
			return;
		}
		await Book.findByIdAndDelete(req.body.bookid);

		res.redirect("/catalog/books");
	});

	// Display book update form on GET.
	bookUpdateGet = asyncHandler(async (req, res, next) => {
		const [book, allAuthors, allGenres] = await Promise.all([
			Book.findById(req.params.id).populate("author").exec(),
			Author.find().sort({ family_name: 1 }).exec(),
			Genre.find().sort({ name: 1 }).exec(),
		]);

		if (book === null) {
			const err = new Error("Book not found.");
			err.status = 404;
			return next(err);
		}

		for (const genre of allGenres) {
			if (book.genre.includes(genre._id)) genre.checked = "true";
		}

		res.render("book_form", {
			title: "Update Book",
			authors: allAuthors,
			genres: allGenres,
			book,
		});
	});

	// Handle book update on POST.
	bookUpdatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Book update POST");
	});
}
