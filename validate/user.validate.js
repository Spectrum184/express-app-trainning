module.exports.postCreate = function (req, res, next) {
  const err = [];
  if (!req.body.name) {
    err.push("Name is required");
  }
  if (!req.body.phone) {
    err.push("Phone is required");
  }
  if (err.length) {
    res.render("users/create", {
      errors: err,
      value: req.body,
    });
    return;
  }
  next();
};
