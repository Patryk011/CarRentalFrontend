<template>
  <div class="menu-info">
    <div class="phone-contact">
      <Icon iconType="Phone" :width="28" :height="28" color="#e60000" />
      <span>+48 99 999 99 99</span>
    </div>

    <div
      class="login-dropdown"
      @mouseenter="isDropDownVisible = true"
      @mouseleave="isDropDownVisible = false"
    >
      <button class="login-button">
        <Icon
          iconType="Login"
          :width="32"
          :height="32"
          color="#58595d"
          hoverColor="#e60000"
        />
      </button>
      <div v-if="isDropDownVisible" class="dropdown-content" @click.stop>
        <a href="#" @click.prevent="moveToAccount">Konto</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Shared/atoms/Icon/Icon.vue";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import { ref } from "vue";

const isDropDownVisible = ref(false);
const router = useRouter();

const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    authStore.login();
  } catch (err) {
    console.error("Can't login");
  }
};

const moveToAccount = () => {
  if (authStore.isAuthenticated) {
    router.push("/account");
  } else {
    authStore.login();
  }
};
</script>

<style lang="scss" scoped>
.menu-info {
  display: flex;
  align-items: center;
  gap: 1.5em;

  .phone-contact {
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: #e60000;
    font-size: 1rem;
  }

  .login-dropdown {
    position: relative;

    .login-button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0;
    }

    .dropdown-content {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      overflow: hidden;
      margin-top: 8px;
      a {
        color: #333;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: #f1f1f1;
        }
      }
    }
  }

  .login-button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
  }
}
</style>
