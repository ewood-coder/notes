<template>
  <div class="container-fluid mt-3 ">
    <section class="row">

      <div class="col-12 my-2 "
        :style="{ backgroundImage: 'url(\'https://media.istockphoto.com/id/1457593188/photo/sunny-autumn-day-at-beautiful-mountain-lake.jpg?s=1024x1024&w=is&k=20&c=V_fNzR1iGDTNRcXmmBviF9aD_lGW6UenqbHZ70GLCko=\')', height: '65vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'top' }">

        <div class=" d-flex text-box flex-column align-items-start justify-content-end">
          <h3 class="text-dark">real events</h3>
          <h3 class="text-dark">real people</h3>
          <h3 class="text-dark">real fun</h3>
        </div>
      </div>
      <!-- bar for categories -->
      <div class="container">
        <section class="row bg-light p-3 rounded my-2 gap-2">
          <!-- 'concert', 'convention', 'sport', 'digital' -->
          <button class="col-12 col-md btn btn-outline-dark" :class="{ 'bg-info': filterBy == '' }"
            @click="filterBy = ''">all</button>

          <button class="col-12 col-md btn btn-outline-dark" :class="{ 'bg-info': filterBy == 'concert' }"
            @click="filterBy = 'concert'">concert</button>

          <button class="col-12 col-md btn btn-outline-dark" :class="{ 'bg-info': filterBy == 'convention' }"
            @click="filterBy = 'convention'">convention</button>

          <button class="col-12 col-md btn btn-outline-dark" :class="{ 'bg-info': filterBy == 'sport' }"
            @click="filterBy = 'sport'">sport</button>

          <button class=" me-2 col-12 col-md btn btn-outline-dark" :class="{ 'bg-info': filterBy == 'digital' }"
            @click="filterBy = 'digital'">digital</button>

        </section>
      </div>


    </section>
    <!-- showing off all the events   -->
    <div class="container">
      <section class="row">
        <div class="col-12 col-md-3 mt-3" v-for="event in events" :key="event">
          <EventCard :event="event" :key="event.id" />
        </div>
      </section>

    </div>

  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import EventCard from '../components/EventCard.vue';


export default {
  setup() {

    const filterBy = ref('');
    onMounted(() => {
      getAllEvents();
    });
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
        logger.log('getting events from page');
      }
      catch (error) {
        Pop.error(error);
      }
    }


    return {
      filterBy,
      getAllEvents,
      events: computed(() => {
        if (filterBy.value) {
          return AppState.events.filter(a => a.type == filterBy.value);
        }
        else {
          return AppState.events;
        }
      })
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.text-box {
  height: 65vh;
}
</style>
