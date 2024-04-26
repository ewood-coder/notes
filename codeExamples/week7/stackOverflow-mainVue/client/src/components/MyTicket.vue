<template>
  <div class="MyTicket container ">
    <div class="myTicket card rounded border-dark border-2">
      <img class="img-fluid" :src="myTicket.event.coverImg" alt="">
      <div class="p-2">
        {{ myTicket.event.name }}
      </div>
      <div class="p-2 d-flex justify-content-between">
        {{ myTicket.event.location }}
        <button @click="deleteMyTicket(myTicket.id)" class=" btn-info btn"><i><i class="mdi mdi-delete"></i></i></button>
      </div>
      <div>
        {{ activeEvent.startDate.toLocaleDateString('en-US', {
          month: 'numeric', day: 'numeric', year: 'numeric'
        }) }}
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Ticket } from '../models/Ticket';
import { ticketsService } from '../services/TicketsService';
import Pop from '../utils/Pop';

export default {
  props: { myTicket: { type: Ticket, required: true } },

  setup() {
    async function deleteMyTicket(myTicketId) {
      try {
        if (await Pop.confirm('Are you sure?'))
          await ticketsService.deleteMyTicket(myTicketId)
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      deleteMyTicket,
      activeEvent: computed(() => AppState.activeEvent),
      myTickets: computed(() => AppState.tickets)
    }
  }
};
</script>


<style lang="scss" scoped>
.profile-pic {
  height: 70px;
  width: 70px;
  border-radius: 50%;
}
</style>