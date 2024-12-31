<template>
  <div class="menu-info">
    <div class="phone-contact">
      <Icon iconType="Phone" :width="28" :height="28" color="#e60000" />
      <span>+48 99 999 99 99</span>
    </div>

    <div class="login-dropdown">
      <Icon
        iconType="Login"
        :width="32"
        :height="32"
        color="#58595d"
        hoverColor="#e60000"
        @click.prevent="moveToAccount"
      />
      <div class="dropdown-content">
        <a href="#" @click.prevent="moveToAccount">{{ accountLinkText }}</a>
        <a href="#" @click.prevent="handleAuthAction">{{ authActionText }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Shared/atoms/Icon/Icon.vue";
import { useAuthStore } from "@/store/authStore";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

const moveToAccount = () => {
  router.push("account");
};

const handleAuthAction = () =>
  authStore.isAuthenticated ? authStore.logout() : authStore.register();

const accountLinkText = computed(() =>
  authStore.isAuthenticated ? "Moje konto" : "Zaloguj się"
);

const authActionText = computed(() =>
  authStore.isAuthenticated ? "Wyloguj się" : "Zarejestruj się"
);
</script>

<style lang="scss" scoped>
.menu-info {
  display: flex;
  align-items: center;
  gap: 1.5em;
  padding-right: 2em;

  .phone-contact {
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: #e60000;
    font-size: 1rem;
  }

  .login-dropdown {
    position: relative;
    cursor: pointer;

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: white;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      overflow: hidden;

      a {
        color: #333;
        padding: 0.5em 1em;
        text-decoration: none;
        display: block;
        width: 10em;

        &:hover {
          background-color: #f1f1f1;
        }
      }
    }

    &:hover {
      .dropdown-content {
        display: block;
      }

      :deep(svg) {
        fill: #e60000;
      }
    }
  }
}
</style>
