<script setup>
import { computed, onMounted } from 'vue';
import { moviesService } from '../services/MoviesService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import MovieCard from '../components/MovieCard.vue';
import SearchBar from '../components/SearchBar.vue';

const movies = computed(()=>AppState.movies) // we want to compute this so once we change the array, it still retains reference to our AppState

onMounted(()=>{
 discoverMovies()
})

async function discoverMovies(){
  try {
    await moviesService.discoverMovies()
  }
  catch (error){
    Pop.toast("Could not discover Movies", 'error');
    console.error(error)
  }
}

async function changePage(pageNumber){
  try {
    // await moviesService.changePage(pageNumber)
    await moviesService.getMoviesV2(`discover/movie?page=${pageNumber}`)
  } catch (error) {
    Pop.toast("Could not change page", 'error')
    console.error(error)
  }
}

async function changeSearchPage(pageNumber){
  try {
    await moviesService.getMoviesV2(`search/movie?page=${pageNumber}&query=${AppState.searchTerm}`)
  } catch (error) {
    Pop.toast("Could not change search page", 'error')
    console.error(error);
  }
}

</script>

<template>
<!-- Movie time! -->
<!-- {{ movies }} -->

<div class="container-fluid">

  <section class="row my-2">
    <SearchBar/>
  </section>

  <section v-if="!AppState.searchTerm" class="row my-2">
    <div class="col-4">
      <button :disabled="AppState.currentPage == 1" class="btn btn-primary w-100" @click="changePage(AppState.currentPage - 1)" >Previous Page</button>
    </div>
    <div class="col-4 text-center">Page {{AppState.currentPage}} of {{ AppState.totalPages }}</div>
    <div class="col-4">
      <button :disabled="AppState.currentPage == AppState.totalPages" class="btn btn-primary w-100" @click="changePage(AppState.currentPage + 1)">Next Page</button>
    </div>
  </section>

  <section v-else class="row my-2">
    <div class="col-4">
      <button :disabled="AppState.currentPage == 1" class="btn btn-info w-100" @click="changeSearchPage(AppState.currentPage - 1)" >Previous Page</button>
    </div>
    <div class="col-4 text-center">Page {{AppState.currentPage}} of {{ AppState.totalPages }}</div>
    <div class="col-4">
      <button :disabled="AppState.currentPage == AppState.totalPages" class="btn btn-info w-100" @click="changeSearchPage(AppState.currentPage + 1)">Next Page</button>
    </div>
  </section>

  <section class="row g-3">

    <!-- NOTE replaced by the movie card component and it's props -->
    <!-- <div v-for="movie in movies" :key="movie.id" class="col-3">
      <img :src="movie.poster" class="img-fluid" alt="">
      <h6>{{ movie.title }}</h6>
    </div> -->

    <!-- NOTE v-for, copies the MovieCard "for" each movie in the movies array -->
    <!-- NOTE :key="movie.id" helps vue keep track of the element in the DOM -->
    <!-- NOTE the :movie="movie" passes the single movie objects data to, the MovieCard, through a "defined property" on the MovieCard -->
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" class="col-6 col-md-3 pb-2"/>

  </section>
</div>


</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
