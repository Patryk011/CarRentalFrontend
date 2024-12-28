<template>
  <div class="header">
    <span class="brand"> {{ brand }} </span>
    <span class="price"> {{ price }}</span>
  </div>
</template>

<script setup lang="ts">
import { ICarHeaderProps } from "./CardHeader.types";

defineProps<ICarHeaderProps>();
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  padding-bottom: 0.5em;

  .brand {
    font-size: 22px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .price {
    font-size: 18px;
  }
}
</style>
