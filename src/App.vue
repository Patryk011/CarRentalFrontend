<template>
  <div class="app-container">
    <header class="main-header">
      <div class="header-wrapper">
        <div class="header-logo">
          <a href="/">
            <img src="./assets/logo.png" alt="" />
          </a>
        </div>
        <nav class="navigation">
          <ul class="menu-navbar">
            <li v-for="(item, index) in navItems" :key="index">
              <a :href="item.link" class="menu-link"> {{ item.name }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="main-content"></div>
    <footer>
      <div class="footer-container">
        &copy; 2024 Wypożyczalnia samochodów. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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

<style lang="scss" scoped>
.app-container {
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
      flex-wrap: wrap;
      max-width: 1260px;
      align-items: center;
      margin: 0 auto;
      margin-top: 10px;

      .navigation {
        width: 100%;
        padding-top: 15px;

        .menu-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          list-style: none;

          .menu-link {
            height: 40px;
            width: 40px;
            line-height: 40px;
            padding: 0;
            white-space: nowrap;
            text-align: center;
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
      max-width: 1260px;
      margin: 0 auto;
      text-align: left;
    }
  }

  .menu-link {
    text-decoration: none;
    max-width: 100%;
    font-weight: bold;
    color: #58595d;

    &:hover {
      color: #e60000;
    }
  }
}
</style>
