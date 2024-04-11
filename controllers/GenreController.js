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
	genreList = asyncHandler(async (req, res, next) => {
		const allGenres = await Genre.find().sort({ name: 1 }).exec();
		res.render("genre_list", {
			title: "List of genres",
			genre_list: allGenres,
		});
	});

	// Display detail page for a specific Genre.
	genreDetail = asyncHandler(async (req, res, next) => {
		const [genre, booksInGenre] = await Promise.all([
			Genre.findById(req.params.id).exec(),
			Book.find({ genre: req.params.id }, "title summary").exec(),
		]);

		if (genre === null) {
			const err = new Error("Genre not found.");
			err.status = 404;
			return next(err);
		}

		res.render("genre_detail", {
			title: "Genre detail",
			genre: genre,
			genre_books: booksInGenre,
		});
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
