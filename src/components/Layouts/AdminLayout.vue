<template>
  <div class="admin-container">
    <Sidebar />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
import Sidebar from "../Admin/organisms/Sidebar/Sidebar.vue";
</script>

<style lang="scss" scoped></style>
