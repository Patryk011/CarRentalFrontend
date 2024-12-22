<template>
  <div class="users-container">
    <div v-for="column in columns" :key="column.key">
      {{ column.label }}
      <div v-for="user in users" :key="user.id">
        {{ user[column.key] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";

const users = ref([]);

const columns = [
  { key: "id", label: "ID" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone Number" },
  { key: "birthDate", label: "Birth Date" },
  { key: "licenseNumber", label: "License Number" },
  { key: "address", label: "Address" },
  { key: "registrationDate", label: "Registration Date" },
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

<style lang="scss" scoped>
.users-container {
  display: flex;
  gap: 2em;
}
</style>
