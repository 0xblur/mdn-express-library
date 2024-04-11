import Author from "../db/models/Author.js";
import asyncHandler from "express-async-handler";
import { connectToDB } from "../db/utils.js";

export default class AuthorController {
	static authorList = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author list");
	});
	constructor() {
		AuthorController.init();
	}

	static authorDetail = asyncHandler(async (req, res, next) => {
		res.send(`NOT YET IMPLEMENTED: Author detail: ${req.params.id}`);
	static async init() {
		await connectToDB();
	}

	});

	static authorCreateGet = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author create GET");
	});

	static authorCreatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author create POST");
	});

	// Display author-delete form on GET.
	static authorDeleteGet = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author delete GET");
	});

	// Handle Author delete on POST.
	static authorDeletePost = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author delete POST");
	});

	// Display Author update form on GET.
	static authorUpdateGet = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author update GET");
	});

	// Handle Author update on POST
	static authorUpdatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author update POST");
	});
}
