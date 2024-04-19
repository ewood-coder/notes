<script setup>
import { Artwork } from '../models/Artwork.js';

defineProps({
  artWork: Artwork
})

</script>


<template>
  <div class="mb-3">
    <img class="rounded shadow" :src="artWork.smallImg" :alt="artWork.slug">
  </div>
</template>


<style scoped>
img {
  width: 100%;
}
</style>