<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class=" p-2 d-flex bg-info text-dark">
    Made by REAL people at TOWER
    <div class="">
      <i><i class=" m-2 mdi mdi-facebook"></i></i><i><i class="m-2 mdi mdi-instagram"></i></i><i><i
          class="m-2 mdi mdi-linkedin"></i></i>

    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
