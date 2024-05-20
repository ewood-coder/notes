<template>
  <div class="myEvents">
    <h2>Is this showing up?</h2>


  </div>
</template>


<script>

import { AppState } from '../AppState';
import { computed } from 'vue';
import { Event } from '../models/Event';

export default {
  props: { type: Event, required: true },
  setup() {
    return {
      myEvents: computed(() => AppState.myEvents)
    }
  }
};
</script>


<style lang="scss" scoped></style>