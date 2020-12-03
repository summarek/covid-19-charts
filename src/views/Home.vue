<template>
  <div class="home">
    <h1 class="main-title">Zachorowania na covid-19 w Polsce</h1>
    <div class="chart">
      <canvas id="myChart"></canvas>
      <div class="radioOptions">
        <div v-for="option in radioChoice" :key="option.id">
          <label class="container"
            >{{ option.label }}
            <input
              type="radio"
              v-model="radio.option"
              :id="'category_' + option.id"
              :value="option.label"
              @change="logger"
            />
            <span class="checkmark radioOption"></span>
          </label>
        </div>
      </div>
    </div>
    <div class="options">
      <div class="legend">
        <p>Lokalizacje:</p>
        <p id="time-legend">Zakres czasowy:</p>
      </div>
      <div class="options-grid">
        <div class="place-options">
          <div v-for="option in options" :key="option.id">
            <label class="container"
              >{{ option.label }}
              <input
                type="checkbox"
                v-model="item.option"
                :id="'category_' + option.id"
                :value="option.label"
                @change="logger"
              />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div class="time-options">
          <div class="fromDate">
            <p>od:</p>
            <select @change="logger" v-model="fromDate">
              <option
                v-for="(date, index) in dateOptions"
                :key="date._id"
                :value="index"
                >{{ date }}</option
              >
            </select>
          </div>

          <div class="toDate">
            <p>do:</p>
            <select @change="logger" v-model="toDate">
              <option
                v-for="(date, index) in dateOptions"
                :key="date._id"
                :value="index"
                >{{ date }}</option
              >
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data: function() {
    return {
      options: [
        { id: 0, label: "dolnośląskie", color: "#123456" },
        { id: 1, label: "kujawsko-pomorskie", color: "#123456" },
        { id: 2, label: "lubelskie", color: "#123456" },
        { id: 3, label: "lubuskie", color: "#123456" },
        { id: 4, label: "łódzkie", color: "#123456" },
        { id: 5, label: "małopolskie", color: "#123456" },
        { id: 6, label: "mazowieckie", color: "#123456" },
        { id: 7, label: "opolskie", color: "#123456" },
        { id: 8, label: "podkarpackie", color: "#123456" },
        { id: 9, label: "podlaskie", color: "#123456" },
        { id: 10, label: "pomorskie", color: "#123456" },
        { id: 11, label: "śląskie", color: "#123456" },
        { id: 12, label: "świętokrzyskie", color: "#123456" },
        { id: 13, label: "warmińsko-mazurskie", color: "#123456" },
        { id: 14, label: "wielkopolskie", color: "#123456" },
        { id: 15, label: "zachodniopomorskie", color: "#123456" },
        { id: 16, label: "polska", color: "#123456" },
        { id: 17, label: "cały świat", color: "#123456" },
      ],
      item: {
        option: [],
      },
      fromDate: 0,
      toDate: 0,
      mainData: [],
      dateOptions: [],
      radioChoice: [
        { id: 0, label: "potwierdzone" },
        { id: 1, label: "zgony" },
      ],
      radio: {
        option: "potwierdzone",
      },
      massPopChart: {},
      stTime: 0,
    };
  },
  methods: {
    logger: function() {
      this.updateChart();
    },
    updateChart: function(dataSets, labels, strings) {
      let globalLabels = this.dateOptions.slice(this.fromDate, this.toDate + 1);

      let datasetsArray = [];
      let tempArr = [];

      this.mainData.map((element) => {
        if (this.item.option.includes(element.place.toLowerCase())) {
          globalLabels.forEach((el) => {
            if (
              el ==
              element.dzien + "." + element.miesiac + "." + element.rok
            ) {
              tempArr.push(element);
            }
          });
        }
      });

      var helpme = [];
      tempArr.forEach((el, index) => {
        helpme[index] = tempArr
          .map((element) =>
            element.place.toLowerCase() == el.place.toLowerCase()
              ? element[this.radio.option]
              : null
          )
          .filter((el) => el != null);
        helpme[index].push(el.place);
      });
      // console.log(helpme);
      function compareNumbers(a, b) {
        return a - b;
      }
      for (let i = 0; i < this.item.option.length; i++) {
        datasetsArray.push({
          label: helpme[i][helpme[i].length - 1],
          data: helpme[i].slice(0, helpme.length).sort(compareNumbers),
          borderWidth: 2,
          borderColor: this.options.filter(function(e) {
            return (
              e.label.toLowerCase() ==
              helpme[i][helpme[i].length - 1].toLowerCase()
            );
          })[0].color,
          hoverBorderWidth: 3,
          hoverBorderColor: "#fff",
          fill: false,
        });
      }

      let myChart = document.getElementById("myChart").getContext("2d");
      // Global Options
      Chart.defaults.global.defaultFontFamily = "poppins";
      Chart.defaults.global.defaultFontSize = 18;
      Chart.defaults.global.defaultFontColor = "#eee";

      if (this.stTime == 0) {
        this.stTime = 1;
        this.massPopChart = new Chart(myChart, {
          type: "line", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
          data: {
            labels: globalLabels,
            datasets: datasetsArray,
          },
          options: {
            responsive: true,
            fill: false,
            title: {
              display: true,
              text: this.radio.option,
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "right",
              labels: {
                fontColor: "#fff",
              },
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
              },
            },
            tooltips: {
              enabled: true,
            },
          },
        });
      } else {
        this.massPopChart.destroy();
        this.massPopChart = new Chart(myChart, {
          type: "line", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
          data: {
            labels: globalLabels,
            datasets: datasetsArray,
          },
          options: {
            responsive: true,
            fill: false,
            title: {
              display: true,
              text: this.radio.option,
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "bottom",
              labels: {
                fontColor: "#fff",
              },
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
              },
            },
            tooltips: {
              enabled: true,
            },
          },
        });
        //redraw the chart
      }
      console.log(datasetsArray);
    },
  },
  mounted() {

    var dataJson = require('../data.json')
    console.log(dataJson);

    this.options.forEach((el) => {
      el.color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    });
    
        this.mainData = dataJson;
        dataJson.forEach((el) => {
          if (
            this.dateOptions.includes(
              el.dzien + "." + el.miesiac + "." + el.rok
            ) == false
          ) {
            //console.log(el.dzien + "." + el.miesiac + "." + el.rok);
            this.dateOptions.push(el.dzien + "." + el.miesiac + "." + el.rok);
          }
        });
        this.toDate = this.dateOptions.length - 1;

        console.log(this.dateOptions.indexOf("2.6.2020"));
        this.dateOptions[5] = ["31.5.2020", this.dateOptions[5], "2.6.2020"];
        this.dateOptions[18] = [];
        this.dateOptions[19] = [];
        this.dateOptions = this.dateOptions.flat();

        this.updateChart();
  }
};
</script>
<style lang="scss" scoped>
$mainText: #ffb800;
$bgColor: #212121;
$btnBg: #4f4e4e;
$fontSize: 32;
.main-title {
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  padding: 1rem 0 1rem 0;
}
.chart {
  background-color: $btnBg;
  height: 60vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  @media (min-width: 1300px) {
    flex-direction: initial;
  }
}

