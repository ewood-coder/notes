<template>
  <div class="myEventsPage container-fluid">
    <h4 class="text-center mt-2">Welcome to your events page</h4>
    <!-- create event button -->
    <div class="container-fluid">
      <section class="row">
        <div class="col-12">

          <form @submit.prevent="createEvent()" class="">
            <div>
              <label for="name">Name of Event</label>
              <input required v-model="eventData.name" class="form-control" type="text" id="create-name" minlength="3"
                maxlength="30">
            </div>
            <div>
              <label for="type">Select Type of Event</label>
              <select required v-model="eventData.type" class="form-control">
                <option selected v-for="option in typeOptions" :value="option">{{ option }}</option>

              </select>
            </div>
            <div>
              <label for="date">When is it?</label>

              <input required v-model="eventData.startDate" class="form-control" minlength="3" maxlength="" type="date">
            </div>
            <div>
              <label for="capacity">How many people can attend?</label>
              <input required v-model="eventData.capacity" class="form=control w-100 mt-2" type="number" name="capacity"
                id="capacity" min="3" max="2000">
            </div>
            <div>
              <label for="location">Where will this event take place?</label>
              <input required class="form-control" v-model="eventData.location" type="text" minlength="">
            </div>
            <div>
              <label for="coverImg">Cover image</label>
              <input required v-model="eventData.coverImg" class="form-control " type="url" minlength="3" maxlength="500">
            </div>
            <div>
              <label for="description">Tell us about your event:</label>
              <textarea required v-model="eventData.description" name="description" id="create-description"
                class="form-control w-100" minlength="3" maxlength="1000" cols="30" rows="10"></textarea>
            </div>
            <div class="text-center mt-2">
              <button class="btn btn-info p-2 col-12">Create
                Event
                <i><i class="mdi mdi-plus"></i></i></button>

            </div>
          </form>
        </div>
      </section>

    </div>

    <!-- NOTE this is a stretch goal -->
    <!-- my events I have created -->
    <!-- <section class="row">
      <div class="col-12">
        <h4>My Events</h4>
      </div>
      <div class=" col-12 myEvents" v-for="myEvent in myEvents">
        <MyEventsCard :myEvent="myEvent" :key="myEvent" />

      </div>

    </section> -->



    <!-- events I am attending/my tickets  -->
    <section class="row">
      <h3 class="text-center mt-4">Upcoming Events</h3>

      <div class="col-12 col-md-4 mt-3 d-flex" v-for="myTicket in myTickets">
        <MyTicket :key="myTicket.id" :myTicket="myTicket" />

      </div>

    </section>
  </div>
</template>


<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import MyEventsCard from '../components/MyEventsCard.vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { ticketsService } from '../services/TicketsService';
import MyTicket from '../components/MyTicket.vue'



export default {

  setup() {
    const eventData = ref({})
    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
      getMyTickets()
    })
    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      typeOptions: ['sport', 'concert', 'convention', 'digital'],
      route,
      eventData,
      getMyTickets,
      events: computed(() => AppState.events),
      myEvents: computed(() => AppState.myEvents),
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      profile: computed(() => AppState.profile),


      async createEvent() {
        try {
          console.log('eventData', eventData.value)
          const event = await eventsService.createEvent(eventData.value)
          Pop.success('event created')
          eventData.value = {}
          router.push({ name: 'Event Details', params: { eventId: event.id } })
        } catch (error) {
          Pop.error(error)
        }
      }

    }


  },
  components: { MyEventsCard, MyTicket }
}
</script>
