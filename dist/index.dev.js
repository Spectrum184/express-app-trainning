"use strict";

require("dotenv").config();

var express = require("express");

var userRoute = require("./routes/user.route");

var cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");

var authRoute = require("./routes/auth.route");

var cartRoute = require("./routes/cart.route");

var transferRoute = require("./routes/transfer.route");

var csurf = require("csurf");

var mongoose = require("mongoose");

var authMiddleware = require("./middleware/auth.middleware");

var productRoute = require("./routes/product.route");

var sessionMiddleware = require("./middleware/session.middleware");

var port = 3000;
mongoose.connect(process.env.MONGO_URL);
var app = express();
app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(sessionMiddleware);
app.use(express["static"]("public"));
app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute);
app.use("/products", authMiddleware.requireAuth, productRoute);
app.use(csurf({
  cookie: true
}));
app.use("/transfer", authMiddleware.requireAuth, transferRoute);
app.get("/", function (req, res) {
  return res.render("index", {
    name: "Thanh"
  });
});
app.listen(port, function () {
  "server port 3000";
});