#myChart {
  max-width: 1019px;
  max-height: 509px;
  @media (max-width: 768px) {
    max-width: 100% !important;
    max-height: 100% !important;
  }
}
.legend {
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  padding: 1rem 0 1rem 0;
  #time-legend {
    min-width: 20%;
  }
}
.options-grid {
  display: flex;
  .place-options {
    display: grid;
    grid-gap: 14px;
    width: 80%;
    grid-template-columns: repeat(auto-fill, 200px);

    div:last-child,
    :nth-last-child(2) {
      font-weight: 500;
    }
  }
  .time-options {
    display: flex;
    // align-items: center;
    // justify-content: center;
    flex-direction: column;
    min-width: 25%;
    @media (max-width: 568px) {
      min-width: 40%;
    }
    div {
      width: 100%;
      display: flex;
      margin: 1rem 1rem 1rem 0;
      select {
        padding: 0.3rem;
        width: 60%;
        margin-left: 20px;
        border: none;
        background-color: $btnBg;
      }
    }
  }
}

//checkbox style
.container {
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  margin-left: 5px;
  height: 25px;
  width: 25px;
  background-color: $btnBg;
  transition: all 0.3s ease;
}
.radioOption {
  background-color: #212121;
}
.container input:checked ~ .radioOption {
  background-color: #212121 !important;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: $btnBg;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  transition: all 1s ease;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
  transition: all 1s ease;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  transition: all 1s ease;

  left: 9px;
  top: 0px;
  width: 5px;
  height: 20px;
  border: solid $mainText;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
