<template>
  <div class="sidebar-item-wrapper">
    <router-link :to :class="['sidebar-item', { active: isActive }]">
      <div class="icon-wrapper">
        <Icon :iconType="icon" :color="iconColor" />
      </div>
      <span class="sidebar-text">{{ text }} </span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import Icon from "@/components/Shared/atoms/Icon/Icon.vue";
import { ISidebarItemProps } from "./SidebarItem.types";
import { useRoute } from "vue-router";

const props = defineProps<ISidebarItemProps>();

const route = useRoute();

const isActive = computed(() => route.path === props.to);

const iconColor = computed(() =>
  isActive.value ? "var(--active-color)" : "gray"
);
</script>
<style lang="scss" scoped>
.sidebar-item-wrapper {
  --hover-color: #bdbbbb;
  --active-bg-color: #dbdbdb;
  --active-color: #e60000;
  --text-color: #2a2a2b;

  .sidebar-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    padding: 0.5rem 0;
    color: var(--text-color);
    background-color: transparent;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

    &:hover {
      background-color: var(--hover-color);

      .icon-wrapper {
        transform: scale(1.1);
        transition: transform 0.3s ease-in-out;
      }
    }

    &.active {
      background-color: var(--active-bg-color);
      color: var(--active-color);
    }

    .sidebar-text {
      padding-top: 0.2rem;
      font-size: 1rem;
      font-weight: 600;
    }
  }
}
</style>
