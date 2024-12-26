<template>
  <div class="cars-container">
    <Table :columns="columns" :data="cars" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import Table from "../organisms/Table/Table.vue";

const cars = ref([
  {
    id: 1,
    registrationNumber: "AB123CD",
    brand: "Citroen",
    model: "C4",
    purchaseDate: "2023-01-15",
    state: "AKTYWNY",
    vin: "1HGCM82633A123456",
    productionYear: "2020",
    color: "Czerwony",
    pricePerHour: 50,
    transmission: "AUTOMATYCZNA",
    fuelType: "BENZYNA",
    seats: 5,
    lastServiceDate: "2023-06-20",
    nextServiceDate: "2024-06-20",
    engineCapacity: 2.0,
  },
  {
    id: 2,
    registrationNumber: "EF456GH",
    brand: "Mercedez Benz",
    model: "AMG630",
    purchaseDate: "2022-05-10",
    state: "W SERWISIE",
    vin: "3FAHP0HA6AR123457",
    productionYear: "2019",
    color: "Niebieski",
    pricePerHour: 45,
    transmission: "MANUALNA",
    fuelType: "DIESEL",
    seats: 4,
    lastServiceDate: "2023-08-15",
    nextServiceDate: "2024-08-15",
    engineCapacity: 1.8,
  },
  {
    id: 3,
    registrationNumber: "IJ789KL",
    brand: "Tesla",
    model: "X",
    purchaseDate: "2021-09-30",
    state: "AKTYWNY",
    vin: "5N1AR2MN4FC123458",
    productionYear: "2018",
    color: "Czarny",
    pricePerHour: 40,
    transmission: "AUTOMATYCZNA",
    fuelType: "ELEKTRYCZNY",
    seats: 5,
    lastServiceDate: "2022-12-01",
    nextServiceDate: "2023-12-01",
    engineCapacity: 0.0,
  },
  {
    id: 4,
    registrationNumber: "KL123MN",
    brand: "Honda",
    model: "Civic",
    purchaseDate: "2020-07-15",
    state: "AKTYWNY",
    vin: "2HGFA16539H123459",
    productionYear: "2017",
    color: "Biały",
    pricePerHour: 55,
    transmission: "AUTOMATYCZNA",
    fuelType: "BENZYNA",
    seats: 4,
    lastServiceDate: "2023-05-10",
    nextServiceDate: "2024-05-10",
    engineCapacity: 1.6,
  },
  {
    id: 5,
    registrationNumber: "OP456QR",
    brand: "Hundai",
    model: "Quashqai",
    purchaseDate: "2023-03-12",
    state: "W SERWISIE",
    vin: "4T1BG22KXXU123460",
    productionYear: "2021",
    color: "Srebrny",
    pricePerHour: 60,
    transmission: "AUTOMATYCZNA",
    fuelType: "HYBRYDA",
    seats: 5,
    lastServiceDate: "2023-09-01",
    nextServiceDate: "2024-09-01",
    engineCapacity: 2.5,
  },
  {
    id: 6,
    registrationNumber: "ST789UV",
    brand: "Skoda",
    model: "Octavia",
    purchaseDate: "2021-11-05",
    state: "AKTYWNY",
    vin: "WAUZZZ8K49A123461",
    productionYear: "2016",
    color: "Zielony",
    pricePerHour: 38,
    transmission: "MANUALNA",
    fuelType: "BENZYNA",
    seats: 5,
    lastServiceDate: "2022-06-20",
    nextServiceDate: "2023-06-20",
    engineCapacity: 1.4,
  },
  {
    id: 7,
    registrationNumber: "WX123YZ",
    brand: "BMW",
    model: "E 63X",
    purchaseDate: "2019-04-20",
    state: "AKTYWNY",
    vin: "VF1C57C062123462",
    productionYear: "2015",
    color: "Szary",
    pricePerHour: 30,
    transmission: "MANUALNA",
    fuelType: "DIESEL",
    seats: 7,
    lastServiceDate: "2023-04-20",
    nextServiceDate: "2024-04-20",
    engineCapacity: 1.9,
  },
  {
    id: 8,
    registrationNumber: "YZ456AB",
    brand: "Suzuki",
    model: "Vitara",
    purchaseDate: "2022-02-10",
    state: "W SERWISIE",
    vin: "JHMFA16539S123463",
    productionYear: "2018",
    color: "Żółty",
    pricePerHour: 42,
    transmission: "AUTOMATYCZNA",
    fuelType: "BENZYNA",
    seats: 4,
    lastServiceDate: "2023-02-15",
    nextServiceDate: "2024-02-15",
    engineCapacity: 1.5,
  },
  {
    id: 9,
    registrationNumber: "CD789EF",
    brand: "Opel",
    model: "Astra",
    purchaseDate: "2023-06-25",
    state: "AKTYWNY",
    vin: "5YJSA1E26JF123464",
    productionYear: "2022",
    color: "Błękitny",
    pricePerHour: 70,
    transmission: "AUTOMATYCZNA",
    fuelType: "ELEKTRYCZNY",
    seats: 5,
    lastServiceDate: "2023-08-10",
    nextServiceDate: "2024-08-10",
    engineCapacity: 0.0,
  },
]);

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
