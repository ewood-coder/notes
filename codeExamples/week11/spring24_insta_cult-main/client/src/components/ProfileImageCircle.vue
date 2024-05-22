<script setup>
import { Cultist } from '../models/Cultist.js';
import { Profile } from '../models/Profile.js';

defineProps({
  // NOTE type for profile prop can be a Profile or a Cultist
  profile: { type: [Profile, Cultist], required: true }
})
</script>


<template>
  <img :src="profile.picture" :alt="profile.name" class="profile-picture" :title="profile.name">
</template>


<style scoped>
.profile-picture {
  height: 10vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>