<template>
  <div class="brands-container">
    <button @click="addBrandModal = true" class="add-brand-button">
      Dodaj markę
    </button>

    <FormsField
      v-if="addBrandModal"
      :formTitle="'Dodaj nową markę'"
      :formFields="formFields"
      @form-submitted="handleFormSubmitted"
      @close-modal="addBrandModal = false"
    />

    <Table :data="brands" :columns="tableColumns" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import Table from "../organisms/Table/Table.vue";
import FormsField from "../organisms/FormsFields/FormsField.vue";
import { CarBrandDTO } from "../organisms/FormsFields/BrandFormFields";
import { formFields } from "../organisms/FormsFields/BrandFormFields";

const brands = ref<CarBrandDTO[]>([]);
const addBrandModal = ref(false);

const tableColumns = [
  { key: "id", label: "ID" },
  { key: "brand", label: "Marka" },
];

const fetchBrands = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No keycloak token");
      return;
    }
    const response = await axios.get<CarBrandDTO[]>(
      "http://localhost:8081/api/carBrands/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    brands.value = response.data;
  } catch (error) {
    console.error("Błąd pobierania marek:", error);
  }
};

const handleFormSubmitted = async (addBrand: { brand: string }) => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No keycloak token");
      return;
    }
    const response = await axios.post<CarBrandDTO>(
      "http://localhost:8081/api/carBrands",
      addBrand,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    brands.value.push(response.data);
    addBrandModal.value = false;
  } catch (error) {
    console.error("Błąd dodawania marki:", error);
  }
};

onMounted(() => {
  fetchBrands();
});
</script>

<style lang="scss" scoped>
.brands-container {
  padding: 2rem;

  .add-brand-button {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  .add-brand-button:hover {
    background-color: #0056b3;
  }
}
</style>
