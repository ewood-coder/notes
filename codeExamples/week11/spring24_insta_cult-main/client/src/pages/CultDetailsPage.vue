<script setup>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { cultsService } from '../services/CultsService.js';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import LoadingComponent from '../components/LoadingComponent.vue';
import { cultMembersService } from '../services/CultMembersService.js';
import ProfileImageCircle from '../components/ProfileImageCircle.vue';

const cult = computed(() => AppState.activeCult)

const cultists = computed(() => AppState.cultists)

const account = computed(() => AppState.account)

const cultBackgroundImage = computed(() => `url(${cult.value?.coverImg})`)

// .some is an array method that will return true if the callback function ever evaluats as true, or return false otherwise
// does the Account Id match any of the Cultist's Ids?
const isCultist = computed(() => AppState.cultists.some(cultist => cultist.id == AppState.account?.id))

// route information
const route = useRoute()

// route navigation
const router = useRouter()

async function getCultById() {
  try {
    await cultsService.getCultById(route.params.cultId)
  } catch (error) {
    Pop.error(error)
  }
}

async function getCultistsByCultId() {
  try {
    await cultMembersService.getCultistsByCultId(route.params.cultId)
  } catch (error) {
    Pop.error(error)
  }
}

async function createCultMember(cultId) {
  try {
    await cultMembersService.createCultMember(cultId)
  } catch (error) {
    Pop.error(error)
  }
}

async function destroyCultMember(cultMemberId) {
  try {
    const wantsToDestroy = await Pop.confirm("Are you sure that you want to remove this member from your cult?")

    if (!wantsToDestroy) { return }

    await cultMembersService.destroyCultMember(cultMemberId)
  } catch (error) {
    Pop.error(error)
  }
}

async function destroyCult(cultId) {
  try {
    const wantsToDestroy = await Pop.confirm("Are you sure you want to delete this cult?")

    if (!wantsToDestroy) { return }

    await cultsService.destroyCult(cultId)

    // NOTE returns the user to the home page
    router.push({ name: 'Home' })
  }
  catch (error) {
    Pop.error(error);
  }
}


onMounted(() => {
  getCultById()
  getCultistsByCultId()
})
</script>


<template>
  <div v-if="cult" class="container-fluid">

    <section class="row cult-hero align-items-center">
      <div class="col-12 cult-name">
        <h1>
          {{ cult.name }}
          <button @click="destroyCult(cult.id)" v-if="account?.id == cult.leaderId" class="btn btn-danger"
            type="button">
            Delete Cult
          </button>
        </h1>
        <button @click="createCultMember(cult.id)" v-if="account && !isCultist" class="btn btn-dark text-danger"
          type="button">
          JOIN
        </button>
      </div>
    </section>

    <section class="row">

      <div class="col-12 col-md-6 p-3">
        <p>{{ cult.description }}</p>
      </div>

      <div class="col-12 col-md-6 p-3">
        <h2>Leader</h2>
        <ProfileImageCircle :profile="cult.leader" />
        <h3>Members: {{ cultists.length }}</h3>
        <div class="d-flex gap-2">
          <div v-for="cultist in cultists" :key="cultist.cultMemberId" class="position-relative">
            <ProfileImageCircle :profile="cultist" />
            <span @click="destroyCultMember(cultist.cultMemberId)" v-if="account?.id == cult.leaderId"
              class="text-danger" role="button" :title="`Excommunicate ${cultist.name} from ${cult.name}`">
              <i class="mdi mdi-close-circle"></i>
            </span>
          </div>
        </div>
      </div>

    </section>

  </div>

  <div v-else class="container-fluid">
    <section class="row">
      <div class="col-12 text-center">
        <LoadingComponent />
      </div>
    </section>
  </div>
</template>


<style scoped>
.cult-hero {
  min-height: 50vh;
  background-image: v-bind(cultBackgroundImage);
  background-size: cover;
  background-position: center;
}

.cult-name {
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

h1 {
  text-shadow: 1px 1px 3px black;
  font-weight: bolder;
}

.position-relative {
  span {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.mdi-close-circle {
  text-shadow: 1px 1px 2px black;
}
</style>