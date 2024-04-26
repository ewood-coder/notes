<script setup>
import { useRoute } from 'vue-router';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { projectsService } from '../services/ProjectsService.js';
import ProjectCard from '../components/ProjectCard.vue';

const profile = computed(()=> AppState.activeProfile)

const projects = computed(()=> AppState.profileProjects)

const route = useRoute()

async function getProfile(){
  try {
    await profilesService.getProfile(route.params.profileId)
  } catch (error) {
    Pop.toast("could not get profile", 'error'),
    console.error(error)
  }
}

async function getProfileProjects(){
  try {
    await projectsService.getProfileProjects(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get profile Projects", 'error')
    console.error(error)
  }
}

onMounted(()=>{
  getProfile()
  getProfileProjects()
})

</script>


<template>
    <div class="container mt-2">
      <!-- NOTE v-if keeps the profile from trying to draw, before the network response is back -->
      <section class="row" v-if="profile">
          <img class="cover-img" :src="profile.coverImg" alt="">
        <div class="col-12 text-center">
          <img class="profile-img" :src="profile.picture" alt="">
          <h2>{{ profile.name }}</h2>
        </div>
        <div class="col-12">
          <p class="mt-2" >{{ profile.bio }}</p>
        </div>
        <div class="col-6">
          <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"><i class="mdi mdi-linkedin fs-4"></i></a>
        </div>
      </section>

      <section class="row justify-content-center">
        <div v-for="project in projects" :key="project.id" class="col-10 mb-2">
          <ProjectCard :project="project"/>
        </div>
      </section>
    </div>
</template>


<style lang="scss" scoped>
.cover-img{
  width: 100%;
  height: 20vh;
  margin-bottom: -10vh;
  object-fit: cover;
  object-position: center;
}

.profile-img{
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
}
</style>
