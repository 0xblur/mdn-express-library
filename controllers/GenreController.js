import Genre from "../db/models/Genre.js";
import asyncHandler from "express-async-handler";
import { connectToDB } from "../db/utils.js";

export default class GenreController {
	constructor() {
		GenreController.init();
	}

	static async init() {
		connectToDB();
	}
	// Display list of all Genre.
	static genreList = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Genre list");
	});

	// Display detail page for a specific Genre.
	static genreDetail = asyncHandler(async (req, res, next) => {
		res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
	});

	// Display Genre create form on GET.
	static genreCreateGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Genre create GET");
	});

	// Handle Genre create on POST.
	static genreCreatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Genre create POST");
	});

	// Display Genre delete form on GET.
	static genreDeleteGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Genre delete GET");
	});

	// Handle Genre delete on POST.
	static genreDeletePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Genre delete POST");
	});

	// Display Genre update form on GET.
	static genreUpdateGet = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Genre update GET");
	});

	// Handle Genre update on POST.
	static genreUpdatePost = asyncHandler(async (req, res, next) => {
		res.send("NOT IMPLEMENTED: Genre update POST");
	});
}
