<template>
  <ul class="menu-navbar">
    <li v-for="(item, index) in navItems" :key="index">
      <router-link :to="item.link" class="menu-link">
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface NavItem {
  name: string;
  link: string;
}

defineProps<{
  navItems: NavItem[];
}>();
</script>
<style lang="scss" scoped>
.menu-navbar {
  display: flex;
  justify-content: start;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  gap: 2.5em;
  padding-left: 3em;

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
</style>
