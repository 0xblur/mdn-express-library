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
	static bookInstanceDetail = asyncHandler(async (req, res, next) => {
		res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
	});

	// Display BookInstance create form on GET.
	static bookInstanceCreateGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance create GET");
	});

	// Handle BookInstance create on POST.
	static bookInstanceCreatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance create POST");
	});

	// Display BookInstance delete form on GET.
	static bookInstanceDeleteGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance delete GET");
	});

	// Handle BookInstance delete on POST.
	static bookInstanceDeletePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance delete POST");
	});

	// Display BookInstance update form on GET.
	static bookInstanceUpdateGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance update GET");
	});

	// Handle bookinstance update on POST.
	static bookInstanceUpdatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: BookInstance update POST");
	});
}
