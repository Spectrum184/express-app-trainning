const db = require("../db");

module.exports.addToCart = function (req, res, next) {
  const productId = req.params.productId;
  const sessionId = req.signedCookies.sessionId;
  const count = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + productId, 0)
    .value();

  if (!sessionId) {
    res.redirect("/products");
    return;
  }
  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + productId, count + 1)
    .write();

  res.redirect("/products");
};
