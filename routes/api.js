const express = require("express");
const apiRouter = express.Router();
const { updateResult, types, addScore, getSelectedMsg, registerNewUser, deleteUser } = require("./chat/userManager.js");
const { questions, answers, blockIds, startUtterances } = require("./chat/blocks.js");
const { createResponseBody, createResultBody, createBreakMessage } = require("./chat/responses.js");
const { eachBlocksize } = require("./chat/util.js");
let users = new Map();

apiRouter.post("/", function (req, res) {
  const userRequest = req.body.userRequest;
  const userId = userRequest.user.id;
  const userAnswer = userRequest.utterance;

  if (startUtterances.some((e) => e === userAnswer)) {
    if (userAnswer === startUtterances || !users.has(userId)) users = registerNewUser(users, userId);

    const index = users.get(userId).index;
    console.log(index);
    console.log(questions.length);
    // when the answer is the beginning || end signal
    if (index === questions.length) {
      // create url including user's result, then send it to chatbot as a message
      const userValue = users.get(userId);
      const scoreArr = [userValue.energy.E, userValue.energy.I, userValue.information.S, userValue.information.N, userValue.decision.T, userValue.decision.F, userValue.lifestyle.J, userValue.lifestyle.P];
      const scores = scoreArr.reduce((acc, val) => acc + val, ``);
      const result = userValue.result.join("");

      const resultBody = createResultBody(result, scores);
      console.log(resultBody);
      users = deleteUser(users, userId);
      res.status(200).json(resultBody);
      // try {

      // } catch (e) {
      //   console.log(userValue);
      //   console.log(scoreArr);
      //   console.log(scores);
      //   console.log(result);
      //   console.log(users);
      // }
    } else {
      const responseBody = createResponseBody(questions, index, blockIds, answers);
      res.status(200).json(responseBody);
    }
  } else {
    // when the answer is the chosen answer of the question
    const totalQuestionIndex = users.get(userId).totalQuestionIndex;
    const index = users.get(userId).index;

    if (userAnswer === answers[index].left) {
      users = addScore(users, userId, totalQuestionIndex, types[totalQuestionIndex].left);
    } else if (userAnswer === answers[index].right) {
      users = addScore(users, userId, totalQuestionIndex, types[totalQuestionIndex].right);
    } else {
      // if the user type other letters ... for exceptional situation
    }

    // when all the questions of this part was done
    if (index && index % eachBlocksize === eachBlocksize - 1) {
      const typeArr = [types[totalQuestionIndex].left, types[totalQuestionIndex].right];
      const selectedMsg = getSelectedMsg(users, userId, totalQuestionIndex, typeArr);
      users = updateResult(users, userId, totalQuestionIndex, typeArr);
      users.get(userId).totalQuestionIndex++;
      const breakMessage = createBreakMessage(blockIds, selectedMsg, startUtterances, { users, userId });
      // ++users.get(userId).index;
      res.status(200).json(breakMessage);
    } else {
      users.get(userId).index++;
      const responseBody = createResponseBody(questions, users.get(userId).index, blockIds, answers);
      res.status(200).json(responseBody);
    }
  }
});

// const createBase = require("../views/createBase.js");
// const createResult = require("../views/createResult.js");
// const style_href = require("../utils.js");
// const createGraph = require("../views/createGraph.js");
// const fs = require("fs");

// apiRouter.use(express.json());

// apiRouter.get("/result", function (req, res, next) {
//   const type = req.query.type;
//   const scores = req.query.scores;
//   const jsonData = JSON.parse(fs.readFileSync("./data/personalities.json"));
//   const result = createResult(jsonData[type]);
//   const graph = createGraph(scores);
//   res.send(createBase(style_href, result, graph));
// });

module.exports = apiRouter;
