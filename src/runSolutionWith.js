const displayMessage = (type, userAnswer, testAnswer) => {
  if (type === true) {
    console.log("[정답]");
    console.log(`예상 결과 : ${testAnswer}`);
    console.log(`유저 결과 : ${userAnswer}`);
  } else {
    console.log("[오답]");
    console.log(`예상 결과 : ${testAnswer}`);
    console.log(`유저 결과 : ${userAnswer}`);
  }
};

const isEqualArray = (userAnswer, testCaseAnswer) => {
  if (userAnswer.length != testCaseAnswer.length) return false;
  for (var i = 0; i < testCaseAnswer.length; i++) {
    if (userAnswer[i] instanceof Array && testCaseAnswer[i] instanceof Array) {
      if (!isEqualArray(userAnswer[i], testCaseAnswer[i])) return false;
    } else if (userAnswer[i] != testCaseAnswer[i]) {
      return false;
    }
  }
  return true;
};

const checkSolution = (userAnswer, testCaseAnswer) => {
  switch (typeof userAnswer) {
    case "string":
      return userAnswer == testCaseAnswer;
    case "number":
      return userAnswer == testCaseAnswer;
    case "boolean":
      return userAnswer == testCaseAnswer;
    case "object": {
      if (userAnswer == null && testCaseAnswer == "null") return true;
      else if (Array.isArray(userAnswer) && Array.isArray(testCaseAnswer)) {
        return isEqualArray(userAnswer, testCaseAnswer);
      } else {
        return JSON.stringify(userAnswer) == JSON.stringify(testCaseAnswer);
      }
    }
    default:
      return false;
  }
};

const runSolutionWith = (solutionFunc, testCase, testCaseAnswer) => {
  try {
    const userAnswer = solutionFunc(testCase);
    if (checkSolution(userAnswer, testCaseAnswer))
      displayMessage(true, userAnswer, testCaseAnswer);
    else displayMessage(false, userAnswer, testCaseAnswer);
    return true;
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = runSolutionWith;
