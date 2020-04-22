const db = require("../db");
const shortid = require("shortid");

module.exports = {
  create: function (req, res, next) {
    res.render("transfer/create", { csrfToken: req.csrfToken() });
  },
  postCreate: function (req, res, next) {
    const data = {
      id: shortid.generate(),
      amount: parseInt(req.body.amount),
      accountId: req.body.accountId,
      userId: req.signedCookies.userId,
    };
    db.get("transfer").push(data).write();
    res.render("transfer/create");
  },
};
