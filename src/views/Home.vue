<template>
  <div class="home">
    <h1 class="main-title">Zachorowania na covid-19 w Polsce</h1>
    <div class="chart"><p>chart.js</p></div>
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
            <select v-model="fromDate">
              <option
                v-for="date in dateOptions"
                :key="date._id"
                :value="date"
                >{{ date }}</option
              >
            </select>
          </div>
          <div class="toDate">
            <p>od:</p>
            <select v-model="toDate">
              <option
                v-for="date in dateOptions"
                :key="date._id"
                :value="date"
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
        { id: 0, label: "dolnośląskie" },
        { id: 1, label: "kujawsko-pomorskie" },
        { id: 2, label: "lubelskie" },
        { id: 3, label: "lubuskie" },
        { id: 4, label: "łódzkie" },
        { id: 5, label: "małopolskie" },
        { id: 6, label: "mazowieckie" },
        { id: 7, label: "opolskie" },
        { id: 8, label: "podkarpackie" },
        { id: 9, label: "podlaskie" },
        { id: 10, label: "pomorskie" },
        { id: 11, label: "śląskie" },
        { id: 12, label: "świętokrzyskie" },
        { id: 13, label: "warmińsko-mazurskie" },
        { id: 14, label: "wielkopolskie" },
        { id: 15, label: "zachodniopomorskie" },
        { id: 16, label: "cała Polska" },
        { id: 17, label: "cały świat" },
      ],
      item: {
        option: [],
      },
      fromDate: "",
      toDate: "",
      mainData: [],
      dateOptions: [],
    };
  },
  methods: {
    logger: function() {
      console.log(this.item.option);

      console.log("ej");

      console.log(this.mainData);

      console.log(this.fromDate);
      console.log(this.toDate);
    },
  },
  mounted() {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        this.mainData = data;
        data.forEach((el) => {
          if (
            this.dateOptions.includes(
              el.dzien + "." + el.miesiac + "." + el.rok
            ) == false
          ) {
            console.log(el.dzien + "." + el.miesiac + "." + el.rok);
            this.dateOptions.push(el.dzien + "." + el.miesiac + "." + el.rok);
          }
        });
      });
  },
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
  justify-content: center;
  align-items: center;
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
