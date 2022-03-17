#! /usr/bin/env node
const path = require("path");
const minimist = require("minimist");
const fs = require("fs");

const App = require("./src/app.js");

const argv = minimist(process.argv.slice(2));

if (argv.length < 2) {
  console.error("변수를 올바르게 넣어주세요.");
  process.exit(1); //an error occurred
}

const solutionPath = path.resolve(process.cwd(), argv.sol);
const solutionFile = fs.readFileSync(solutionPath, {
  encoding: "utf-8",
  flag: "r",
});

const [regexSearchFirstResult] = solutionFile.match(
  /(?<=const)( \w+)|(?<=function)( \w+)/g
);

const filename = `bojtest${parseInt(Math.random() * 100000000000)}`;
const exportedSolutionPath = path.resolve(process.cwd(), `${filename}.js`);
fs.writeFileSync(
  exportedSolutionPath,
  `${solutionFile} \n module.exports =${regexSearchFirstResult}`
);
import(exportedSolutionPath).then((solutionFunc) => {
  App(argv.boj, solutionFunc.default, () => {
    fs.unlinkSync(path.resolve(process.cwd(), `${filename}.js`));
  });
});
