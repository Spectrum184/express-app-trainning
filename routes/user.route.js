const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });

const controller = require("../controllers/user.controller");
const validate = require("../validate/user.validate");
const router = express.Router();

router.get("/", controller.index);

router.get("/search", controller.search);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  validate.postCreate,
  controller.postCreate
);

router.get("/cookie", controller.cookie);

router.get("/:id", controller.get);

module.exports = router;
