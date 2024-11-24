<template>
  <div class="menu-toggle-wrap">
    <button class="menu-toggle" @click="toggle">
      <Icon
        iconType="RightArrows"
        color="gray"
        :class="{ rotated: isExpanded }"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Shared/atoms/Icon/Icon.vue";
import { defineEmits } from "vue";
import { IMenuToggleProps } from "./MenuToggle.types";

defineProps<IMenuToggleProps>();

const emit = defineEmits<{
  (e: "toggle"): void;
}>();

const toggle = () => {
  emit("toggle");
};
</script>

<style lang="scss" scoped>
.menu-toggle-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  position: relative;
  top: 0;

  .menu-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
}
.rotated {
  transform: rotate(-180deg);
}
</style>
