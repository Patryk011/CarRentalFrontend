<template>
  <Banner text="Wypożycz auto dopasowane do siebie" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import Banner from "../atoms/Banner/Banner.vue";

const user = ref(null);

async function getCurrentUser() {
  try {
    const token = getToken();
    if (!token) {
      console.error("No Keycloak token");
      return;
    }

    const response = await fetch("http://localhost:8081/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }

    const user = await response.json();
    console.log("User data:", user);
    return user;
  } catch (err) {
    console.error("Error fetching current user:", err);
  }
}

onMounted(() => {
  getCurrentUser();
});
</script>
<style lang="scss" scoped>
button {
  margin-top: 10em;
}
</style>
