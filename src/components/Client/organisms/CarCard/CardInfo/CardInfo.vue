<template>
  <ul class="car-info-list">
    <li v-for="(item, index) in items" :class="{ dotted: showDot }">
      <span v-if="item.key" class="key"> {{ item.key }}: </span>
      <span class="value"> {{ item.value }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ICardInfoProps } from "./CardInfo.types";

defineProps<ICardInfoProps>();
</script>
<style lang="scss" scoped>
.car-info-list {
  list-style: none;
  padding: 0.5em;
  margin: 0;

  li {
    padding-top: 0.7em;

    &.dotted::before {
      content: "●";
      color: red;
      font-size: 0.8em;
      padding-right: 1em;
    }
    .key {
      font-weight: bold;
    }
  }
}
</style>
