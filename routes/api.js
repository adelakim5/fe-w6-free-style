const express = require("express");
const apiRouter = express.Router();
const { deleteUser, updateResult, types, initScore, addScore, getSelectedMsg, registerNewUser, createResponseBody } = require("./functions/addScore.js");
const { questions, answers, breakMsg, blockIds } = require("./functions/qna.js");
let users = new Map();

// let totalQuestionIndex = 0;
// let index = 0;
const beginningUtterance = "시작하기";
const startUtterances = ["시작", "레츠고😎", "고고~", "예스! 킵고잉!", "궁금해! 두구두구.."];

apiRouter.post("/", function (req, res) {
  // console.log(`index: ${index}`);

  const userRequest = req.body.userRequest;
  const userId = userRequest.user.id;
  const userAnswer = userRequest.utterance;

  if (startUtterances.some((e) => e === userAnswer)) {
    if (!users.has(userId)) users = registerNewUser(users, userId, initScore);
    // if (userAnswer === startUtterances[0]) users = registerNewUser(users, userId, initScore);

    const index = users.get(userId).index;

    // when the answer is the beginning || end signal
    if (index === questions.length) {
      // create url including user's result, then send it to chatbot as a message
      const userValue = users.get(userId);
      const scoreArr = [userValue["0"].E, userValue["0"].I, userValue["1"].S, userValue["1"].N, userValue["2"].T, userValue["2"].F, userValue["3"].J, userValue["3"].P];
      const scores = scoreArr.reduce((acc, val) => acc + val, ``);
      const result = userValue.result.join("");
      const url = `http://34.64.132.100:3000/api/result?type=${result}&scores=${scores}`;
      const responseBody = {
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: `결과를 확인하세요!\n${url}`,
              },
            },
          ],
        },
      };
      res.status(200).json(responseBody);
      users = deleteUser(users, userId);
    } else {
      const responseBody = createResponseBody(questions, index);
      res.status(200).json(responseBody);
    }
  } else {
    // when the answer is the chosen answer of the question
    const totalQuestionIndex = users.get(userId).totalQuestionIndex;
    const index = users.get(userId).index;

    if (userAnswer === answers[index].one) {
      users = addScore(users, userId, totalQuestionIndex, types[totalQuestionIndex].one);
    } else if (userAnswer === answers[index].two) {
      users = addScore(users, userId, totalQuestionIndex, types[totalQuestionIndex].two);
    } else {
      // if the user type other letters ... for exceptional situation
    }

    // when all the questions of this part was done
    if (index && index % 9 === 8) {
      const typeArr = [types[totalQuestionIndex].one, types[totalQuestionIndex].two];
      const selectedMsg = getSelectedMsg(users, userId, totalQuestionIndex, typeArr);

      users = updateResult(users, userId, totalQuestionIndex, typeArr);

      users.get(userId).totalQuestionIndex++;

      const responseBody = {
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: selectedMsg,
              },
            },
          ],
          quickReplies: [
            {
              messageText: startUtterances[users.get(userId).totalQuestionIndex],
              action: "block",
              blockId: blockIds[++users.get(userId).index],
              label: startUtterances[users.get(userId).totalQuestionIndex],
            },
          ],
        },
      };

      res.status(200).json(responseBody);
    } else {
      users.get(userId).index++;

      const responseBody = createResponseBody(questions, users.get(userId).index);
      res.status(200).json(responseBody);
    }
  }
});

apiRouter.get("/result", function (req, res, next) {
  const type = req.query.type;
  const scores = req.query.scores;
  console.log(type, scores);
  res.send({ type, scores });
});

module.exports = apiRouter;
