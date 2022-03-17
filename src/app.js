const { JSDOM } = require("jsdom");
const parse = require("./problemParser.js");
const runSolutionWith = require("./runSolutionWith.js");

const App = async (url, solutionFunc, callback) => {
  const Page = await parse(`https://www.acmicpc.net/problem/${url}`);
  const $DOM = new JSDOM(Page);

  const findInputsBy = (targetString) => {
    return [...$DOM.window.document.querySelectorAll("section")].filter((e) =>
      e.id.includes(targetString)
    );
  };
  const spiltCases = ($domArr) =>
    $domArr.map(($input) =>
      $input.querySelector(".sampledata").innerHTML.trim().split(/[\n]+/g)
    );
  const $sampleInputs = findInputsBy("sampleinput");
  const $sampleOutputs = findInputsBy("sampleoutput");

  const testCases = spiltCases($sampleInputs);
  const testCaseAnswers = spiltCases($sampleOutputs);

  const run = async () => {
    for (const [i, testCase] of testCases.entries()) {
      console.log(`문제 ${i + 1}`);
      console.log(`====================`);
      await runSolutionWith(solutionFunc, testCase, testCaseAnswers[i]);
      console.log(`====================`);
    }
  };
  (async () => await run())().then(() => {
    callback();
  });
};

module.exports = App;
