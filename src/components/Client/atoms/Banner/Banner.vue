<template>
  <div class="banner">{{ text }}</div>
</template>

<script setup lang="ts">
import { IBannerProps } from "./Banner.types";

defineProps<IBannerProps>();
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 3em;
  margin-top: 4.8%;
  background: linear-gradient(90deg, #000000, #4e4c4c);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-family: Arial, sans-serif;
  font-weight: bold;
}
</style>
