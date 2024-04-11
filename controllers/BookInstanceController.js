import BookInstance from "../db/models/BookInstance.js";
import asyncHandler from "express-async-handler";
import { connectToDB } from "../db/utils.js";

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
		res.send("NOT IMPLEMENTED: BookInstance create GET");
	});

	// Handle BookInstance create on POST.
	bookInstanceCreatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance create POST");
	});

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
