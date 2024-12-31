<template>
  <div class="filter-container">
    <label for="start-date" class="filter-label">Od:</label>
    <input
      type="date"
      id="start-date"
      v-model="startDate"
      class="filter-input"
    />
    <label for="end-date" class="filter-label">Do:</label>
    <input type="date" id="end-date" v-model="endDate" class="filter-input" />
    <button class="filter-button" @click="applyFilter">
      Sprawdź dostępność pojazdów w podanym przedziale
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const startDate = ref<string>("");
const endDate = ref<string>("");

const emit = defineEmits<{
  (event: "filter", payload: { startDate: string; endDate: string }): void;
}>();

const applyFilter = () => {
  emit("filter", { startDate: startDate.value, endDate: endDate.value });
};
</script>

<style lang="scss" scoped>
.filter-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f7f7f7;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
}

.filter-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  align-self: flex-start;
}

.filter-input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #df0000;
    box-shadow: 0 0 6px rgba(74, 144, 226, 0.5);
    outline: none;
  }
}

.filter-button {
  background-color: #d64b4b;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #c50a0a;
  }
}

@media (max-width: 768px) {
  .filter-container {
    width: 100%;
    padding: 1rem;
  }

  .filter-input {
    font-size: 0.8rem;
  }

  .filter-button {
    font-size: 0.85rem;
    width: 100%;
    text-align: center;
  }
}
</style>
