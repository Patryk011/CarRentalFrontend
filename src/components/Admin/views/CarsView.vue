<template>
  <div class="cars-container">
    <Table :columns="columns" :data="cars" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import carsData from "./pseudoData/Cars.json";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import Table from "../organisms/Table/Table.vue";

const cars = ref(carsData);

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
    console.error("Error fetching cars: ", err);
  }
};

onMounted(() => {
  fetchCars();
});
</script>
