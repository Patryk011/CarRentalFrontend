<template>
  <div class="client-view">
    <header class="main-header">
      <div class="header-wrapper">
        <nav class="navigation" aria-label="Main Navigation">
          <div class="header-logo">
            <a href="/">
              <img src="../../assets/logo.png" alt="Company Logo" />
            </a>
          </div>

          <ul class="menu-navbar">
            <li v-for="(item, index) in navItems" :key="index">
              <a :href="item.link" class="menu-link">{{ item.name }}</a>
            </li>
          </ul>

          <div class="menu-quick-links">
            <div class="quick-link-item">
              <Icon iconType="Phone" :width="28" :height="28" color="#e60000" />
              <span>+48 99 999 99 99</span>
            </div>
            <button @click="handleLogin" class="login-button">
              <Icon
                iconType="Login"
                :width="32"
                :height="32"
                color="#58595d"
                hoverColor="#e60000"
              />
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main class="main-content"></main>

    <footer>
      <div class="footer-container">
        &copy; 2024 Wypożyczalnia samochodów. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";
import Icon from "../icons/Icon.vue";

const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    authStore.login();
  } catch (err) {
    console.error("Can't login");
  }
};

interface NavItem {
  name: string;
  link: string;
}

const navItems = ref<NavItem[]>([
  { name: "Wynajem auta", link: "/wynajem-auta" },
  { name: "Flota", link: "/flota" },
  { name: "O nas", link: "/o-nas" },
  { name: "FAQ", link: "/faq" },
  { name: "Kontakt", link: "/kontakt" },
]);
</script>
<style lang="scss">
.client-view {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;

  .main-header {
    background-color: #ffffff;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 10px 0px;

    .header-wrapper {
      display: flex;
      justify-content: center;
      max-width: 1200px;
      align-items: center;
      margin: 0 auto;
      padding: 10px 20px;

      .navigation {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        padding-top: 20px;

        .menu-navbar {
          display: flex;
          justify-content: center;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          flex: 1;
          gap: 2.5em;

          .menu-link {
            text-decoration: none;
            font-weight: bold;
            color: #58595d;
            padding: 10px 15px;

            &:hover,
            &:focus {
              color: #e60000;
            }
          }
        }

        .menu-quick-links {
          display: flex;
          align-items: center;
          gap: 1.5em;

          .quick-link-item {
            display: flex;
            align-items: center;
            gap: 0.5em;
            color: #e60000;
            font-size: 1rem;
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
      }
    }
  }

  .main-content {
    flex: 1;
  }

  footer {
    background-color: #222b2d;
    width: 100%;
    color: white;
    text-align: center;
    position: relative;
    padding: 40px 0;

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      text-align: left;
    }
  }
}
</style>
