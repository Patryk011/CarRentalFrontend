<template>
  <div class="car-card">
    <div class="header">
      <h3 class="brand">TOYOTA YARIS</h3>
      <span class="price">od 1421 zł / dzień</span>
    </div>
    <div class="content">
      <img src="../../../../assets/cars/yaris.webp" alt="" />
      <CardInfo :items />
      <div class="separator" />
      <div class="offer-content">
        <CardInfo :items="additionals" :show-dot="true" />
        <button class="offer">Zobacz ofertę</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CardInfo from "./CardInfo/CardInfo.vue";

const items = ref([
  { key: "Skrzynia biegów", value: "Manualna" },
  { key: "Ilość miejsc", value: "5 osobowy" },
  { key: "Rodzaj paliwa", value: "Benzyna" },
  { key: "Bagażnik", value: "3" },
]);

const additionals = ref([
  {
    value: "Brak kaucji",
  },
  {
    value: "Serwis, Opony, Ubezpieczenie w cenie",
  },
  {
    value: "Brak limitu kilometrów",
  },
  {
    value: "Elastyczność każdego dnia",
  },
]);
</script>

<style lang="scss" scoped>
.car-card {
  padding: 1em 1em;
  background: #fff;
  margin: 0 auto;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);

  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1em;
    padding-bottom: 0.5em;

    .brand {
      font-size: 22px;
    }

    .price {
      font-size: 20px;
    }
  }

  .content {
    display: flex;
    font-size: 13px;
    gap: 2em;

    .separator {
      border-right: 1px solid #ddd;
    }

    .offer-content {
      display: flex;
      flex-direction: column;
      gap: 1.5em;

      button {
        border: none;
        padding: 1em;
        border-radius: 0.1em;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        height: 50%;
      }

      .offer {
        background-color: red;

        &:hover {
          background-color: #c70202;
        }
      }
    }
  }
}
</style>
