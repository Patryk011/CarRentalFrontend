<template>
  <div class="rentals-container">
    <button @click="openModal" class="add-rental-button">
      Dodaj wypożyczenie
    </button>
    <Table :columns="columns" :data="rentals" />

    <DynamicForm
      v-if="isModalVisible"
      :formTitle="'Dodaj nowe wypożyczenie'"
      :formFields="formFields"
      @form-submitted="addRental"
      @close-modal="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import Table from "../organisms/Table/Table.vue";
import DynamicForm from "../organisms/FormsFields/FormsField.vue";
import { getToken } from "@/services/keycloak.service";
import rentalData from "./pseudoData/Rentals.json";
import { Rental, formFields } from "../organisms/FormsFields/RentFormFields";
import {
  openModal,
  closeModal,
  isModalVisible,
} from "../organisms/Modal/ModalService";

const rentals = ref([]);

const columns = [
  { key: "id", label: "ID" },
  { key: "customerId", label: "ID Klienta" },
  { key: "carBrand", label: "Marka" },
  { key: "carModel", label: "Model" },
  { key: "totalCost", label: "cena" },
  { key: "carId", label: "ID Samochodu" },
  { key: "startDate", label: "Data rozpoczęcia" },
  { key: "finishDate", label: "Data zakończenia" },
  { key: "status", label: "Status" },
];

const fetchRentals = async () => {
  try {
    const token = getToken();

    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const response = await axios.get<Rental[]>(
      "http://localhost:8081/api/rentals/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    rentals.value = response.data;
    console.log(rentals.value);
  } catch (err) {
    console.error("Błąd przy pobieraniu danych: ", err);
  }
};

const addRental = async (newRental: Rental) => {
  try {
    const token = getToken();

    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const response = await axios.post<Rental>(
      "http://localhost:8081/api/rentals",
      newRental,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    rentals.value.push(response.data);
    closeModal();
  } catch (err) {
    console.error("Błąd dodawania wypożyczenia: ", err);
  }
};

onMounted(() => {
  fetchRentals();
});
</script>

<style scoped>
.rentals-container {
  padding: 2rem;
}

.add-rental-button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.add-rental-button:hover {
  background-color: #0056b3;
}
</style>
