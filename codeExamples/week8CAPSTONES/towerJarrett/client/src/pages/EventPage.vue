<script setup>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { computed, onMounted, ref } from 'vue';
import { eventsService } from '../services/TowerEventsService';
import { AppState } from '../AppState';
import { ticketsService } from '../services/TicketsService';
import { AuthService } from '../services/AuthService';
import { commentsService } from '../services/CommentsService';

const message = ref('Loading...')

const route = useRoute()
const listHidden = ref(true)
const towerEvent = computed(() => AppState.activeEvent)
const tickets = computed(() => listHidden.value ? AppState.activeEventTickets.slice(0, 4) : AppState.activeEventTickets)
const comments = computed(() => AppState.activeEventComments)
const account = computed(() => AppState.account)
const remainingSpots = computed(() => AppState.activeEvent?.capacity - AppState.activeEvent?.ticketCount)

const isAttending = computed(() => AppState.activeEventTickets.find(x => x.accountId == account?.value.id) != null)

const commentData = ref({
    eventId: route.params.eventId,
    body: ''
})

function login() {
    AuthService.loginWithPopup()
}

async function getEventById() {
    try {
      await eventsService.getEventById(route.params.eventId)
    }
    catch (error){
        message.value = "That event could not be loaded, please try again later."
        Pop.error("A problem occurred while getting event data.");
    }
}

async function getTicketsForEvent() {
    try {
      await ticketsService.getTicketsForEvent(route.params.eventId)
    }
    catch (error){
        Pop.error("A problem occurred while getting event ticket data.");
    }
}

async function getCommentsForEvent() {
    try {
      await commentsService.getCommentsForEvent(route.params.eventId)
    }
    catch (error){
        Pop.error("A problem occurred while getting event ticket data.");
    }
}

async function cancelEvent() {
    try {
        const confirmation = await Pop.confirm('Are you sure you want to cancel this event?')
        if (!confirmation) return
        await eventsService.cancelEvent(route.params.eventId)
    }
    catch (error){
      Pop.error(error);
    }
}

async function postComment() {
    try {
        await commentsService.postComment(commentData.value)
        commentData.value = {
            eventId: route.params.eventId,
            body: ''
        }
    }
    catch (error){
      Pop.error(error);
    }
}

async function deleteComment(comment) {
    try {
        const confirmation = await Pop.confirm('Are you sure you want to delete this comment?')
        if (!confirmation) return
        await commentsService.deleteComment(comment)
    }
    catch (error){
      Pop.error(error);
    }
}

async function deleteTicket() {
    const ticket = AppState.activeEventTickets.find(x => x.accountId == account.value.id)
    await ticketsService.deleteTicket(ticket.id)
}

async function createTicket() {
    await ticketsService.createTicket({ eventId: route.params.eventId })
}

async function decideTicketAction() {
    try {
        if (isAttending.value) {
            deleteTicket()
        } else {
            createTicket()
        }
    }
    catch (error){
      Pop.error(error);
    }
}

onMounted(() => {
    getEventById()
    getTicketsForEvent()
    getCommentsForEvent()
})

</script>


