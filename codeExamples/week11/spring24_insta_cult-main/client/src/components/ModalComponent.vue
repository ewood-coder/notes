<script setup>
import CultForm from './CultForm.vue';
</script>


<template>
  <div class="modal fade" id="createCultModal" tabindex="-1" aria-labelledby="createCultModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createCultModalLabel">Create Cult</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <CultForm />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped></style>