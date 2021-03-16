const express = require("express");
const router = express.Router();
const fs = require("fs");
router.use(express.json());

/* GET users listing. */
router.get("", function (req, res, next) {
  const type = req.query.type;
  const scores = req.query.scores;
  const jsonData = JSON.parse(fs.readFileSync("./data/personalities.json"));
  console.log(jsonData);
  res.send({ result: jsonData[type], scores });
});

module.exports = router;
