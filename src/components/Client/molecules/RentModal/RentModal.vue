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

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  .modal-header {
    padding: 1em 1.5em;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;

    h3 {
      margin: 0;
      font-size: 1.25em;
      color: #333;
    }

    .modal-close {
      background: transparent;
      border: none;
      font-size: 1.5em;
      color: #666;
      cursor: pointer;
      transition: (color 0.2s ease);

      &:hover {
        color: #000;
      }
    }
  }

  .modal-body {
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .modal-footer {
    padding: 1em 1.5em;
    background-color: #f5f5f5;
  }
}
</style>
