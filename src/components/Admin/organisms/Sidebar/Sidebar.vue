<template>
  <aside :class="{ 'is-expanded': isExpanded }">
    <MenuToggle :isExpanded @toggle="toggleSidebar" />
    <nav class="menu">
      <SidebarItem to="/admin" icon="Home" text="Home" />
    </nav>

    <div class="flex"></div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MenuToggle from "../MenuToggle/MenuToggle.vue";
import SidebarItem from "./SidebarItem/SidebarItem.vue";

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
  background-color: #f2f2f2;
  width: calc(2rem + 32px);
  transition: width 0.2 ease-in-out;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

  .flex {
    flex: 1 1 0;
  }

  .menu {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &.is-expanded {
    width: 250px;
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
