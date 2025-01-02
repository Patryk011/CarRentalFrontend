<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-content">
      <h3>{{ message }}</h3>
      <div class="modal-actions">
        <button @click="confirmAction">Tak</button>
        <button @click="cancelAction">Anuluj</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  isVisible: boolean;
  message: string;
}>();

const emit = defineEmits<{
  (event: "confirmed"): void;
  (event: "cancelled"): void;
}>();

const confirmAction = () => {
  emit("confirmed");
};

const cancelAction = () => {
  emit("cancelled");
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    background-color: white;
    font-family: Arial;
    padding: 1.875rem;
    border-radius: 1.25rem;
    width: 25rem;
    text-align: center;

    .modal-actions button {
      margin: 0.75rem;
      padding: 0.75rem;
      cursor: pointer;
      border-radius: 0.5rem;

      &:first-child {
        background-color: #808999;
        color: white;
      }

      &:last-child {
        background-color: #f44336;
        color: white;
      }
    }
  }
}
</style>
