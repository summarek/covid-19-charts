var express = require("express");
var cors = require("cors");

var app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios").default;
require("dotenv").config();

const url = process.env.url;
app.use(cors());
const getTime = (date) => {
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("error", (err) => {
  console.log(err);
});

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected:", url);
});
db.on("error", (err) => {
  console.error("connection error:", err);
});

const dataSet = mongoose.Schema({
  place: { type: String },
  potwierdzone: {},
  przypadkiNaMln: {},
  ozdrowienia: {},
  zgony: {},

  minuta: { type: Number },
  godzina: { type: Number },
  dzien: { type: Number },
  miesiac: { type: Number },
  rok: { type: Number },
});

let Set = mongoose.model("dataSet", dataSet);

axios
  .get("http://localhost:5001/projekt-praktyki-9108b/us-central1/scraper")
  .then(function(response) {
    //console.log(response.data);
    response.data.forEach(async (el, index) => {
      console.log(index);

      Set.updateOne(
        {
          place: el.nazwa,
          dzien: el.czas.day,
          miesiac: el.czas.month,
          rok: el.czas.year,
        },
        {
          potwierdzone: el.potwierdzone,
          przypadkiNaMln: el.przypadkiNaMln,
          ozdrowienia: el.ozdrowienia,
          zgony: el.zgony,
        },
        { upsert: true },

        function(err) {
          console.log(err);
        }
      );
    });
  })
  .catch(function(error) {
    if (error) {
      console.log(error);
    }
  });

setInterval(() => {
  axios
    .get("http://localhost:5001/projekt-praktyki-9108b/us-central1/scraper")
    .then(function(response) {
      //console.log(response.data);
      response.data.forEach(async (el, index) => {
        Set.updateOne(
          {
            place: el.nazwa,
            dzien: el.czas.day,
            miesiac: el.czas.month,
            rok: el.czas.year,
          },
          {
            potwierdzone: el.potwierdzone,
            przypadkiNaMln: el.przypadkiNaMln,
            ozdrowienia: el.ozdrowienia,
            zgony: el.zgony,
          },
          { upsert: true },

          function(err) {
            console.log(err);
          }
        );
      });
    })
    .catch(function(error) {
      if (error) {
        console.log(error);
      }
    });
}, 1800 * 1000);

app.get("/", function(req, res) {
  Set.find({}, async function(err, doc) {
    await res.send(doc);
  });
});

app.listen(3000);

// Author.updateOne(
//   { authorNicknameId: 0 },
//   {},
//   { upsert: true },

//   function (err) {
//     // console.log(err);
//   }
// );
