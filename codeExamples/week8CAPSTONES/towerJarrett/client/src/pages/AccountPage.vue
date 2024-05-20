<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/TowerEventsService.js';
import { ticketsService } from '../services/TicketsService.js';

const account = computed(() => AppState.account)
const myEvents = computed(() => AppState.towerEvents.filter(x => x.creatorId == account?.value.id))
const myTicketEvents = computed(() => AppState.myTickets)

async function getMyEvents() {
    try {
        await ticketsService.getMyTickets()
        await eventsService.getMyEvents()
    }
    catch (error){
      Pop.error("A problem occurred while getting your events.");
    }
}


async function unattend(id) {
    try {
        await ticketsService.deleteTicket(id)
    }
    catch (error){
      Pop.error('A problem occurred while unattending.');
    }
}

onMounted(() => {
    getMyEvents()
})

</script>

<template>
    <div v-if="account" class="container-fluid">
        <div class="p-md-5 pt-md-3 row justify-content-center">
            <div class="col-xxxl-8 col-xxl-9 col-lg-10 col-sm-11 col-12 mt-3">
                <div class="px-4 mt-4 w-100 d-flex align-items-center gap-4">
                    <img class="pfp shadow" :src="account.picture" alt="Profile Picture">
                    <div>
                        <h3 class="m-0">
                            {{ account.name }}
                        </h3>
                        <p class="m-0">{{ myEvents.length }} Events • {{ myTicketEvents.length }} Tickets</p>
                    </div>
                </div>
            </div>
            <div class="col-xxxl-7 col-xxl-8 col-lg-9 col-sm-11 col-12 mt-5">
                <h5>Your Events</h5>
                <div class="row g-3">
                    <router-link :to="{ name: 'Event', params: { eventId: towerEvent.id }}" class="col-lg-4 col-sm-6 col-12" v-for="towerEvent in myEvents" :key="towerEvent.id">
                    <EventCard :towerEvent="towerEvent"/>
                    </router-link>
                </div>
                <h4 class="mt-4">Upcoming Events</h4>
                <div class="row g-3">
                    <div class="col-lg-4 col-sm-6 col-12" v-for="ticket in myTicketEvents" :key="ticket.event.id">
                        <router-link :to="{ name: 'Event', params: { eventId: ticket.event.id }}">
                            <EventCard :anonymous="true" :ticketId="ticket.id" :towerEvent="ticket.event"/>
                        </router-link>
                        <button @click="unattend(ticket.id)" class="d-block mb-4 px-3 btn btn-accent">Unattend</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
