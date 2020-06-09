<template>
  <div class="home">
    <h1 class="main-title">Zachorowania na covid-19 w Polsce</h1>
    <div class="chart"><p>chart.js</p></div>
    <div class="options">
      <div class="legend">
        <p>Województwo:</p>
        <p>Zakres czasowy:</p>
      </div>
      <div class="options-grid">
        <div class="place-options">
          <div v-for="option in options" :key="option.id">
            <label>{{ option.label }}</label>
            <input
              type="checkbox"
              v-model="item.option"
              :id="'category_' + option.id"
              :value="option.label"
              @change="logger"
            />
          </div>
        </div>
        <div class="time-options"></div>
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
    };
  },
  methods: {
    logger: function() {
      console.log(this.item.option);
    },
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
  padding: 1rem 0 1rem 0;
}
.options-grid {
  display: flex;
  .place-options {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    div {
      margin: 0.3rem;
      margin-left: 0;
    }
  }
  .time-options {
    display: flex;
    width: 20%;
  }
}
</style>
