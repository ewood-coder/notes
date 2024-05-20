<script setup>
import { Project } from '../models/Project.js';


defineProps({project: {type: Project, required: true}}) // this sets up our component to take in data, and what it will look like. This doesn't actually give our component any data to render.

</script>


<template>
  <div class="card">

    <div class="row bg-dark border rounded">
      <div class="col-6 p-0">
        <img class="project-img" :src="project.coverImg" alt="">
      </div>
      <div class="col-6 p-0 d-flex justify-content-center align-items-center flex-column">
        <h4>{{ project.title }}</h4>
        <RouterLink :to="{name: 'Profile', params: {profileId: project.creatorId}}" class="profile">
          <img :src="project.creator.picture" alt="">
          <p>{{ project.creator.name }}</p>
        </RouterLink>
      </div>
      <!-- Project title 🧑‍🎨
  {{project.title}} -->
    </div>
  </div>
</template>


<style lang="scss" scoped>
.project-img{
  width: 100%;
  height: 20vh;
  object-fit: cover;
  object-position: center;
}

.profile{
  display: flex;
  align-items: baseline;
  img{
    height: 35px;
    aspect-ratio: 1/1;
    border-radius: 50em;
    object-fit: cover;
    object-position: center
  }
}
</style>
