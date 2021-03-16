const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // console.log(`query!!!`);
  // console.log(req.query.type);
  // res.render("index", { title: "Express" });
});

module.exports = router;
