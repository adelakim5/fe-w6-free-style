const { questions, answers, breakMsg, blockIds } = require("./qna.js");

const types = [
  { one: "E", two: "I" },
  { one: "S", two: "N" },
  { one: "T", two: "F" },
  { one: "J", two: "P" },
];

const initScore = {
  0: { E: 0, I: 0 },
  1: { S: 0, N: 0 },
  2: { T: 0, F: 0 },
  3: { J: 0, P: 0 },
  result: [],
  index: 0,
  totalQuestionIndex: 0,
};

const addScore = (map, key, questionNumber, type) => {
  const currVal = map.get(key);
  ++currVal[`${questionNumber}`][type];
  map.set(key, currVal);
  return map;
};

const getSelectedMsg = (map, key, questionNumber, types) => {
  const currVal = map.get(key);
  let result = null;
  if (currVal[`${questionNumber}`][types[0]] > currVal[`${questionNumber}`][types[1]]) {
    result = breakMsg[types[0]];
  } else {
    result = breakMsg[types[1]];
  }
  return result;
};

const updateResult = (map, key, questionNumber, types) => {
  const currVal = map.get(key);
  if (currVal[`${questionNumber}`][types[0]] > currVal[`${questionNumber}`][types[1]]) {
    currVal.result.push(types[0]);
  } else {
    currVal.result.push(types[1]);
  }
  map.set(key, currVal);
  return map;
};

const registerNewUser = (map, key) => {
  if (map.has(key)) map = deleteUser(map, key);
  const newInitValue = JSON.parse(JSON.stringify(initScore));
  // map.set(key, newInitValue);
  map.set(key, newInitValue);
  return map;
};

const deleteUser = (map, key) => {
  map.delete(key);
  return map;
};

const createResponseBody = (questions, index) => {
  if (index < questions.length) {
    return {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: questions[index],
            },
          },
        ],
        quickReplies: [
          {
            messageText: answers[index].one,
            action: "block",
            blockId: blockIds[index],
            label: answers[index].one,
          },
          {
            messageText: answers[index].two,
            action: "block",
            blockId: blockIds[index],
            label: answers[index].two,
          },
        ],
      },
    };
  }
};

module.exports = { deleteUser, updateResult, types, initScore, addScore, getSelectedMsg, registerNewUser, createResponseBody };
