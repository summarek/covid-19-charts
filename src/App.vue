<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">O projekcie</router-link>
      </div>
      <a id="me" target="blank" href="https://github.com/summarek"
        >robert skrzyniecki <br />
        Projekt na praktyki zadodowe 2020</a
      >
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
//Zmienne scss
$mainText: #ffb800;
$bgColor: #212121;
$btnBg: #4f4e4e;
$fontSize: 32;

@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: $mainText;
  font-family: "Poppins", sans-serif;

  outline: none;
  a {
    text-decoration: none;
    position: relative;
  }
}
body {
  background-color: $bgColor;
  padding: 1rem;
}
#nav {
  display: flex;
  justify-content: space-between;
  #me {
    font-weight: 200;
    text-align: right;
  }
}

//link animacja
a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  bottom: 0;
  left: 0;
  background: $mainText;
  visibility: hidden;
  border-radius: 0px;
  transform: scaleX(0);
  transition: 0.25s linear;
}
a:hover:before {
  visibility: visible;
  transform: scaleX(1);
}
</style>
