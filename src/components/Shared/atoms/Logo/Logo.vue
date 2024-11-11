<template>
  <div class="header-logo">
    <router-link :to="to">
      <img src="@/assets/logo.png" alt="Company Logo" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ILogoProps } from "./Logo.types";

withDefaults(defineProps<ILogoProps>(), {
  to: "/",
});
</script>
