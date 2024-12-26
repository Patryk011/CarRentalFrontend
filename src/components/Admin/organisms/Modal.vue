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

<style scoped>
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
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  width: 400px;
  text-align: center;
}

.modal-actions button {
  margin: 20px;
  padding: 20px;
  cursor: pointer;
  border-radius: 7px;
}

.modal-actions button:first-child {
  background-color: #808999;
  color: white;
}

.modal-actions button:last-child {
  background-color: #f44336;
  color: white;
}
</style>
