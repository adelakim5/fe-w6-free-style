const express = require("express");
const router = express.Router();
const fs = require("fs");
<<<<<<< HEAD
router.use(express.json());

/* GET users listing. */
=======
const createBase = require("../views/createBase.js");
const createResult = require("../views/createResult.js");
const style_href = require("../utils.js");
const createGraph = require("../views/createGraph.js");

router.use(express.json());

>>>>>>> 07725e0ffed6094547170ceafb20b6135ccfb4d6
router.get("", function (req, res, next) {
  const type = req.query.type;
  const scores = req.query.scores;
  const jsonData = JSON.parse(fs.readFileSync("./data/personalities.json"));
<<<<<<< HEAD
  console.log(jsonData);
  res.send({ result: jsonData[type], scores });
=======
  const result = createResult(jsonData[type]);
  console.log(scores);
  const graph = createGraph(scores);
  // const graph = `<div class="graph">graph</div>`;
  res.send(createBase(style_href, result, graph));
>>>>>>> 07725e0ffed6094547170ceafb20b6135ccfb4d6
});

module.exports = router;
