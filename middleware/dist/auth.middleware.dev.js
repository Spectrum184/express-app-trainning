"use strict";

var db = require("../db");

module.exports.requireAuth = function (req, res, next) {
  var cookie = req.signedCookies.userId;

  if (!cookie) {
    res.redirect("/auth/login");
    return;
  }

  var user = db.get("users").find({
    id: req.signedCookies.userId
  }).value();

  if (!user) {
    res.redirect("/auth/login");
    return;
  }

  res.locals.user = user;
  next();
};