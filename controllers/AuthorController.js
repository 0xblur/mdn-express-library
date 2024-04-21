import Author from "../db/models/Author.js";
import Book from "../db/models/Book.js";
import asyncHandler from "express-async-handler";
import { connectToDB } from "../db/utils.js";
import { body, validationResult } from "express-validator";

export default class AuthorController {
	constructor() {
		AuthorController.init();
	}

	static async init() {
		await connectToDB();
	}

	authorList = asyncHandler(async (req, res, next) => {
		const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
		res.render("author_list", {
			title: "Author List",
			author_list: allAuthors,
		});
	});

	authorDetail = asyncHandler(async (req, res, next) => {
		const [author, authorBooks] = await Promise.all([
			Author.findById(req.params.id).exec(),
			Book.find({ author: req.params.id }, "title summary").exec(),
		]);

		if (author === null || authorBooks === null) {
			const err = new Error("Author not found.");
			err.status = 404;
			return next(err);
		}

		res.render("author_detail", {
			title: author.name,
			author: author,
			author_books: authorBooks,
		});
	});

	authorCreateGet = asyncHandler(async (req, res, next) => {
		res.render("author_form", { title: "Create Author" });
	});

	authorCreatePost = [
		body("first_name")
			.trim()
			.isLength({ min: 2 })
			.escape()
			.withMessage("First name must be specified.")
			.isAlphanumeric()
			.withMessage("First name has non-alphanumeric characters."),

		body("family_name")
			.trim()
			.isLength({ min: 2 })
			.escape()
			.withMessage("Family name must be specified.")
			.isAlphanumeric()
			.withMessage("Family name has non-alphanumeric characters."),

		body("date_of_birth", "Invalid date of birth.")
			.optional({ values: "falsy" })
			.isISO8601()
			.toDate(),

		body("date_of_death", "Invalid date of death")
			.optional({ values: "falsy" })
			.isISO8601()
			.toDate(),

		asyncHandler(async (req, res, next) => {
			const errs = validationResult(req);

			const author = new Author({
				first_name: req.body.first_name,
				family_name: req.body.family_name,
				date_of_birth: req.body.date_of_birth,
				date_of_death: req.body.date_of_death,
			});

			if (!errs.isEmpty()) {
				res.render("author_form", {
					title: "Create Author",
					author,
					errors: errs.array(),
				});
				return;
			}

			await author.save();

			res.redirect(author.url);
		}),
	];

	// Display author-delete form on GET.
	authorDeleteGet = asyncHandler(async (req, res, next) => {
		const [author, allBooksByAuthor] = await Promise.all([
			Author.findById(req.params.id).exec(),
			Book.find({ author: req.params.id }, "title summary").exec(),
		]);

		if (author === null) {
			res.redirect("/catalog/authors");
			return;
		}

		res.render("author_delete", {
			title: "Delete Author",
			author: author,
			author_books: allBooksByAuthor,
		});
	});

	// Handle Author delete on POST.
	authorDeletePost = asyncHandler(async (req, res, next) => {
		const [author, allBooksByAuthor] = await Promise.all([
			Author.findById(req.params.id).exec(),
			Book.find({ author: req.params.id }, "title summary").exec(),
		]);

		if (allBooksByAuthor.length > 0) {
			res.render("author_delete", {
				title: "Delete Author",
				author,
				author_books: allBooksByAuthor,
			});
			return;
		}

		await Author.findByIdAndDelete(req.body.authorid);

		res.redirect("/catalog/authors");
	});

	// Display Author update form on GET.
	authorUpdateGet = asyncHandler(async (req, res, next) => {
		const author = Author.findById(req.params.id).exec();

		if (author === null) {
			const err = new Error("Author not found.");
			err.status = 404;
			return next(err);
		}

		res.render("author_form", {
			title: "Update Author",
			first_name: author.first_name,
			family_name: author.family_name,
			date_of_birth: author.date_of_birth_ISO,
			date_of_death: author.date_of_death_ISO,
		});
	});

	// Handle Author update on POST
	authorUpdatePost = [
		body("first_name")
			.trim()
			.isLength({ min: 2 })
			.escape()
			.withMessage("First name must be specified.")
			.isAlphanumeric()
			.withMessage("First name has non-alphanumeric characters."),

		body("family_name")
			.trim()
			.isLength({ min: 2 })
			.escape()
			.withMessage("Family name must be specified.")
			.isAlphanumeric()
			.withMessage("Family name has non-alphanumeric characters."),

		body("date_of_birth", "Invalid date of birth.")
			.optional({ values: "falsy" })
			.isISO8601()
			.toDate(),

		body("date_of_death", "Invalid date of death")
			.optional({ values: "falsy" })
			.isISO8601()
			.toDate(),

		asyncHandler(async (req, res) => {
			const errors = validationResult(req);

			const author = new Author({
				first_name: req.body.first_name,
				family_name: req.body.family_name,
				date_of_birth: req.body.date_of_birth,
				date_of_death: req.body.date_of_death,
				_id: req.params.id,
			});

			if (!errors.isEmpty()) {
				res.render("author_form", {
					title: "Update Author",
					author,
					errors: errors.array(),
				});
				return;
			}

			const updatedAuthor = await Author.findByIdAndUpdate(
				req.params.id,
				author,
				{},
			);

			res.redirect(updatedAuthor.url);
		}),
	];
}
