const https = require("https");

const parse = (url) => {
  return new Promise((resolve) => {
    https
      .request(url, async (res) => {
        let body = [];
        res.on("data", (chunk) => body.push(chunk));
        res.on("end", () => resolve(Buffer.concat(body).toString()));
      })
      .end();
  });
};

module.exports = parse;
