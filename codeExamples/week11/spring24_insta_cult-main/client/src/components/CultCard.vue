<script setup>
import { Cult } from '../models/Cult.js';
import ProfileImageCircle from './ProfileImageCircle.vue';

defineProps({
  cult: { type: Cult, required: true }
})
</script>


<template>
  <div class="cult-card">
    <div class="d-flex align-items-center gap-3 p-4">
      <ProfileImageCircle :profile="cult.leader" />
      <p class="fs-2 mb-0">{{ cult.leader.name }}</p>
    </div>
    <img :src="cult.coverImg" :alt="cult.name" class="cult-img">
    <div class="p-4">
      <p class="fs-3">{{ cult.name }}</p>
      <p>{{ cult.description }}</p>
      <div class="text-end">
        <RouterLink :to="{ name: 'Cult Details', params: { cultId: cult.id } }">
          <button class="btn btn-danger">See More</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped>
.cult-card {
  background-color: #3F3B3B;
}

.cult-img {
  width: 100%;
  height: 40vh;
  object-fit: cover;
}
</style>