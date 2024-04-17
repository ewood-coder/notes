<script setup>
import { computed, onMounted, watch } from 'vue';
import { artworksService } from '../services/ArtworksService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import ArtworkCard from '../components/ArtworkCard.vue';
import { useRoute } from 'vue-router';


const artworks = computed(() => AppState.artworks)

const page = computed(() => AppState.page)

const totalPages = computed(() => AppState.totalPages)

const route = useRoute()

async function getArtworksV2() {
  try {
    const page = route.query.page
    // @ts-ignore
    await artworksService.getArtworksV2(page)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getArtworks() {
  try {
    await artworksService.getArtworks()
  }
  catch (error) {
    Pop.error(error);
  }
}

async function changePage() {
  try {
    const page = route.query.page
    console.log('changing page!', page);
    await artworksService.changePage(page)
  }
  catch (error) {
    Pop.error(error);
  }
}


// onMounted(() => {
//   getArtworks()
// })


// watch(route,
//   () => {
//     if (route.query.page) {
//       changePage()
//     }
//     else {
//       getArtworks()
//     }
//   },
//   { immediate: true })

// NOTE watch is a function that will watch a value (must be a ref, computed, reactive, or arrow function)
// NOTE first argument is what you are watching for changes
// NOTE second argument is the function to run when the watched value changes
// NOTE third argument says to run our second argument on page load 
watch(route, () => {
  getArtworksV2()
}, { immediate: true })

</script>

<template>
  <div class="container">

    <section class="row mt-3">
      <div class="col-12 d-flex justify-content-center align-items-center">

        <RouterLink v-if="page > 1" :to="{ query: { page: page - 1 } }">
          <button class="btn btn-outline-dark">Previous</button>
        </RouterLink>
        <button v-else disabled class="btn btn-outline-dark">Previous</button>

        <p class="mx-3 mb-0">{{ page }} of {{ totalPages }}</p>

        <RouterLink v-if="page < totalPages" :to="{ query: { page: page + 1 } }">
          <button class="btn btn-outline-dark">Next</button>
        </RouterLink>
        <button v-else disabled class="btn btn-outline-dark">Next</button>
      </div>
    </section>

    <section class="row my-4">
      <div class="col-12 masonry">
        <div v-for="art in artworks" :key="art.id">
          <ArtworkCard :artWork="art" />
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped lang="scss">
.masonry {
  columns: 300px;
  column-gap: 1rem;
}
</style>
