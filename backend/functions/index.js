const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const cheerio = require("cheerio");
const getUrls = require("get-urls");
const fetch = require("node-fetch");
const { request, response } = require("express");
console.log("dzialam");

const scrapeMetatags = async () => {
  const res = await fetch(
    "https://news.google.com/covid19/map?hl=pl&gl=PL&ceid=PL%3Apl&mid=%2Fm%2F05qhw"
  );
  const html = await res.text();
  const $ = cheerio.load(html);

  requests = [];

  for (i = 1; i <= 18; i++) {
    requests.push({
      nazwa: $(`.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(1)`).text(),
      potwierdzone: $(
        `.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(2)`
      ).text(),
      przypadkiNaMln: $(
        `.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(3)`
      ).text(),
      ozdrowienia: $(
        `.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(4)`
      ).text(),
      zgony: $(`.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(5)`).text(),
    });
  }

  return requests;
};
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
var requestOptions = {
  method: "GET",
  redirect: "follow",
};
exports.scraper = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const data = await scrapeMetatags();
    response.send(JSON.stringify(data, getCircularReplacer()));
    JSON.stringify(data.data, getCircularReplacer());
  });
});
