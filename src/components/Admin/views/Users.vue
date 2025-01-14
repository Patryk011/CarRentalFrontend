<template>
  <div class="users-container">
    <Table :columns="columns" :data="users" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import Table from "../organisms/Table/Table.vue";
import { Customer } from "../organisms/FormsFields/CustomerFormFields";

const users = ref<Customer[]>([]);

const columns = [
  { key: "id", label: "ID" },
  { key: "firstName", label: "Imię" },
  { key: "lastName", label: "Nazwisko" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Numer telefonu" },
  { key: "birthDate", label: "Data urodzenia" },
  { key: "licenseNumber", label: "Numer prawa jazdy" },
  { key: "address", label: "Adres" },
  { key: "registrationDate", label: "Data rejestracji" },
];

const fetchUsers = async () => {
  try {
    const token = getToken();

    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const response = await axios.get<Customer[]>(
      "http://localhost:8081/api/customers/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    users.value = response.data;
  } catch (err) {
    console.error("Błąd przy pobieraniu danych: ", err);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.users-container {
  padding: 2rem;
}

.add-user-button {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.add-user-button:hover {
  background-color: #0056b3;
}
</style>
