import BookController from "../controllers/BookController.js";
import AuthorController from "../controllers/AuthorController.js";
import GenreController from "../controllers/GenreController.js";
import BookInstanceController from "../controllers/BookInstanceController.js";
import express from "express";

const router = express.Router();

router.get("/", new BookController().index);

router.get("/book/create", new BookController().bookCreateGet);

// POST request for creating Book.
router.post("/book/create", new BookController().bookCreatePost);

// GET request to delete Book.
router.get("/book/:id/delete", new BookController().bookDeleteGet);

// POST request to delete Book.
router.post("/book/:id/delete", new BookController().bookDeletePost);

// GET request to update Book.
router.get("/book/:id/update", new BookController().bookUpdateGet);

// POST request to update Book.
router.post("/book/:id/update", new BookController().bookUpdatePost);

// GET request for one Book.
router.get("/book/:id", new BookController().bookDetail);

// GET request for list of all Book items.
router.get("/books", new BookController().bookList);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/author/create", new AuthorController().authorCreateGet);

// POST request for creating Author.
router.post("/author/create", new AuthorController().authorCreatePost);

// GET request to delete Author.
router.get("/author/:id/delete", new AuthorController().authorDeleteGet);

// POST request to delete Author.
router.post("/author/:id/delete", new AuthorController().authorDeletePost);

// GET request to update Author.
router.get("/author/:id/update", new AuthorController().authorUpdateGet);

// POST request to update Author.
router.post("/author/:id/update", new AuthorController().authorUpdatePost);

// GET request for one Author.
router.get("/author/:id", new AuthorController().authorDetail);

// GET request for list of all Authors.
router.get("/authors", new AuthorController().authorList);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", new GenreController().genreCreateGet);

//POST request for creating Genre.
router.post("/genre/create", new GenreController().genreCreatePost);

// GET request to delete Genre.
router.get("/genre/:id/delete", new GenreController().genreDeleteGet);

// POST request to delete Genre.
router.post("/genre/:id/delete", new GenreController().genreDeletePost);

// GET request to update Genre.
router.get("/genre/:id/update", new GenreController().genreUpdateGet);

// POST request to update Genre.
router.post("/genre/:id/update", new GenreController().genreUpdatePost);

// GET request for one Genre.
router.get("/genre/:id", new GenreController().genreDetail);

// GET request for list of all Genre.
router.get("/genres", new GenreController().genreList);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get(
	"/bookinstance/create",
	new BookInstanceController().bookInstanceCreateGet,
);

// POST request for creating BookInstance.
router.post(
	"/bookinstance/create",
	new BookInstanceController().bookInstanceCreatePost,
);

// GET request to delete BookInstance.
router.get(
	"/bookinstance/:id/delete",
	new BookInstanceController().bookInstanceDeleteGet,
);

// POST request to delete BookInstance.
router.post(
	"/bookinstance/:id/delete",
	new BookInstanceController().bookInstanceDeletePost,
);

// GET request to update BookInstance.
router.get(
	"/bookinstance/:id/update",
	new BookInstanceController().bookInstanceUpdateGet,
);

// POST request to update BookInstance.
router.post(
	"/bookinstance/:id/update",
	new BookInstanceController().bookInstanceUpdatePost,
);

// GET request for one BookInstance.
router.get(
	"/bookinstance/:id",
	new BookInstanceController().bookInstanceDetail,
);

// GET request for list of all BookInstance.
router.get("/bookinstances", new BookInstanceController().bookInstanceList);

export default router;
