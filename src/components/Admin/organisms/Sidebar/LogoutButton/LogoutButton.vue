<template>
  <button class="logout-btn" @click="logout">
    <Icon iconType="Logout" color="#f1f5f9" />
    <span class="logout-text"> {{ text }} </span>
  </button>
</template>

<script setup lang="ts">
import Icon from "@/components/Shared/atoms/Icon/Icon.vue";
import { useAuthStore } from "@/store/authStore";
import { ILogoutButtonProps } from "./LogoutButton.types";

const authStore = useAuthStore();

defineProps<ILogoutButtonProps>();

const logout = async () => {
  try {
    authStore.logout();
  } catch (err) {
    console.error("Cant logout");
  }
};
</script>

<style lang="scss" scoped>
.logout-btn {
  --hover-color: rgba(255, 255, 255, 0.05);

  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: auto;
  background-color: transparent;
  color: white;
  border: none;
  padding: 0.5rem 1rem;

  .logout-text {
    font-weight: 600;
    font-size: 1rem;
    margin-left: 1rem;
  }

  &:hover {
    background-color: var(--hover-color);
  }
}
</style>
