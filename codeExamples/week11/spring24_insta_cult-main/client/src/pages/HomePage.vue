<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)
</script>

<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12 text-center">

        <RouterLink :to="{ name: 'Cults' }">
          <button class="btn btn-outline-danger me-3 fs-2 w-25">
            <span>
              Join a cult?
            </span>
          </button>
        </RouterLink>

        <!-- TODO have this button open our form modal -->
        <button v-if="account" class="btn btn-outline-danger ms-3 fs-2 w-25" data-bs-toggle="modal"
          data-bs-target="#createCultModal">
          <span>
            Start a cult?
          </span>
        </button>
      </div>
    </section>
  </div>

  <ModalComponent />
</template>

<style scoped lang="scss">
.container-fluid {
  background-image:
    linear-gradient(black, black),
    url(https://images.unsplash.com/photo-1600887292404-ac6e38cf3302?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  min-height: var(--main-height);
  background-size: cover;
  background-position: center;
  filter: contrast(1.71);
  background-blend-mode: saturation;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

span {
  text-shadow: 1px 1px 10px red;
  font-weight: bold;
}
</style>
