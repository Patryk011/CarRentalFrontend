<template>
  <div class="cars-container">
    <button @click="addCarModal = true" class="add-car-button">
      Dodaj auto
    </button>

    <div v-if="addCarModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Dodaj nowe auto</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="carBrandId">Marka:</label>
            <select id="carBrandId" v-model="formData.carBrandId" required>
              <option
                v-for="option in carBrandOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="carModelId">Model:</label>
            <select id="carModelId" v-model="formData.carModelId" required>
              <option
                v-for="option in carModelOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="registrationNumber">Numer rejestracyjny:</label>
            <input
              type="text"
              id="registrationNumber"
              v-model="formData.registrationNumber"
              required
            />
          </div>

          <div class="form-group">
            <label for="productionYear">Rok produkcji:</label>
            <input
              type="number"
              id="productionYear"
              v-model="formData.productionYear"
              required
            />
          </div>

          <div class="form-group">
            <label for="color">Kolor:</label>
            <input type="text" id="color" v-model="formData.color" required />
          </div>

          <div class="form-group">
            <label for="pricePerDay">Cena za dzień:</label>
            <input
              type="number"
              id="pricePerDay"
              v-model="formData.pricePerDay"
              required
            />
          </div>

          <div class="form-group">
            <label for="transmission">Skrzynia biegów:</label>
            <select id="transmission" v-model="formData.transmission" required>
              <option value="MANUAL">Manualna</option>
              <option value="AUTOMATIC">Automatyczna</option>
            </select>
          </div>

          <div class="form-group">
            <label for="fuelType">Typ paliwa:</label>
            <select id="fuelType" v-model="formData.fuelType" required>
              <option value="PETROL">Benzyna</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Elektryczny</option>
            </select>
          </div>

          <div class="form-group">
            <label for="seats">Ilość miejsc:</label>
            <input type="number" id="seats" v-model="formData.seats" required />
          </div>

          <div class="form-group">
            <label for="engineCapacity">Pojemność silnika:</label>
            <input
              type="number"
              id="engineCapacity"
              v-model="formData.engineCapacity"
              required
            />
          </div>

          <div class="form-group">
            <label for="state">Stan:</label>
            <select id="state" v-model="formData.state" required>
              <option value="AVAILABLE">Dostępny</option>
              <option value="BLOCKED">Zablokowany</option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="submit">Dodaj</button>
            <button type="button" @click="addCarModal = false">Anuluj</button>
          </div>
        </form>
      </div>
    </div>

    <Table :data="cars" :columns="columns" :actions="actions" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Table from "../organisms/Table/Table.vue";
import useCars from "@/composables/useCars";
import { CarDTO } from "../organisms/FormsFields/CarFormFields";

const {
  cars,
  fetchCars,
  addCar,
  blockCar,
  unblockCar,
  fetchBrands,
  fetchModels,
  carBrandOptions,
  carModelOptions,
  formData,
} = useCars();

const addCarModal = ref(false);

const columns = [
  { key: "id", label: "ID" },
  { key: "registrationNumber", label: "Numer rejestracyjny" },
  { key: "carBrandName", label: "Marka" },
  { key: "carModelName", label: "Model" },
  { key: "state", label: "Stan" },
  { key: "productionYear", label: "Rok produkcji" },
  { key: "color", label: "Kolor" },
  { key: "pricePerDay", label: "Cena za dzień" },
  { key: "transmission", label: "Skrzynia biegów" },
  { key: "fuelType", label: "Typ paliwa" },
  { key: "seats", label: "Ilość miejsc" },
  { key: "engineCapacity", label: "Pojemność silnika" },
];

const actions = (item: CarDTO) => {
  const isBlocked = item.state === "BLOCKED";

  return [
    {
      label: isBlocked ? "Odblokuj" : "Zablokuj",
      onClick: isBlocked ? () => unblockCar(item.id) : () => blockCar(item.id),
      class: isBlocked ? "unblock-button" : "block-button",
    },
  ];
};

const submitForm = async () => {
  try {
    await addCar(formData);
    fetchCars();
    addCarModal.value = false;
    formData.carBrandId = null;
    formData.carModelId = null;
    formData.registrationNumber = "";
    formData.productionYear = null;
    formData.color = "";
    formData.pricePerDay = null;
    formData.transmission = "";
    formData.fuelType = "";
    formData.seats = null;
    formData.engineCapacity = null;
    formData.state = "";
  } catch (error) {
    console.error("Błąd przy dodawaniu samochodu:", error);
  }
};

onMounted(async () => {
  fetchCars();
  await fetchBrands();
});
</script>

<style scoped>
.cars-container {
  padding: 2rem;

  .add-car-button {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  .add-car-button:hover {
    background-color: #0056b3;
  }

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
    z-index: 100;
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
}
</style>
