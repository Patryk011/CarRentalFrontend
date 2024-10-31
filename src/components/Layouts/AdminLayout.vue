<template>
  <div>ADMIN</div>
  <div>
    <button v-if="!authStore.isAuthenticated" @click="handleLogin">
      Zaloguj się
    </button>
    <button v-else @click="handleLogout">Wyloguj się</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    authStore.login();
  } catch (err) {
    console.error("Cant login");
  }
};

const handleLogout = async () => {
  try {
    authStore.logout();
  } catch (err) {
    console.error("Cant login");
  }
};
</script>
