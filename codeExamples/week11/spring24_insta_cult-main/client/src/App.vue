<script setup>
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'


</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 💀 by CultWorks
  </footer>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";
@import url('https://fonts.googleapis.com/css2?family=Megrim&display=swap');


:root {
  --main-height: calc(100vh - 32px - 64px);
  --dark-gray: #1A1919;
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

* {
  font-family: "Megrim", system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>
