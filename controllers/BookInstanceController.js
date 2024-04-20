import BookInstance from "../db/models/BookInstance.js";
import Book from "../db/models/Book.js";
import asyncHandler from "express-async-handler";
import { connectToDB } from "../db/utils.js";
import { body, validationResult } from "express-validator";

export default class BookInstanceController {
	constructor() {
		BookInstanceController.init();
	}

	static init = async () => {
		await connectToDB();
	};

	// Display list of all BookInstances.
	bookInstanceList = asyncHandler(async (req, res, next) => {
		const allBookInstances = await BookInstance.find().populate("book").exec();
		res.render("bookinstance_list", {
			title: "Book Instance List",
			bookinstance_list: allBookInstances,
		});
	});

	// Display detail page for a specific BookInstance.
	bookInstanceDetail = asyncHandler(async (req, res, next) => {
		const bookInstance = await BookInstance.findById(req.params.id)
			.populate("book")
			.exec();

		if (bookInstance === null) {
			const err = new Error("Book copy not found.");
			err.status = 404;
			return next(err);
		}

		res.render("bookinstance_detail", {
			title: bookInstance._id,
			bookinstance: bookInstance,
		});
	});

	// Display BookInstance create form on GET.
	bookInstanceCreateGet = asyncHandler(async (req, res, next) => {
		const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

		res.render("bookinstance_form", {
			title: "Create BookInstance",
			book_list: allBooks,
			status_options: BookInstance.schema.obj.status.enum,
		});
	});

	// Handle BookInstance create on POST.
	bookInstanceCreatePost = [
		body("book", "Book must be specified.")
			.trim()
			.isLength({ min: 3 })
			.escape(),

		body("imprint", "Imprint must be specified.")
			.trim()
			.isLength({ min: 3 })
			.escape(),

		body("status").escape(),

		body("due_back", "Invalid date").optional({ values: "falsy" }).isISO8601(),

		asyncHandler(async (req, res, next) => {
			const errors = validationResult(req);

			const bookInstance = new BookInstance({
				book: req.body.book,
				imprint: req.body.imprint,
				status: req.body.status,
				due_back: req.body.due_back,
			});

			if (!errors.isEmpty()) {
				const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

				res.render("bookinstance_form", {
					title: "Create BookInstance",
					book_list: allBooks,
					selected_book: bookInstance.book._id,
					errors: errors.array(),
					bookInstance,
				});

				return;
			}

			await bookInstance.save();
			res.redirect(bookInstance.url);
		}),
	];

	// Display BookInstance delete form on GET.
	bookInstanceDeleteGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance delete GET");
	});

	// Handle BookInstance delete on POST.
	bookInstanceDeletePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance delete POST");
	});

	// Display BookInstance update form on GET.
	bookInstanceUpdateGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance update GET");
	});

	// Handle bookinstance update on POST.
	bookInstanceUpdatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance update POST");
	});
}
