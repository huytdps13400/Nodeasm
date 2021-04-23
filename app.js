var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dashboard = require("./routes/dashboard");
var category = require("./routes/category");
var product = require("./routes/product");
var cart = require("./routes/cart");

var fileUpload = require("express-fileupload");

var app = express();
const db = require("./config/key").mongoURI;

//Connect Mongo
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
var hbs = require("hbs");
hbs.registerHelper("sosanh", function (a, b, c) {
  console.log(a + "ssss" + b);
  return a.toString() == b.toString();
});
hbs.registerHelper("foreach", function (data) {
  var a = '';
  console.log('length-----',data.length)
  for (let index = 0; index < data.length; index++) {
    a  += 'Name Product: \n'+data[index].food.name+'\nQuantity: \n'+data[index].quantity +'\n Price:'+data[index].price+'\t\t\t\t';
    
  }
  return a;
 
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/category/public", express.static(path.join(__dirname, "public")));
app.use("/product/public", express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.JWT_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dashboard", dashboard);
app.use("/category", category);
app.use("/product", product);
app.use("/cart", cart);

app.use(
  fileUpload({
    createParentPath: true,
  })
);
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
