<template>
  <aside :class="{ 'is-expanded': isExpanded }">
    <MenuToggle :isExpanded @toggle="toggleSidebar" />
    <nav class="menu">
      <h3>Menu</h3>
      <SidebarItem to="/admin" icon="Home" text="Panel" />
      <SidebarItem to="/admin/users" icon="Users" text="Użytkownicy" />
      <LogoutButton text="Wyloguj" />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MenuToggle from "./MenuToggle/MenuToggle.vue";
import SidebarItem from "./SidebarItem/SidebarItem.vue";
import LogoutButton from "./LogoutButton/LogoutButton.vue";

const isExpanded = ref(false);

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;
  background-color: #222b2d;
  width: 60px;
  transition: width 0.3s ease-in-out;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;

  .menu {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5rem;
    margin: 0 -1rem;
  }

  h3 {
    display: none;
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 200;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    padding-left: 1.2rem;
    transition: opacity 0.3s ease-in-out;
  }

  &.is-expanded {
    width: 250px;

    h3 {
      display: block;
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
    height: 100%;
    left: 0;
    top: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;

    &.is-expanded {
      transform: translateX(0);
    }
  }
}
</style>
