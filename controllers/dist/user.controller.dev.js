"use strict";

var db = require("../db");

var shortid = require("shortid");

module.exports = {
  index: function index(req, res) {
    res.render("users/index", {
      users: db.get("users").value()
    });
  },
  search: function search(req, res) {
    var q = req.query.q;
    var mathedUser = db.get("users").value().filter(function (user) {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("users/index", {
      users: mathedUser
    });
  },
  create: function create(req, res) {
    res.render("users/create");
  },
  get: function get(req, res) {
    var id = req.params.id;
    var user = db.get("users").find({
      id: id
    }).value();
    res.render("users/view", {
      user: user
    });
  },
  postCreate: function postCreate(req, res) {
    req.body.avatar = req.file.path.split("\\").slice(1).join("/");
    req.body.id = shortid.generate();
    db.get("users").push(req.body).write();
    res.redirect("/users");
  },
  cookie: function cookie(req, res, next) {
    res.cookie("name", 12345);
    res.send("Hello");
  }
};