<script setup>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import BossMonster from '../components/BossMonster.vue';

const heroes = AppState.heroes

</script>


<template>
<section class="row justify-content-center">
  <div class="col-6">
    <BossMonster/>
  </div>
</section>

<section class="row justify-content-center">
  <div class="col-3" v-for="hero in heroes" :key="hero.name">
    <div class="card">
      <!-- Data binding for tag attributes, use : in front of thea attribute -->
      <img  class="card-img-top p-5" :class="{dead: hero.health <= 0}" :src="hero.picture" alt="">
      <div class="card-body">
        <!-- Data binding in between tags, use {{  }} -->
        <h4>{{ hero.name }}</h4>
        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            :style="`width: ${(hero.health/hero.maxHealth)*100}%;`"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {{hero.health}}/ {{ hero.maxHealth }}
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="col-6">Your 👛{{ AppState.gold }}</div>
</section>
</template>


<style lang="scss" scoped>
.dead{
  filter: grayscale(1);
}

</style>
