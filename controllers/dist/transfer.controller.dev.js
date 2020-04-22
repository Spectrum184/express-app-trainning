"use strict";

var db = require("../db");

var shortid = require("shortid");

module.exports = {
  create: function create(req, res, next) {
    res.render("transfer/create", {
      csrfToken: req.csrfToken()
    });
  },
  postCreate: function postCreate(req, res, next) {
    var data = {
      id: shortid.generate(),
      amount: parseInt(req.body.amount),
      accountId: req.body.accountId,
      userId: req.signedCookies.userId
    };
    db.get("transfer").push(data).write();
    res.render("transfer/create");
  }
};