<template>
  <div class="users-container">
    <Table :columns="columns" :data="users" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import usersData from "./pseudoData/Users.json";
import { getToken } from "@/services/keycloak.service";
import Table from "../organisms/Table/Table.vue";

const users = ref(usersData);

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

    const response = await axios.get(
      "http://localhost:8081/api/customers/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    users.value = response.data;
  } catch (err) {
    console.error("Error fetching users: ", err);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
