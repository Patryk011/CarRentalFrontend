<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <header class="modal-header">
        <slot name="header"></slot>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </header>

      <div class="modal-body">
        <slot name="body"></slot>
      </div>

      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["close"]);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: #fff;
  width: 90%;
  max-width: 500px;
  margin: 100px auto;
  padding: 1.5em;
  border-radius: 0.3em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.modal-close {
  background: transparent;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}

.modal-header {
  margin-bottom: 1em;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-body {
  margin-bottom: 1em;
}
</style>
