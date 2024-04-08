import createError from "http-errors";
import express from "express";
import { create } from "express-handlebars";
import path from "node:path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index.js";
import catalogRouter from "./routes/catalog.js";

const app = express();

// view engine setup
const __dirname = "./";
const viewsDir = path.join(__dirname, "views");
const layoutsDir = path.join(__dirname, "views/layouts");
const partialsDir = path.join(__dirname, "vies/partials");
const hbs = create({
	extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", viewsDir);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

export default app;
