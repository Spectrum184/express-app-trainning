"use strict";

var md5 = require("md5");

var db = require("../db");

module.exports = {
  login: function login(req, res) {
    res.render("auth/login");
  },
  postLogin: function postLogin(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get("users").find({
      email: email
    }).value();
    var hashPassword = md5(password);

    if (!user) {
      res.render("auth/login", {
        errors: ["User does not exist"],
        values: req.body
      });
      return;
    }

    if (user.password !== hashPassword) {
      res.render("auth/login", {
        errors: ["Wrong password"],
        values: req.body
      });
      return;
    }

    res.cookie("userId", user.id, {
      signed: true
    });
    res.redirect("/users");
  }
};