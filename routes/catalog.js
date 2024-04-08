import BookController from "../controllers/BookController.js";
import AuthorController from "../controllers/AuthorController.js";
import GenreController from "../controllers/GenreController.js";
import BookInstanceController from "../controllers/BookInstanceController.js";
import express from "express";

const router = express.Router();

router.get("/", BookController.index);

router.get("/book/create", BookController.bookCreateGet);

// POST request for creating Book.
router.post("/book/create", BookController.bookCreatePost);

// GET request to delete Book.
router.get("/book/:id/delete", BookController.bookDeleteGet);

// POST request to delete Book.
router.post("/book/:id/delete", BookController.bookDeletePost);

// GET request to update Book.
router.get("/book/:id/update", BookController.bookUpdateGet);

// POST request to update Book.
router.post("/book/:id/update", BookController.bookUpdatePost);

// GET request for one Book.
router.get("/book/:id", BookController.bookDetail);

// GET request for list of all Book items.
router.get("/books", BookController.bookList);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/author/create", AuthorController.authorCreateGet);

// POST request for creating Author.
router.post("/author/create", AuthorController.authorCreatePost);

// GET request to delete Author.
router.get("/author/:id/delete", AuthorController.authorDeleteGet);

// POST request to delete Author.
router.post("/author/:id/delete", AuthorController.authorDeletePost);

// GET request to update Author.
router.get("/author/:id/update", AuthorController.authorUpdateGet);

// POST request to update Author.
router.post("/author/:id/update", AuthorController.authorUpdatePost);

// GET request for one Author.
router.get("/author/:id", AuthorController.authorDetail);

// GET request for list of all Authors.
router.get("/authors", AuthorController.authorList);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", GenreController.genreCreateGet);

//POST request for creating Genre.
router.post("/genre/create", GenreController.genreCreatePost);

// GET request to delete Genre.
router.get("/genre/:id/delete", GenreController.genreDeleteGet);

// POST request to delete Genre.
router.post("/genre/:id/delete", GenreController.genreDeletePost);

// GET request to update Genre.
router.get("/genre/:id/update", GenreController.genreUpdateGet);

// POST request to update Genre.
router.post("/genre/:id/update", GenreController.genreUpdatePost);

// GET request for one Genre.
router.get("/genre/:id", GenreController.genreDetail);

// GET request for list of all Genre.
router.get("/genres", GenreController.genreList);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get(
	"/bookinstance/create",
	BookInstanceController.bookInstanceCreateGet,
);

// POST request for creating BookInstance.
router.post(
	"/bookinstance/create",
	BookInstanceController.bookInstanceCreatePost,
);

// GET request to delete BookInstance.
router.get(
	"/bookinstance/:id/delete",
	BookInstanceController.bookInstanceDeleteGet,
);

// POST request to delete BookInstance.
router.post(
	"/bookinstance/:id/delete",
	BookInstanceController.bookInstanceDeletePost,
);

// GET request to update BookInstance.
router.get(
	"/bookinstance/:id/update",
	BookInstanceController.bookInstanceUpdateGet,
);

// POST request to update BookInstance.
router.post(
	"/bookinstance/:id/update",
	BookInstanceController.bookInstanceUpdatePost,
);

// GET request for one BookInstance.
router.get("/bookinstance/:id", BookInstanceController.bookInstanceDetail);

// GET request for list of all BookInstance.
router.get("/bookinstances", BookInstanceController.bookInstanceList);

export default router;
