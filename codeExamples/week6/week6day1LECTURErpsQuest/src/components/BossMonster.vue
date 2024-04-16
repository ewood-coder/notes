<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { gameService } from '../services/GameService.js';

const monster = computed(()=>AppState.monster)

const healthPercent = computed(()=> (monster.value.health / monster.value.maxHealth)*100)

function attackMonster(){
  console.log('⚔️');
// We use components, like our controllers
  gameService.attackMonster()
}

function resetMonster(){
  gameService.resetMonster()
}

function attackHeroes(){
  if(monster.value.health > 0){
    gameService.attackHeroes()
  }
}

onMounted(()=>{ // this will run when ever this component gets loaded into the page
  setInterval(attackHeroes, 5000)
})
</script>


<template>
 <div class="card text-center">
    <h2 class="card-title">{{ monster.name }} <small>lvl.{{ monster.level }}</small></h2>
      <img v-if="monster.health > 0" :src="monster.picture" :style="`transform: scale(${monster.level});`" alt="image of nasty little dude" @click="attackMonster()">
      <img v-else src="https://em-content.zobj.net/source/twitter/348/headstone_1faa6.png" alt="" :title="`${monster.name} has been slain. Go again?`" @click="resetMonster()">
      <div class="card-body">
        <div class="progress">
          <div
            class="progress-bar bg-danger"
            role="progressbar"
            :style="`width: ${healthPercent}%;`"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {{monster.health}}/ {{ monster.maxHealth }}
          </div>
        </div>
        <div>{{ monster.gold }}🪙</div>

      </div>
 </div>
</template>


<style lang="scss" scoped>
img{
  width: 45%;
  margin-inline: auto;
  filter: hue-rotate(50deg);
  cursor: crosshair;
}
</style>
