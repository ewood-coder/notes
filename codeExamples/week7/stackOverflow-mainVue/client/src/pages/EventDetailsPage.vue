<template>
  <div class="EventDetails container">
    <section v-if="activeEvent" class="row">

      <div class="col-12 mt-2">

        <h2>{{ activeEvent.name }}</h2>

      </div>
      <div class="col-12 col-md-6">
        <img class="img-fluid " :src="activeEvent.coverImg" :alt="activeEvent.name">
      </div>
      <div class="col-12 col-md-6">
        <div class="mt-2">
          <h2>What's happening?</h2>
        </div>
        <div>
          <p>{{ activeEvent.description }}</p>
        </div>
        <div>
          <h4>{{ activeEvent.location }}</h4>
        </div>

        <h5 class="m-2"> {{ activeEvent.startDate.toLocaleDateString('en-US', {
          month: 'numeric', day: 'numeric', year: 'numeric'
        }) }}</h5>
        <div class="d-flex flex-column justify-content-end">
          <h4 v-if="!activeEvent.isCanceled" class="mt-3">{{ activeEvent.capacity - activeEvent.ticketCount }} spots left
          </h4>
          <div v-if="isAttending">You are attending this event</div>
          <div v-if="activeEvent.ticketCount >= activeEvent.capacity" class="red">Event is SOLD OUT</div>
          <div v-if="activeEvent.isCanceled" class="red">Event is Canceled</div>
          <button :disabled="isAttending || activeEvent.isCanceled || activeEvent.ticketCount >= activeEvent.capacity"
            @click="buyTicket()" class="mt-2 p-3 btn btn-info">Buy
            Ticket
            <i><i class="mdi mdi-ticket"></i>
            </i></button>
          <button @click="cancelEvent(activeEvent.id)" v-if="!activeEvent.isCanceled"
            :disabled="account.id != activeEvent.creatorId" class="mt-2 p-3 btn btn-outline-danger red">Cancel
            Event</button>

        </div>
      </div>
    </section>

    <section class="row">
      <!-- who is attending the event -->
      <div class="col-12">
        <h3 class="mt-3">Who is attending?</h3>
      </div>
      <div class="col-1 d-flex mt-2" v-for="othersTicket in othersTickets">

        <img :title=othersTicket.profile.name class="profile-pic " :src="othersTicket.profile.picture" alt="">



      </div>
    </section>
    <section class="row mt-5 justify-content-center">
      <!-- comments -->
      <div class="col-10 d-flex">
        <form @submit.prevent="createComment()" class="form-control">
          <div>
            <label for="comment">Comment on the event</label>
            <textarea v-model="commentData.body" class="w-100  form-control" name="comment" id="create-comment"
              rows="5"></textarea>
          </div>
          <div>
            <button class="btn btn-info text-end">submit</button>
          </div>
        </form>

      </div>
    </section>
    <section class="row">
      <div class="col-12">
        <h4 class="ms-3 mt-3">Comments</h4>
        <div v-for="comment in comments" class="mb-3">
          <CommentCard :comment="comment" :key="comment.id" />
        </div>
      </div>

    </section>



  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, ref, onMounted, watchEffect } from 'vue';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService'
import CommentCard from '../components/CommentCard.vue';
import { ticketsService } from '../services/TicketsService'
import { accountService } from '../services/AccountService';

export default {
  setup() {
    const commentData = ref({});
    const route = useRoute();
    onMounted(() => {
      getEventComments()
    });

    watchEffect(() => {
      route.params.eventId;

      getEventById();
      getOtherPeoplesEventTickets()

    });
    async function createComment() {
      commentData.value.eventId = route.params.eventId;
      console.log('comment value', commentData.value);
      await commentsService.createComment(commentData.value);
      Pop.success('comment made');
      commentData.value = {};
    };
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      }
      catch (error) {
        Pop.error(error);
      }
    };
    async function getOtherPeoplesEventTickets() {
      try {
        await ticketsService.getOtherPeoplesEventTickets(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getEventComments() {
      try {
        await commentsService.getEventComments(route.params.eventId)

      } catch (error) {
        Pop.error(error)
      }
    }


    return {
      othersTickets: computed(() => AppState.othersTickets),
      getEventComments,
      getOtherPeoplesEventTickets,
      createComment,
      getEventById,
      commentData,
      route,
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      activeEvent: computed(() => AppState.activeEvent),
      isAttending: computed(() => {
        const account = AppState.tickets.find(ticket => ticket.accountId == AppState.account.id)
        return account != undefined
      }),


      async buyTicket() {
        try {
          const ticketData = { eventId: route.params.eventId }
          await ticketsService.buyTicket(ticketData)
        } catch (error) {
          Pop.error(error)
        }
      },
      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm('Are you sure?')) {
            await eventsService.cancelEvent(eventId)
            Pop.success('you canceled your event')
          }
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  },
  components: { CommentCard }
};
</script>


<style lang="scss" scoped>
.profile-pic {
  height: 70px;
  width: 70px;
  border-radius: 50%;
}

.red {
  color: red
}
</style>