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
					selected_book: bookInstance.book._id.toString(),
					errors: errors.array(),
					bookinstance: bookInstance,
					status_options: BookInstance.schema.obj.status.enum,
				});

				return;
			}

			await bookInstance.save();
			res.redirect(bookInstance.url);
		}),
	];

	// Display BookInstance delete form on GET.
	bookInstanceDeleteGet = asyncHandler(async (req, res, next) => {
		const bookInstance = await BookInstance.findById(req.params.id)
			.populate("book")
			.exec();
		if (bookInstance === null) {
			res.redirect("/catalog/bookinstances");
			return;
		}
		res.render("bookinstance_delete", {
			title: "Delete Instance",
			bookinstance: bookInstance,
		});
	});

	// Handle BookInstance delete on POST.
	bookInstanceDeletePost = asyncHandler(async (req, res, next) => {
		const instance = await BookInstance.findByIdAndDelete(
			req.body.bookinstanceid,
		)
			.populate("book")
			.exec();

		res.redirect(`/catalog/book/${instance.book._id}`);
	});

	// Display BookInstance update form on GET.
	bookInstanceUpdateGet = asyncHandler(async (req, res, next) => {
		const [bookInstance, allBooks] = await Promise.all([
			BookInstance.findById(req.params.id).exec(),
			Book.find({}, "title").sort({ title: 1 }).exec(),
		]);

		if (bookInstance === null) {
			const error = new Error("Instance not found.");
			error.status = 404;
			return next(error);
		}

		res.render("bookinstance_form", {
			title: "Update BookInstance",
			book_list: allBooks,
			status_options: BookInstance.schema.obj.status.enum,
			bookinstance: bookInstance,
			selected_book: bookInstance.book._id.toString(),
		});
	});

	// Handle bookinstance update on POST.
	bookInstanceUpdatePost = [
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
				_id: req.params.id,
			});

			if (!errors.isEmpty()) {
				const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

				res.render("bookinstance_form", {
					title: "Update BookInstance",
					book_list: allBooks,
					selected_book: bookInstance.book._id.toString(),
					errors: errors.array(),
					bookinstance: bookInstance,
					status_options: BookInstance.schema.obj.status.enum,
				});

				return;
			}

			const updatedInstance = await BookInstance.findByIdAndUpdate(
				req.params.id,
				bookInstance,
				{},
			);
			res.redirect(updatedInstance.url);
		}),
	];
}