<template>
    <div v-if="towerEvent" class="container-fluid">
        <div class="p-md-5 pt-md-3 row justify-content-center">
            <div class="col-xxxl-7 col-xxl-9 col-lg-9 col-sm-11 col-12 mt-md-3">
                <img :src="towerEvent.coverImg" class="my-3 eventImage rounded">
                <div class="position-relative">
                    <div class="position-absolute" style="bottom: calc(1em + 9px);">
                        <span class="ms-2 p-1 px-2 text-white" style="background-color: rgba(0, 0, 0, 0.7); text-transform: capitalize;border-left: 5px solid;" :style="`border-color: var(--cat-${towerEvent.type});`">{{ towerEvent.type }}</span>
                    </div>
                </div>
            </div>
            <div class="col-xxxl-7 col-xxl-9 col-lg-9 col-sm-11 col-12">
                <div class="px-3 row justify-content-lg-between justify-content-center">
                    <div class="col-xxxl-6 col-xxl-7 col-lg-9 col-12">
                        <div class="row g-0">
                            <div class="col">
                                <div class="d-flex gap-3 align-items-center">
                                    <div class="fs-5 fw-semibold">{{ towerEvent.name }}</div>
                                    <span class="px-2 rounded" :class="{ 'text-success bg-success-subtle': towerEvent.status == 'Active', 'text-danger bg-danger-subtle': towerEvent.status == 'Canceled', 'text-dark bg-dark-subtle': towerEvent.status == 'Sold Out', 'text-accent bg-accent-subtle': towerEvent.status == 'Ended' }">{{ towerEvent.status }}</span>
                                </div>
                                <p class="text-accent">Hosted by {{ towerEvent.creator.name }}</p>
                                <p class="my-2 mb-3 text-dark">{{ towerEvent.description }}</p>
                                <span class="fs-5 fw-semibold">Date and Time</span>
                                <div class="d-flex gap-2 align-items-center text-dark mb-2">
                                    <i class="fs-3 text-accent mdi mdi-calendar"></i>Starts {{ towerEvent.startDate.toLocaleDateString('en-us', {
                                        weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
                                    }) }}
                                </div>
                                <span class="fs-5 fw-semibold">Location</span>
                                <div class="d-flex gap-2 align-items-center text-dark mb-3">
                                    <i class="fs-3 text-accent mdi mdi-map-marker"></i>{{ towerEvent.location }}
                                </div>
                                <span class="fs-5 fw-semibold">See what folks are saying...</span>
                            </div>
                        </div>
                        <div class="mt-1 row bg-info rounded">
                            <form v-if="account" @submit.prevent="postComment()" class="col-12 p-4 pb-0">
                                <div class="p-3 bg-page rounded">
                                    <h6>Post Comment</h6>
                                    <textarea v-model="commentData.body" class="form-control" required></textarea>
                                    <div class="text-end">
                                        <button class="btn btn-accent px-5 my-2">Post</button>
                                    </div>
                                </div>
                            </form>
                            <div class="col p-4" v-if="comments.length != 0">
                                <div class="d-flex p-3 bg-page rounded shadow align-items-center gap-3 mb-2 w-100" v-for="comment in comments" :key="comment.id">
                                    <img :src="comment.creator.picture" class="pfp" height="40">
                                    <div class="w-100">
                                        <span class="fw-bold d-flex align-items-center justify-content-between w-100">
                                            <div>
                                                {{ comment.creator.name }}
                                                <span class="fw-normal ms-2 px-2 bg-accent-subtle text-accent rounded" v-if="comment.creatorId == towerEvent.creatorId">
                                                    Host
                                                </span>
                                                <span class="ms-2 text-dark fw-light">
                                                    {{ comment.postDateString }}
                                                </span>
                                            </div>
                                            <div v-if="comment.creatorId == account?.id" class="text-end float-end">
                                                <button @click="deleteComment(comment)" class="btn text-danger"><i class="mdi mdi-delete"></i></button>
                                            </div>
                                        </span>
                                        {{ comment.body }}
                                    </div>
                                </div>
                            </div>
                            <div v-else class="col p-3 text-center text-dark">
                                Be the first to comment on this event!
                            </div>
                        </div>

                    </div>
                    <div class="col-xxxl-3 col-xxl-4 col-lg-3 col-12 mt-4">
                        <div class="row g-1">
                            <div v-if="towerEvent.creatorId == account?.id && !towerEvent.isCanceled" class="col-12 bg-info rounded p-3 mb-3">
                                <h5>Event Settings</h5>
                                <div class="d-flex d-lg-block justify-content-center gap-2 text-center">
                                    <!-- <button class="btn btn-primary mb-lg-2 mb-0 w-100">Edit Event</button> -->
                                    <button class="btn btn-danger w-100" @click="cancelEvent()">Cancel Event</button>
                                </div>

                            </div>
                            <div class="col-12 bg-info rounded p-3 text-center">
                                <h5>Interested in going?</h5>
                                <p class="text-dark mb-3">Grab a ticket!<span v-if="isAttending"><br>(You are attending this event)</span></p>
                                <button v-if="account" @click="decideTicketAction()" class="border-0 btn px-4 mb-2" :class="{ 'btn-accent' : towerEvent.status == 'Active', 'btn-dark' : towerEvent.status != 'Active' }" :disabled="towerEvent.status != 'Active'">{{ towerEvent.status == 'Active' ? ( isAttending ? 'Unattend' : 'Attend' ) : towerEvent.status }}</button>
                                <button v-else class="border-0 btn btn-accent px-5 mb-2" @click="login()">Login</button>
                            </div>
                            <div v-if="towerEvent.status == 'Active'" class="col-12 text-end">
                                {{ remainingSpots }} spot{{ remainingSpots != 1 ? 's' : '' }} remaining
                            </div>
                            <div class="col-12 mt-3">
                                <h5>Attendees</h5>
                                <div class="bg-info py-1 px-3 rounded" v-if="tickets.length != 0">
                                    <div class="attendee d-flex align-items-center gap-2 my-2" v-for="ticket in tickets" :key="ticket.id">
                                        <img class="p-1 ms-2 pfp" height="35" :src="ticket.profile.picture" alt="">{{ ticket.profile.name }}
                                    </div>
                                    <div v-if="towerEvent.ticketCount > 4" class="text-end">
                                        <button @click="listHidden = !listHidden" class="btn text-accent">
                                            {{ listHidden ? `See +${towerEvent.ticketCount - 4} more` : 'Hide list'}} <i class="mdi " :class="{'mdi-arrow-down' : listHidden, 'mdi-arrow-up' : !listHidden}"></i>
                                        </button>
                                    </div>
                                </div>
                                <div v-else class="text-dark text-center bg-info rounded p-3">
                                    Be the first to sign up for this event!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div v-else class="text-dark text-center mt-5">
        <h3>{{ message }}</h3>
    </div>
</template>


<style lang="scss" scoped>
    .eventImage {
        max-height: 40dvh;
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    .btn-danger {
        max-width: 300px;
    }

    .attendee {
        border-left: 5px solid var(--bs-accent)
    }
</style>