<script setup>
import { computed, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { moviesService } from '../services/MoviesService.js';
import { AppState } from '../AppState.js';

const searchQuery = ref('') // what the user WILL search in the bar

const searchTerm = computed(()=>AppState.searchTerm) // what the user HAS searched, and showing results of

async function searchMovies(){
  try {
    console.log('searching', searchQuery.value);
    await moviesService.searchMovies(searchQuery.value)
    searchQuery.value = ''
  } catch (error) {
    Pop.toast("Could not search", 'error')
    console.error(error);
  }
}

async function clearSearch(){
  try {
    await moviesService.clearSearch()
  } catch (error) {
    Pop.toast("Could not re-discover Movies", 'error')
    console.error(error);
  }
}

</script>


<template>
 <form @submit.prevent="searchMovies()">
  <div class="input-group">
    <input v-model="searchQuery" type="text" class="form-control" placeholder="search for movies..." id="search-input">
    <button class="btn btn-info w-25">search <i class="mdi mdi-magnify"></i></button>
  </div>
 </form>
 <div class="mt-1" v-if="searchTerm">
   <div @click="clearSearch" role="button" class="btn btn-outline-info rounded-pill" title="clear search results">{{ searchTerm }} <i class="mdi mdi-close"></i> </div>
  </div>
</template>


<style lang="scss" scoped>

</style>
