<script setup>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { cultsService } from '../services/CultsService.js';
import { AppState } from '../AppState.js';


const cults = computed(() => AppState.cults)

async function getCults() {
  try {
    await cultsService.getCults()
  } catch (error) {
    Pop.error(error)
  }
}


onMounted(() => {
  getCults()
})

</script>


<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1 class="m-5">Cults Near You</h1>
      </div>
    </section>

    <section class="row justify-content-center">
      <div v-for="cult in cults" :key="cult.id" class="col-12 col-md-7 mb-4">
        <CultCard :cult="cult" />
      </div>
    </section>
  </div>
</template>


<style scoped>
.container-fluid {
  min-height: var(--main-height);
  background-color: var(--dark-gray);
}

h1 {
  border-top: 1px solid white;
  max-width: fit-content;
}
</style>