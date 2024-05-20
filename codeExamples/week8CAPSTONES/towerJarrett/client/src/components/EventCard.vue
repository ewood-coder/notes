<!-- eslint-disable no-unused-vars -->
<script setup>
import { computed } from 'vue';
import { TowerEvent } from '../models/TowerEvent.js';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';

const props = defineProps({ towerEvent: TowerEvent, anonymous: Boolean, ticketId: String })

</script>


<template>
    <div class="card rounded border-0">
        <div :style="`background: linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 40%), url('${towerEvent.coverImg}');`" class="rounded card-img-top"></div>
        <div class="position-relative">
            <div class="position-absolute" style="bottom: 5px;">
                <span class="ms-2 ps-1 text-white" style="text-transform: capitalize; border-left: 5px solid;" :style="`border-color: var(--cat-${towerEvent.type});`">{{ towerEvent.type }}</span>
            </div>
        </div>
        <div class="card-body pt-2 ps-1">
            <div class="fw-bold card-title m-0 fs-6">{{ towerEvent.name }}</div>
            <div v-if="!anonymous" class="text-accent">Hosted by {{ towerEvent.creator.name }}</div>
            <div class="text-dark">{{ towerEvent.startDate.toLocaleDateString('en-us', { month: 'long', day: 'numeric' }) }} - {{ towerEvent.location }}</div>
            <div v-if="!anonymous" class="mt-1 d-flex align-items-center gap-2"><span class="px-2 rounded" :class="{ 'text-success bg-success-subtle': towerEvent.status == 'Active', 'text-danger bg-danger-subtle': towerEvent.status == 'Canceled', 'text-dark bg-dark-subtle': towerEvent.status == 'Sold Out', 'text-accent bg-accent-subtle': towerEvent.status == 'Ended' }">{{ towerEvent.status }}</span>{{ towerEvent.ticketCount }}&nbsp;Attending</div>
            <div v-else class="mt-1">
                <span class="px-2 rounded" :class="{ 'text-success bg-success-subtle': towerEvent.status == 'Active', 'text-danger bg-danger-subtle': towerEvent.status == 'Canceled', 'text-dark bg-dark-subtle': towerEvent.status == 'Sold Out', 'text-accent bg-accent-subtle': towerEvent.status == 'Ended' }">
                    {{ towerEvent.status }}
                </span>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .card-img-top {
        height: 150px;
        background-size: cover !important;
        background-position: center !important;
    }
</style>