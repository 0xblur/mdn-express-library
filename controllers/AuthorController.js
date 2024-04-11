import Author from "../db/models/Author.js";
import asyncHandler from "express-async-handler";
import { connectToDB } from "../db/utils.js";

export default class AuthorController {
	constructor() {
		AuthorController.init();
	}

	static async init() {
		await connectToDB();
	}

	});

	});

	authorCreateGet = asyncHandler(async (req, res, next) => {
		res.render("author_form", { title: "Create Author" });
	});

	// Display author-delete form on GET.
	authorDeleteGet = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author delete GET");
	});

	// Handle Author delete on POST.
	authorDeletePost = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author delete POST");
	});

	// Display Author update form on GET.
	authorUpdateGet = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author update GET");
	});

	// Handle Author update on POST
	authorUpdatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author update POST");
	});
}
