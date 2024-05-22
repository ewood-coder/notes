<script setup>
import { ref } from 'vue'
import Pop from '../utils/Pop.js';
import { Modal } from 'bootstrap';
import { cultsService } from '../services/CultsService.js';

const cultFormData = ref({
  name: '',
  description: '',
  fee: 0,
  coverImg: ''
})

async function createCult() {
  try {
    await cultsService.createCult(cultFormData.value)

    // clears form
    cultFormData.value = {
      name: '',
      description: '',
      fee: 0,
      coverImg: ''
    }

    // closes modal
    Modal.getOrCreateInstance('#createCultModal').hide()
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<template>
  <form @submit.prevent="createCult()">
    <div class="form-floating mb-3">
      <input v-model="cultFormData.name" type="text" class="form-control" id="name" placeholder="Name of cult..."
        required maxlength="255">
      <label for="name">Name</label>
    </div>

    <div class="form-floating mb-3">
      <input v-model="cultFormData.fee" type="number" class="form-control" id="fee" placeholder="Cult Fee..." required
        min="0" max="4294967295">
      <label for="fee">Fee</label>
    </div>

    <div class="form-floating mb-3">
      <input v-model="cultFormData.coverImg" type="url" class="form-control" id="coverImg"
        placeholder="Cover Image of cult..." required maxlength="255">
      <label for="coverImg">Cover Image</label>
    </div>

    <div class="form-floating mb-3">
      <textarea v-model="cultFormData.description" class="form-control" placeholder="Description of cult"
        id="description" required maxlength="10000"></textarea>
      <label for="description">Description</label>
    </div>

    <div class="text-end">
      <button type="submit" class="btn btn-danger">Create Cult</button>
    </div>
  </form>
</template>


<style scoped>
textarea {
  min-height: 25vh;
}
</style>