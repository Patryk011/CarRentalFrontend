<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3>{{ formTitle }}</h3>
      <form @submit.prevent="submitForm">
        <div
          v-for="(field, index) in formFields"
          :key="index"
          class="form-group"
        >
          <label :for="field.name">{{ field.label }}:</label>
          <template v-if="field.type === 'select'">
            <select
              :id="field.name"
              v-model="formData[field.name]"
              :required="field.required"
            >
              <option
                v-for="option in field.options"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </template>
          <template v-else>
            <input
              :type="field.type"
              :id="field.name"
              v-model="formData[field.name]"
              :required="field.required"
              :placeholder="field.placeholder || ''"
            />
          </template>
        </div>
        <div class="modal-actions">
          <button type="submit">Dodaj</button>
          <button type="button" @click="$emit('close-modal')">Anuluj</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineProps, defineEmits } from "vue";

const props = defineProps({
  formTitle: {
    type: String,
    required: true,
  },
  formFields: {
    type: Array as () => Array<{
      name: string;
      label: string;
      type: string;
      required?: boolean;
      placeholder?: string;
      options?: string[];
    }>,
    required: true,
  },
});

const emit = defineEmits(["form-submitted", "close-modal"]);

const formData = reactive<Record<string, any>>({});

const submitForm = () => {
  emit("form-submitted", { ...formData });
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
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 40rem;
  max-height: 80vh;
  overflow-y: auto;
}

h3 {
  margin-bottom: 1rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  border: 0.12rem solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.modal-actions button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.modal-actions button:first-of-type {
  background-color: #28a745;
  color: white;
}

.modal-actions button:last-of-type {
  background-color: #dc3545;
  color: white;
}
</style>
