<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/TowerEventsService.js';
import { router } from '../router.js';

const account = computed(() => AppState.account)

const formData = ref({
    name: "",
    description: "",
    coverImg: "",
    location: "",
    capacity: 0,
    startDateStr: null,
    startDate: new Date(),
    startTime: "",
    type: "",
    isCanceled: false
})

function validateTime(input, time) {
    if (!input.includes(':')) return
    let timeP = input.split(':')
    time.setHours(parseInt(timeP[0]))
    time.setMinutes(parseInt(timeP[1]))
}

async function createEvent() {
    try {
        formData.value.startDate = new Date(formData.value.startDateStr.replaceAll('-', '/'))
        validateTime(formData.value.startTime, formData.value.startDate)
        const towerEvent = await eventsService.createEvent(formData.value)
        router.push({ name: 'Event', params: { eventId: towerEvent.id }})
    }
    catch (error){
        console.error(error)
      Pop.error("A problem occurred while creating event.");
    }
}

onMounted(() => {

})

</script>


<template>
    <div class="container-fluid">
        <div v-if="account" class="p-5 pt-3 row justify-content-center">
            <div class="col-xxl-8 col-xl-9 col-lg-10 col-sm-11 col-12">
                <h2>Create an Event</h2>
            </div>
            <div class="col-xxl-7 col-xl-8 col-lg-9 col-sm-11 col-12 mt-3">
                <form @submit.prevent="createEvent()" class="row">
                    <div class="col-12">
                        <label>Name</label>
                        <input v-model="formData.name" type="text" class="form-control mb-2" required minLength="3" maxLength="50">
                    </div>
                    <div class="col-12">
                        <label>Description</label>
                        <textarea v-model="formData.description" type="text" class="form-control mb-2" required minLength="15" maxLength="1000"></textarea>
                    </div>
                    <div class="col-lg-6 col-12">
                        <label>Image URL</label>
                        <input v-model="formData.coverImg" type="url" class="form-control mb-2" required minLength="1" maxLength="500">
                    </div>
                    <div class="col-lg-6 col-12">
                        <label>Location</label>
                        <input v-model="formData.location" type="text" class="form-control mb-2" required minLength="1" maxLength="500">
                    </div>
                    <div class="col-lg-6 col-12">
                        <label>Capacity</label>
                        <input v-model="formData.capacity" type="number" class="form-control mb-2" required min="1" max="5000">
                    </div>
                    <div class="col-lg-6 col-12">
                        <label>Start Date</label>
                        <input v-model="formData.startDateStr" type="date" class="form-control mb-2" required>
                    </div>
                    <div class="col-lg-6 col-12">
                        <label>Start Time</label>
                        <input v-model="formData.startTime" type="text" class="form-control mb-2" placeholder="HH:MM" required>
                    </div>
                    <div class="col-lg-6 col-12">
                        <label>Type</label>
                        <select v-model="formData.type" class="form-select mb-2" placeholder="Category" required>
                            <option value="concert">Concert</option>
                            <option value="convention">Convention</option>
                            <option value="sport">Sport</option>
                            <option value="digital">Digital</option>
                        </select>
                    </div>
                    <div class="col-12 text-center my-3">
                        <button class="btn btn-primary px-5">Create Event</button>
                    </div>
                    <div class="col-12">
                        Image Preview
                        <img :src="formData.coverImg != '' ? formData.coverImg : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='" class="image-preview">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .image-preview {
        width: 100%;
        aspect-ratio: 1/1;
        max-height: 250px;
        object-fit: contain;
        background-color: var(--bs-info);
        border: 4px dashed var(--bs-dark)
    }


</style>