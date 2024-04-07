const Author = require("../db/models/Author");
const asyncHandler = require("express-async-handler");

exports.authorList = asyncHandler(async (req, res, next) => {
	res.send("NOT YET IMPLEMENTED: Author list");
});

exports.authorDetail = asyncHandler(async (req, res, next) => {
	res.send(`NOT YET IMPLEMENTED: Author detail: ${req.params.id}`);
});

exports.authorCreateGet = asyncHandler(async (req, res, next) => {
	res.send("NOT YET IMPLEMENTED: Author create GET");
});

exports.authorCreatePost = asyncHandler(async (req, res, next) => {
	res.send("NOT YET IMPLEMENTED: Author create POST");
});

// Display author-delete form on GET.
exports.authorDeleteGet = asyncHandler(async (req, res, next) => {
	res.send("NOT YET IMPLEMENTED: Author delete GET");
});

// Handle Author delete on POST.
exports.authorDeletePost = asyncHandler(async (req, res, next) => {
	res.send("NOT YET IMPLEMENTED: Author delete POST");
});

// Display Author update form on GET.
exports.authorUpdateGet = asyncHandler(async (req, res, next) => {
	res.send("NOT YET IMPLEMENTED: Author update GET");
});

// Handle Author update on POST
exports.authorUpdatePost = asyncHandler(async (req, res, next) => {
	res.send("NOT YET IMPLEMENTED: Author update POST");
});
