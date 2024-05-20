<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/TowerEventsService.js';

const filter = ref("all")
const events = computed(() => filter.value == 'all' ? AppState.towerEvents : AppState.towerEvents.filter(x => x.type == filter.value))
const account = computed(() => AppState.account)
const categories = ref([
    {
        name: 'All',
        filterValue: 'all',
        icon: 'infinity'
    },
    {
        name: 'Concerts',
        filterValue: 'concert',
        icon: 'guitar-electric'
    },
    {
        name: 'Conventions',
        filterValue: 'convention',
        icon: 'account-group'
    },
    {
        name: 'Sports',
        filterValue: 'sport',
        icon: 'soccer'
    },
    {
        name: 'Digital',
        filterValue: 'digital',
        icon: 'monitor'
    }
])

async function getEvents() {
    try {
      await eventsService.getEvents()
    }
    catch (error){
      Pop.error("A problem occurred getting events.");
    }
}

function changeFilter(f) {
    filter.value = f
}

onMounted(() => {
    getEvents()
})

</script>

<template>
  <div class="container-fluid bg-gradient text-white d-flex flex-column" :class="{ hero: !account }">
    <div v-if="!account" class="row justify-content-center align-items-center flex-grow-1">
        <div class="col-lg-10 col-xl-9 col-xxl-7 col-12">
            <div class="row align-items-center justify-content-center">
                <div class="col-lg col-md-8 col-10 order-2 order-lg-1 text-center text-lg-start">
                    <h2>Event Management done&nbsp;right</h2>
                    <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Tower. Events&nbsp;are happening every day. Browse events and join the fun.</p>
                    <div class="d-flex gap-3 mt-4 justify-content-center justify-content-lg-start">
                        <button class="btn btn-bg px-4 text-white">Browse Events</button>
                        <button class="btn btn-secondary px-4 text-white">Join Tower</button>
                    </div>
                </div>
                <div class="col-xl-5 col-lg-6 col-md-8 col-9 order-1 order-lg-2 mb-lg-0 mb-5 text-center">
                    <img src="../assets/img/card.png" alt="" class="img-fluid w-100" style="max-width: 400px; object-fit: contain;">
                </div>
            </div>
        </div>
    </div>
  </div>
  <div class="container-fluid">
    <div v-if="account" class="p-5 pb-1 row justify-content-center">
        <div class="col-10 text-center">
            <h1>Explore Tower</h1>
        </div>
    </div>
    <div class="p-5 row justify-content-center">
        <div class="col-xxxl-8 col-xxl-10 col-lg-10 col-12">
            <h2>How Tower works</h2>
        </div>
        <div class="col-xxxl-7 col-xxl-9 col-lg-9 col-sm-11 col-122 mt-3">
            <div class="row gap-4">
                <div class="col-md col-12 bg-info p-4 rounded d-flex gap-3 align-items-start">
                    <i class="text-success fs-3 mdi mdi-magnify"></i>
                    <div class="mt-2">
                        <h5>Discover events you're interested in</h5>
                        <p class="text-dark">Browse through community hosted events<br>for all the things you love</p>
                    </div>
                </div>
                <div class="col bg-info p-4 rounded d-flex gap-3 align-items-start">
                    <i class="text-success fs-3 mdi mdi-plus"></i>
                    <div class="mt-2">
                        <h5>Start an event to invite your friends</h5>
                        <p class="text-dark mb-1">Create your own Tower event,<br>and draw from a community of millions</p>
                        <button @click="$router.push('create-event')" :title="account ? '' : 'You must have an account to create an event.'" :disabled="account == null" class="btn text-success border-0 p-0">Create an event</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="p-5 pt-3 row justify-content-center">
        <div class="col-xxxl-8 col-xxl-10 col-lg-10 col-12">
            <h2><span v-if="!account">Explore t</span><span v-else>T</span>op categories</h2>
        </div>
        <div class="col-xxxl-7 col-xxl-9 col-lg-9 col-sm-11 col-12 mt-3">
            <div class="row justify-content-center">
                <button @click="changeFilter(category.filterValue)" class="btn col-6 col-xl col-lg-4 p-1 text-center" v-for="category in categories" :key="category.name">
                    <div class="py-3 bg-info rounded">
                        <i class="mdi fs-2 d-block" :class="`mdi-${category.icon}`" :style="`color: var(--cat-${category.filterValue});`"></i>
                        <h5>{{ category.name }}</h5>
                    </div>
                </button>
            </div>
        </div>
    </div>
    <div class="p-5 pt-3 row justify-content-center">
        <div class="col-xxxl-8 col-xxl-10 col-lg-10 col-12">
            <h2>Upcoming events</h2>
        </div>
        <div class="col-xxxl-7 col-xxl-9 col-lg-9 col-sm-11 col-12 mt-3">
            <div class="row g-3">
                <router-link :to="{ name: 'Event', params: { eventId: towerEvent.id }}" class="col-lg-4 col-sm-6 col-12" v-for="towerEvent in events" :key="towerEvent.id">
                    <EventCard :towerEvent="towerEvent"/>
                </router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
