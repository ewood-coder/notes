<script setup>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

const appState = computed(() => AppState)

// let counter = 0 if i need a piece of data that is responsive on the page
let counter = ref(0) // ref holds single value and makes the "reactive"

function countUp(){
  console.log('counting');
  counter.value++ // the access counter in the script, you need to access the VALUE of counter
}

</script>

<template>
  <header class="bg-dark text-light text-center py-2">
    <h1> RPS Quest! ⚔️</h1>
  </header>
  <main class="container-fluid">
    <!-- SECTION demo Counter -->
    <section class="row">
      <div class="col-4">
        <div class="card fs-5">
          <!-- To access the value of counter in the template, you need just the variable -->
          Clicks {{ counter }}
          <button class="btn btn-primary" @click="countUp()">+</button>
        </div>
      </div>
    </section>
    <router-view/>
  </main>
   <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
    <button @click="countUp()"></button>
  </footer>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
