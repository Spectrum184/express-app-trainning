const db = require("../db");
const shortid = require("shortid");

module.exports = {
  index: function (req, res) {
    res.render("users/index", {
      users: db.get("users").value(),
    });
  },
  search: function (req, res) {
    const q = req.query.q;
    const mathedUser = db
      .get("users")
      .value()
      .filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      });
    res.render("users/index", {
      users: mathedUser,
    });
  },
  create: function (req, res) {
    res.render("users/create");
  },
  get: function (req, res) {
    const id = req.params.id;
    const user = db.get("users").find({ id: id }).value();

    res.render("users/view", {
      user: user,
    });
  },
  postCreate: function (req, res) {
    req.body.avatar = req.file.path.split("\\").slice(1).join("/");
    req.body.id = shortid.generate();
    db.get("users").push(req.body).write();
    res.redirect("/users");
  },
  cookie: function (req, res, next) {
    res.cookie("name", 12345);
    res.send("Hello");
  },
};
