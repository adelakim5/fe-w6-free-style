const express = require("express");
const router = express.Router();
const fs = require("fs");
const createBase = require("../views/createBase.js");
const createResult = require("../views/createResult.js");
const style_href = require("../utils.js");
const createGraph = require("../views/createGraph.js");

router.use(express.json());

router.get("", function (req, res, next) {
  const type = req.query.type;
  const scores = req.query.scores;
  const jsonData = JSON.parse(fs.readFileSync("./data/personalities.json"));
  const result = createResult(jsonData[type]);
  const graph = createGraph(scores);
  res.send(createBase(style_href, result, graph));
});

module.exports = router;
