var createError = require("http-errors");
var express = require("express");
var engine = require("ejs-locals");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var inventoryRouter = require("./routes/inventory");
var compression = require("compression");
var helmet = require("helmet");

var app = express();

app.use(helmet());

//Set up mongoose connection
var mongoose = require("mongoose");
var dev_db_url =
  "mongodb+srv://beautifulchaos:coolpassword@cluster0.fjbko.mongodb.net/inventory?retryWrites=true&w=majority";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(compression()); //Compress all routes
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", inventoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
