const db = require("../db");

module.exports.requireAuth = function (req, res, next) {
  const cookie = req.signedCookies.userId;
  if (!cookie) {
    res.redirect("/auth/login");
    return;
  }

  const user = db.get("users").find({ id: req.signedCookies.userId }).value();

  if (!user) {
    res.redirect("/auth/login");
    return;
  }

  res.locals.user = user;

  next();
};
