const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const cheerio = require("cheerio");
const getUrls = require("get-urls");
const fetch = require("node-fetch");
console.log("dzialam");

let date = new Date();

const getTime = (date) => {
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};
let requests = [];

const scrapeMetatags = async () => {
  const res = await fetch(
    "https://news.google.com/covid19/map?hl=pl&gl=PL&ceid=PL%3Apl&mid=%2Fm%2F05qhw"
  );
  const html = await res.text();
  const $ = cheerio.load(html);
  console.log("update");

  requests = [];
  for (i = 1; i <= 18; i++) {
    requests.push({
      nazwa:
        $(`.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(1)`)
          .text()
          .split(" ")[0] == "Województwo" ||
        $(`.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(1)`)
          .text()
          .split(" ")[0] == "województwo"
          ? $(`.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(1)`)
              .text()
              .split(" ")
              .slice(1)
              .join("")
          : $(`.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(1)`).text(),
      potwierdzone: $(`.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(2)`)
        .text()
        .replace(/\s/g, ""),
      przypadkiNaMln: $(`.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(3)`)
        .text()
        .replace(/\s/g, ""),
      ozdrowienia: $(`.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(4)`)
        .text()
        .replace(/\s/g, ""),
      zgony: $(`.ppcUXd > tr:nth-child(${i}) > .l3HOY:nth-child(5)`)
        .text()
        .replace(/\s/g, ""),
      czas: getTime(new Date()),
    });
  }
};
scrapeMetatags();
setInterval(scrapeMetatags, 1800 * 1000);

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
    response.send(JSON.stringify(requests, getCircularReplacer()));
  });
});
