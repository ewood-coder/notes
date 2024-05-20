<script setup>
import { computed, onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { AuthService } from '../services/AuthService.js';
import { AppState } from '../AppState.js';

const theme = ref(loadState('theme') || 'light')
const account = computed(() => AppState.account)

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

async function login() {
  AuthService.loginWithPopup()
}

async function logout() {
  AuthService.logout({ returnTo: window.location.origin })
}

</script>

<template>
  <nav class="sticky-top navbar navbar-expand-sm navbar-dark bg-gradient px-5">
    <router-link class="ms-md-5 navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <span class="fs-1 fw-bold d-flex gap-2 align-items-center text-white">
            <i class="mdi mdi-radio-tower"></i>TOWER
        </span>
      </div>
    </router-link>
    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse me-md-5" id="navbarText">
      <ul class="navbar-nav me-auto w-100 d-flex justify-content-end gap-2">
        <li v-if="account">
          <router-link :to="{ name: 'Dashboard' }" class="btn text-white selectable text-uppercase">
            Dashboard
          </router-link>
        </li>
        <li v-if="!account">
          <button @click="login()" class="btn border-0 text-white selectable text-uppercase">
            Login
          </button>
        </li>
        <li v-else>
          <button @click="logout()" class="btn border-0 text-white selectable text-uppercase">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>
