<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3>Dodaj nowego użytkownika</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="firstName">Imię:</label>
          <input
            type="text"
            id="firstName"
            v-model="newUser.firstName"
            required
          />
        </div>
        <div class="form-group">
          <label for="lastName">Nazwisko:</label>
          <input
            type="text"
            id="lastName"
            v-model="newUser.lastName"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="newUser.email" required />
        </div>
        <div class="form-group">
          <label for="phoneNumber">Numer telefonu:</label>
          <input
            type="tel"
            id="phoneNumber"
            v-model="newUser.phoneNumber"
            required
          />
        </div>
        <div class="form-group">
          <label for="birthDate">Data urodzenia:</label>
          <input
            type="date"
            id="birthDate"
            v-model="newUser.birthDate"
            required
          />
        </div>
        <div class="form-group">
          <label for="licenseNumber">Numer prawa jazdy:</label>
          <input
            type="text"
            id="licenseNumber"
            v-model="newUser.licenseNumber"
            required
          />
        </div>
        <div class="form-group">
          <label for="address">Adres:</label>
          <input type="text" id="address" v-model="newUser.address" required />
        </div>
        <div class="form-group">
          <label for="registrationDate">Data rejestracji:</label>
          <input
            type="date"
            id="registrationDate"
            v-model="newUser.registrationDate"
            required
          />
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
import { reactive, defineEmits } from "vue";

const emit = defineEmits<{
  (event: "user-added", user: any): void;
  (event: "close-modal"): void;
}>();

const newUser = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  licenseNumber: "",
  address: "",
  registrationDate: "",
});

const submitForm = () => {
  emit("user-added", { ...newUser });
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

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
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
