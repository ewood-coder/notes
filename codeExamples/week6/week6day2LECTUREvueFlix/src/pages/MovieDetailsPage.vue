<script setup>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import Pop from '../utils/Pop.js';
import { moviesService } from '../services/MoviesService.js';

const route = useRoute()

const activeMovie = computed(()=> AppState.activeMovie)

const movieProfit = computed(()=> AppState.activeMovie?.revenue - AppState.activeMovie?.budget)


async function getMovieById(){
  try {
    await moviesService.getMovieById(route.params.movieId)
  } catch (error) {
    Pop.toast("Could not get Movie Details", 'error')
    console.error(error);
  }
}

onMounted(()=>{
  getMovieById()
})

onUnmounted(()=>{
  //clear active movie
})


</script>


<template>
  <!-- NOTE the v-if at the top, keeps the template from trying to load the movie details, before the network request is done "cannot read properties of null reading ..." -->
  <div class="component" v-if="activeMovie">
    <!-- This is the movie Details Page! {{ route.params.movieId }} -->

    <img class="img-fluid" :src="activeMovie.backdrop" alt="">
    <h1 class="text-center">{{ activeMovie.title }}</h1>
    <hr/>
    <h2>{{ activeMovie.tagline }}</h2>
    <h5 class="my-2">
      <span v-for="genre in activeMovie.genres" :key="genre" class="border border-primary text-primary rounded-pill p-1 px-3">{{ genre }}</span>
    </h5>
    <h3>{{ activeMovie.releaseDate.toDateString() }}</h3>
    <h4><i class="mdi mdi-cash text-success fs-3"></i>${{ movieProfit.toLocaleString() }}</h4>
    <p>{{ activeMovie.overview }}</p>
    <p>{{ activeMovie.voteAverage }}</p>
    <h5 class="my-2">
      <span v-for="company in activeMovie.productionCompanies" :key="company" class="border border-success text-success rounded-pill p-1 px-3">{{ company }}</span>
    </h5>


  </div>
  <div class="fs-2 text-center text-info mt-2" v-else>
    loading <i class="mdi mdi-loading mdi-spin"></i>
  </div>
</template>


<style lang="scss" scoped>
.component{

}

</style>
