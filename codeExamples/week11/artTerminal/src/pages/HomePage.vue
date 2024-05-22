<script setup>
import { computed, onMounted } from 'vue';
import { projectsService } from '../services/ProjectsService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
import ProjectCard from '../components/ProjectCard.vue';


const projects = computed(()=> AppState.projects)

onMounted(()=>{
  getProjects()
})

async function getProjects(){
  try {
    await projectsService.getProjects()
  } catch (error) {
    Pop.toast("Could not get projects", 'error')
    console.error(error)
  }
}

</script>

<template>
  <div class="container">
    <section class="row g-2">

      <!-- The Art is about to happen! -->
<!-- {{ projects }} -->

      <div v-for="project in projects" :key="project.id" class="col-12 col-md-6 mb-2">
        <!-- {{ project.title }} -->
        <!-- :project="project" is what passes the data into the ProjectCard component to be used -->
        <ProjectCard :project="project"/>
      </div>

    </section>
  </div>
</template>

<style scoped lang="scss">

</style>
