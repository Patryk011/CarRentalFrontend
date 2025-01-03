<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3>Dodaj nowe auto</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="registrationNumber">Numer rejestracyjny:</label>
          <input
            type="text"
            id="registrationNumber"
            v-model="newCar.registrationNumber"
            required
          />
        </div>
        <div class="form-group">
          <label for="brand">Marka:</label>
          <input type="text" id="brand" v-model="newCar.brand" required />
        </div>
        <div class="form-group">
          <label for="model">Model:</label>
          <input type="text" id="model" v-model="newCar.model" required />
        </div>
        <div class="form-group">
          <label for="purchaseDate">Data zakupu:</label>
          <input
            type="date"
            id="purchaseDate"
            v-model="newCar.purchaseDate"
            required
          />
        </div>
        <div class="form-group">
          <label for="state">Stan:</label>
          <select id="state" v-model="newCar.state" required>
            <option value="DOSTĘPNY">DOSTĘPNY</option>
            <option value="WYPOŻYCZONY">WYPOŻYCZONY</option>
            <option value="W_SERWISIE">W SERWISIE</option>
          </select>
        </div>
        <div class="form-group">
          <label for="vin">VIN:</label>
          <input type="text" id="vin" v-model="newCar.vin" required />
        </div>
        <div class="form-group">
          <label for="productionYear">Rok produkcji:</label>
          <input
            type="number"
            id="productionYear"
            v-model="newCar.productionYear"
            required
          />
        </div>
        <div class="form-group">
          <label for="color">Kolor:</label>
          <input type="text" id="color" v-model="newCar.color" required />
        </div>
        <div class="form-group">
          <label for="pricePerHour">Cena za godzinę:</label>
          <input
            type="number"
            id="pricePerHour"
            v-model="newCar.pricePerHour"
            required
          />
        </div>
        <div class="form-group">
          <label for="transmission">Skrzynia biegów:</label>
          <select id="transmission" v-model="newCar.transmission" required>
            <option value="MANUALNA">MANUALNA</option>
            <option value="AUTOMATYCZNA">AUTOMATYCZNA</option>
          </select>
        </div>
        <div class="form-group">
          <label for="fuelType">Typ paliwa:</label>
          <select id="fuelType" v-model="newCar.fuelType" required>
            <option value="BENZYNA">BENZYNA</option>
            <option value="DIESEL">DIESEL</option>
            <option value="LPG">LPG</option>
            <option value="HYBRYDA">HYBRYDA</option>
            <option value="ELEKTRYCZNY">ELEKTRYCZNY</option>
          </select>
        </div>
        <div class="form-group">
          <label for="seats">Ilość miejsc:</label>
          <input type="number" id="seats" v-model="newCar.seats" required />
        </div>
        <div class="form-group">
          <label for="lastServiceDate">Ostatni serwis:</label>
          <input
            type="date"
            id="lastServiceDate"
            v-model="newCar.lastServiceDate"
            required
          />
        </div>
        <div class="form-group">
          <label for="nextServiceDate">Następny serwis:</label>
          <input
            type="date"
            id="nextServiceDate"
            v-model="newCar.nextServiceDate"
            required
          />
        </div>
        <div class="form-group">
          <label for="engineCapacity">Pojemność silnika:</label>
          <input
            type="number"
            id="engineCapacity"
            v-model="newCar.engineCapacity"
            required
          />
        </div>
        <div class="modal-actions">
          <button type="submit">Dodaj</button>
          <button @click="$emit('close-modal')">Anuluj</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineEmits } from "vue";

const emit = defineEmits<{
  (event: "car-added", newCar: any): void;
  (event: "close-modal"): void;
}>();

const newCar = reactive({
  registrationNumber: "",
  brand: "",
  model: "",
  purchaseDate: "",
  state: "DOSTĘPNY",
  vin: "",
  productionYear: 2000,
  color: "",
  pricePerHour: 0,
  transmission: "MANUALNA",
  fuelType: "BENZYNA",
  seats: 5,
  lastServiceDate: "",
  nextServiceDate: "",
  engineCapacity: 1.0,
});

const submitForm = () => {
  emit("car-added", { ...newCar });
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
  max-width: 50rem;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h3 {
  color: blue;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin: 0.5rem 0;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  border: 0.16rem solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
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
