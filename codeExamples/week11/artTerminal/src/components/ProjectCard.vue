<script setup>
import { Project } from '../models/Project.js';
import { projectsService } from '../services/ProjectsService.js';


const props = defineProps({ project: { type: Project, required: true } }) // this sets up our component to take in data, and what it will look like. This doesn't actually give our component any data to render.

function setActiveProject() {
  console.log('setting active project', props.project)
  projectsService.setActiveProject(props.project)
}

</script>


<template>
  <div class="card">

    <div class="row bg-dark border rounded">
      <div @click="setActiveProject()" class="col-6 p-0" data-bs-toggle="modal" data-bs-target="#projectModal"
        role="button" :title="`See project images for ${project.title}`">
        <img class="project-img rounded-start" :src="project.coverImg" alt="">
      </div>
      <div class="col-6 p-0 d-flex justify-content-center align-items-center flex-column">
        <h4 class="text-light">{{ project.title }}</h4>
        <RouterLink :to="{ name: 'Profile', params: { profileId: project.creatorId } }" class="profile">
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
.project-img {
  width: 100%;
  height: 20vh;
  object-fit: cover;
  object-position: center;
}

.profile {
  display: flex;
  align-items: baseline;

  img {
    height: 35px;
    aspect-ratio: 1/1;
    border-radius: 50em;
    object-fit: cover;
    object-position: center
  }
}
</style>
