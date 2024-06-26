import Book from "../db/models/Book.js";
import Genre from "../db/models/Genre.js";
import asyncHandler from "express-async-handler";
import { connectToDB } from "../db/utils.js";
import { body, validationResult } from "express-validator";

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
	genreCreateGet = (req, res, next) => {
		res.render("genre_form", {
			title: "Create Genre",
		});
	};

	// Handle Genre create on POST.
	genreCreatePost = [
		body("name", "Genre name must contain at least 3 characters.")
			.trim()
			.isLength({ min: 3 })
			.escape(),

		asyncHandler(async (req, res, next) => {
			const errors = validationResult(req);

			const genre = new Genre({ name: req.body.name });

			if (!errors.isEmpty()) {
				res.render("genre_form", {
					title: "Create Genre",
					genre,
					errors: errors.array(),
				});
				return;
			}

			const genreExists = await Genre.findOne({ name: req.body.name })
				.collation({ locale: "en", strength: 2 })
				.exec();
			if (genreExists) {
				res.redirect(genreExists.url);
			} else {
				await genre.save();
				res.redirect(genre.url);
			}
		}),
	];

	// Display Genre delete form on GET.
	genreDeleteGet = asyncHandler(async (req, res, next) => {
		const [genre, allBooksByGenre] = await Promise.all([
			Genre.findById(req.params.id).exec(),
			Book.find({ genre: req.params.id }, "title summary").exec(),
		]);

		if (genre === null) {
			res.redirect("/catalog/genres");
			return;
		}

		res.render("genre_delete", {
			title: "Delete Genre",
			genre,
			genre_books: allBooksByGenre,
		});
	});

	// Handle Genre delete on POST.
	genreDeletePost = asyncHandler(async (req, res, next) => {
		const [genre, allBooksByGenre] = await Promise.all([
			Author.findById(req.params.id).exec(),
			Book.find({ author: req.params.id }, "title summary"),
		]);
		if (allBooksByGenre.length > 0) {
			res.render("genre_delete", {
				title: "Delete Genre",
				genre,
				genre_books: allBooksByGenre,
			});
			return;
		}
		await Genre.findByIdAndDelete(req.body.genreid);

		res.redirect("/catalog/genres");
	});

	// Display Genre update form on GET.
	genreUpdateGet = asyncHandler(async (req, res, next) => {
		const genre = await Genre.findById(req.params.id);
		res.render("genre_form", {
			title: "Update Genre",
			genre,
		});
	});

	// Handle Genre update on POST.
	genreUpdatePost = [
		body("name", "Genre name must contain at least 3 characters.")
			.trim()
			.isLength({ min: 3 })
			.escape(),

		asyncHandler(async (req, res, next) => {
			const errors = validationResult(req);

			const genre = new Genre({
				name: req.body.name,
				_id: req.params.id,
			});

			if (!errors.isEmpty()) {
				res.render("genre_form", {
					title: "Update Genre",
					genre,
					errors: errors.array(),
				});
				return;
			}

			const genreExists = await Genre.findOne({ name: req.body.name })
				.collation({ locale: "en", strength: 2 })
				.exec();
			if (genreExists) {
				res.redirect(genreExists.url);
			} else {
				await Genre.findByIdAndUpdate(req.params.id, genre, {});
				res.redirect(genre.url);
			}
		}),
	];
}
