const Book = require("../db/models/Book");
const Author = require("../db/models/Author");
const Genre = require("../db/models/Genre");
const BookInstance = require("../db/models/BookInstance");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all books.
exports.bookList = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book list");
});

// Display detail page for a specific book.
exports.bookDetail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
});

// Display book create form on GET.
exports.bookCreateGet = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
exports.bookCreatePost = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
exports.bookDeleteGet = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.bookDeletePost = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.bookUpdateGet = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.bookUpdatePost = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book update POST");
});
