<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Movie } from '../models/Movie.js';
// const movies = computed(()=> AppState.movies) I can't import my movies array cause this doesn't tell me WHICH movie to display

// defineProps({banana: String})
defineProps({movie: Movie}) // Props work like our arguments and parameters. It lets us take data in from a parent component (like the homepage) and render that data in the template


</script>


<template>
  <RouterLink :to="{name: 'Movie Details', params: {movieId: movie.id}}" class="selectable">
    <!-- <div class="col-6 col-md-3 pb-2"> replaced with routerlink -->
      <!-- 🧈 used to help us decipher what was from the component while we built it -->
    <img :src="movie.poster" class="img-fluid" alt="">
    <h6 class="mt-1">{{movie.title}}</h6>
    <div v-if="movie.voteAverage > 0">
      <i v-for="point in Math.floor(movie.voteAverage)" :key="point" class="mdi mdi-star text-info"></i>
      <span
      :class="{
        'text-success': movie.voteAverage <= 10,
         'text-warning' : movie.voteAverage < 6,
         'text-danger': movie.voteAverage < 5
        }">{{ movie.voteAverage }}</span>
    </div>
    <div v-else class="text-info"> <i class="mdi mdi-star-outline"></i> Not yet rated</div>
  <!-- </div> -->
</RouterLink>
</template>


<style lang="scss" scoped>

</style>
