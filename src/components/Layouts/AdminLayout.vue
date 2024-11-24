<template>
  <div class="admin-container">
    <Sidebar />
    <button v-if="!authStore.isAuthenticated" @click="handleLogin">
      Zaloguj się
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
import Sidebar from "../Admin/organisms/Sidebar/Sidebar.vue";

const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    authStore.login();
  } catch (err) {
    console.error("Cant login");
  }
};
</script>

<style lang="scss" scoped></style>
