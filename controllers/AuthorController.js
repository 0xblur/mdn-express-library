import Author from "../db/models/Author.js";
import asyncHandler from "express-async-handler";

export default class AuthorController {
	static authorList = asyncHandler(async (req, res, next) => {
		res.send("NOT YET IMPLEMENTED: Author list");
	});

	static authorDetail = asyncHandler(async (req, res, next) => {
		res.send(`NOT YET IMPLEMENTED: Author detail: ${req.params.id}`);
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
