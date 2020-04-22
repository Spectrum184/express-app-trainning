const Product = require("../models/product.model");
const db = require("../db");

module.exports = {
  index: function (req, res) {
    // const page = parseInt(req.query.page) || 1;
    // const perPage = 8;
    // const start = (page - 1) * perPage;
    // const end = page * perPage;
    // res.render("products/index", {
    //   products: db.get("products").value().slice(start, end),
    //   page: parseInt(req.query.page) || 1,
    // });
    Product.find().then(function (products) {
      res.render("products/index", {
        products: products,
        page: parseInt(req.query.page) || 1,
      });
    });
  },
};
