<template>
  <router-link :to="{ path: `/eventDetails/${event.id}` }">
    <div class="EventCard card rounded border-dark border-2 selectable">
      <img class="img-fluid" :src="event.coverImg" :alt="event.name">
      <div class="p-2 d-flex justify-content-between">
        <div>
          {{ event.name }}
        </div>
        <div v-if="account.id == event.creatorId">
          <button v-if="!event.isCanceled" @click.stop="cancelEvent(event.id)" class="btn btn-info">cancel</button>
          <button class="btn btn-danger" v-if="event.isCanceled">CANCELED</button>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Event } from '../models/Event'
import { RouterLink } from 'vue-router';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { router } from '../router';

export default {
  props: { event: { type: Event, required: true } },
  setup() {
    return {
      account: computed(() => AppState.account),

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
    };
  },
  components: { RouterLink }
};
</script>


<style lang="scss" scoped></style>