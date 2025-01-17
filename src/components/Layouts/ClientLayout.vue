<template>
  <div class="client-view">
    <header class="main-header">
      <div class="header-wrapper">
        <nav class="navigation">
          <Logo />

          <NavigationMenu :navItems />

          <MenuInfo />
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>
    <footer>
      <div class="footer-container">
        &copy; 2024 Wypożyczalnia samochodów. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavigationMenu from "../Client/organisms/Navbar/NavigationMenu.vue";
import Logo from "../Shared/atoms/Logo/Logo.vue";
import MenuInfo from "../Client/organisms/Navbar/MenuInfo.vue";

const navItems = ref([
  { name: "Wynajem auta", link: "/wynajem-auta" },
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
    height: 6.5em;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 10px 0px;
    z-index: 99;

    .header-wrapper {
      display: flex;
      justify-content: center;
      max-width: 1200px;
      align-items: center;
      margin: 0 auto;
      padding: 0.5em 2em;

      .navigation {
        display: flex;
        align-items: center;
        width: 100%;
        height: 10%;
        justify-content: space-between;
        padding-top: 1em;
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
