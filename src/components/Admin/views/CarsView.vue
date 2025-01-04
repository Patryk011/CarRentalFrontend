<template>
  <div class="cars-container">
    <button @click="openModal" class="add-car-button">Dodaj auto</button>
    <Table :columns="columns" :data="cars" />
    <FormsField
      v-if="isModalVisible"
      :formTitle="'Dodaj nowe auto'"
      :formFields="formFields"
      @form-submitted="addCar"
      @close-modal="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import carsData from "./pseudoData/Cars.json";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import Table from "../organisms/Table/Table.vue";
import FormsField from "../organisms/FormsFields/FormsField.vue";
import { Car, formFields } from "../organisms/FormsFields/CarFormFields";
import {
  openModal,
  closeModal,
  isModalVisible,
} from "../organisms/Modal/ModalService";

const cars = ref<Car[]>(
  carsData.map((car) => ({
    ...car,
    productionYear: Number(car.productionYear),
  })) as Car[]
);

const columns = [
  { key: "id", label: "ID" },
  { key: "registrationNumber", label: "Numer rejestracyjny" },
  { key: "brand", label: "Marka" },
  { key: "model", label: "Model" },
  { key: "purchaseDate", label: "Data zakupu" },
  { key: "state", label: "Stan" },
  { key: "vin", label: "VIN" },
  { key: "productionYear", label: "Rok produkcji" },
  { key: "color", label: "Kolor" },
  { key: "pricePerHour", label: "Cena za godzinę" },
  { key: "transmission", label: "Skrzynia biegów" },
  { key: "fuelType", label: "Typ paliwa" },
  { key: "seats", label: "Ilość miejsc" },
  { key: "lastServiceDate", label: "Ostatni serwis" },
  { key: "nextServiceDate", label: "Następny serwis" },
  { key: "engineCapacity", label: "Pojemność silnika" },
];

const fetchCars = async () => {
  try {
    const token = getToken();

    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const response = await axios.get("http://localhost:8081/api/cars/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cars.value = response.data;
  } catch (err) {
    console.error("Błąd przy pobieraniu danych: ", err);
  }
};

const addCar = async (newCar: Car) => {
  try {
    const token = getToken();

    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const response = await axios.post<Car>(
      "http://localhost:8081/api/cars",
      newCar,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    cars.value.push(response.data);
    closeModal();
  } catch (err) {
    console.error("Błąd dodawania auta: ", err);
  }
};

onMounted(() => {
  fetchCars();
});
</script>

<style scoped>
.cars-container {
  padding: 2rem;
}

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
</style>
