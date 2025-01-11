<template>
  <div class="models-container">
    <button @click="addModelModal = true" class="add-model-button">
      Dodaj model
    </button>

    <FormsField
      v-if="addModelModal"
      :formTitle="'Dodaj nowy model'"
      :formFields="formFields"
      @form-submitted="handleFormSubmitted"
      @close-modal="addModelModal = false"
    />

    <Table :data="carModels" :columns="tableColumns" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import Table from "../organisms/Table/Table.vue";
import FormsField from "../organisms/FormsFields/FormsField.vue";
import { formFields } from "../organisms/FormsFields/ModelFormFields";
import {
  CarModelDTO,
  CarBrandDTO,
} from "../organisms/FormsFields/ModelFormFields";

const carModels = ref<CarModelDTO[]>([]);
const brands = ref<CarBrandDTO[]>([]);
const addModelModal = ref(false);

const tableColumns = [
  { key: "id", label: "ID" },
  { key: "carBrandName", label: "Marka" },
  { key: "model", label: "Model" },
];

const fetchBrands = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("Brak tokena Keycloak. Użytkownik może być niezalogowany.");
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

    const brandOptions = brands.value.map((brand) => ({
      value: brand.id,
      label: brand.brand,
    }));

    const brandField = formFields.find((field) => field.name === "brandId");
    if (brandField) {
      brandField.options = brandOptions;
    }
  } catch (error) {
    console.error("Błąd pobierania marek:", error);
  }
};

const fetchModels = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("Brak tokena Keycloak. Użytkownik może być niezalogowany.");
      return;
    }

    const response = await axios.get<CarModelDTO[]>(
      "http://localhost:8081/api/carModels/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    carModels.value = response.data;

    console.log("Processed models:", carModels.value);
  } catch (error) {
    console.error("Błąd pobierania modeli:", error);
  }
};

const handleFormSubmitted = async (formData: {
  modelName: string;
  brandId: { value: number; label: string };
}) => {
  try {
    const token = getToken();
    if (!token) {
      console.error("Brak tokena Keycloak. Użytkownik może być niezalogowany.");
      return;
    }

    const response = await axios.post<CarModelDTO>(
      "http://localhost:8081/api/carModels",
      {
        model: formData.modelName,
        carBrandId: formData.brandId.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { carBrandId, ...rest } = response.data;
    const carBrandName =
      brands.value.find((brand) => brand.id === carBrandId)?.brand ||
      "Nieznana marka";

    carModels.value.push({
      ...rest,
      carBrandId,
      carBrandName,
    });

    addModelModal.value = false;
  } catch (error) {
    console.error("Błąd dodawania modelu:", error);
  }
};
onMounted(async () => {
  await fetchBrands();
  await fetchModels();
});
</script>

<style lang="scss" scoped>
.models-container {
  padding: 2rem;

  .add-model-button {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  .add-model-button:hover {
    background-color: #0056b3;
  }
}
</style>
