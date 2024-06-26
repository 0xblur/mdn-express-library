import createError from "http-errors";
import express from "express";
import Handlebars from "handlebars";
import createHbsHelpers from "handlebars-helpers";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import { create } from "express-handlebars";
import path from "node:path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import compression from "compression";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
const limiter = RateLimit({
	windowMs: 1 * 60 * 1000,
	max: 10,
});

import indexRouter from "./routes/index.js";
import catalogRouter from "./routes/catalog.js";
import myCustomHelpers from "./views/helpers/helpers.js";

const app = express();

// view engine setup
const viewsDir = path.join(__dirname, "views");
const hbsHelpers = createHbsHelpers([
	"comparison",
	"array",
	"math",
	"misc",
	"string",
]);

const hbs = create({
	extname: ".hbs",
	handlebars: allowInsecurePrototypeAccess(Handlebars),
	helpers: { ...hbsHelpers, ...myCustomHelpers },
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", viewsDir);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			"script-src": ["'self'", "code.jquery.com", "cdn.jsdeliver.net"],
		},
	}),
);
app.use(limiter);
app.use(compression());
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
	res.render("error", { error: err.message });
});

export default app;
