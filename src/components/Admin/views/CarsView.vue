<template>
  <div class="cars-container">
    <button @click="openModal" class="add-car-button">Dodaj auto</button>
    <Table :columns="columns" :data="cars" :actions="actions" />
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
import { onMounted } from "vue";
import Table from "../organisms/Table/Table.vue";
import FormsField from "../organisms/FormsFields/FormsField.vue";
import { CarDTO, formFields } from "../organisms/FormsFields/CarFormFields";
import {
  openModal,
  closeModal,
  isModalVisible,
} from "../organisms/Modal/ModalService";
import useCars from "@/composables/useCars";

const { cars, fetchCars, addCar, blockCar, unblockCar } = useCars();

const columns = [
  { key: "id", label: "ID" },
  { key: "registrationNumber", label: "Numer rejestracyjny" },
  { key: "carBrandName", label: "Marka" },
  { key: "carModelName", label: "Model" },
  { key: "state", label: "Stan" },
  { key: "vin", label: "VIN" },
  { key: "productionYear", label: "Rok produkcji" },
  { key: "color", label: "Kolor" },
  { key: "pricePerDay", label: "Cena za godzinę" },
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

onMounted(() => {
  fetchCars();
});
</script>

<style>
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

  .block-button {
    background-color: red;
    color: white;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .block-button:hover {
    background-color: darkred;
  }

  .unblock-button {
    background-color: green;
    color: white;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .unblock-button:hover {
    background-color: darkgreen;
  }
}
</style>
