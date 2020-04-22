require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth.route");
const cartRoute = require("./routes/cart.route");
const transferRoute = require("./routes/transfer.route");
const csurf = require("csurf");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/auth.middleware");
const productRoute = require("./routes/product.route");
const sessionMiddleware = require("./middleware/session.middleware");
const port = 3000;

mongoose.connect(process.env.MONGO_URL);
const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(sessionMiddleware);

app.use(express.static("public"));

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute);
app.use("/products", authMiddleware.requireAuth, productRoute);
app.use(csurf({ cookie: true }));
app.use("/transfer", authMiddleware.requireAuth, transferRoute);

app.get("/", (req, res) =>
  res.render("index", {
    name: "Thanh",
  })
);

app.listen(port, () => {
  "server port 3000";
});
