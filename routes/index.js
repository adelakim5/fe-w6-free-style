const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/web", function (req, res, next) {
  const type = "ESTJ";
  const scores = "90909090";
  res.send({ type, scores });
});

module.exports = router;
