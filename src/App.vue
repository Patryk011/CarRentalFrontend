<template>
  <div class="app-container">
    <header class="main-header">
      <div class="header-wrapper">
        <div class="header-logo">
          <a href="/">
            <img src="./assets/logo.png" alt="" />
          </a>
        </div>
      </div>
    </header>
    <footer>
      &copy; 2024 Wypożyczalnia samochodów. Wszelkie prawa zastrzeżone.
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  position: relative;
  width: 100%;
  height: 100%;

  .main-header {
    background-color: #3b6398;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;

    .header-wrapper {
      display: flex;
    }
  }

  footer {
    width: 100%;
    display: flex;
    background-color: #333;
    position: fixed;
    color: white;
    text-align: center;
    padding: 40px;
    bottom: 0;
    left: 0;
  }
}
</style>
