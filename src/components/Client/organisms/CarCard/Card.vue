<template>
  <div class="car-card">
    <CardHeader
      :brand="`${car.carBrandName} ${car.carModelName}`"
      :price="`od ${(car.pricePerHour / 100) * 24} zł / dzień`"
    />
    <div class="content">
      <img
        :src="getCarImagePath(car.carBrandName, car.carModelName)"
        alt="Car image"
      />
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
import CardHeader from "./CardHeader/CardHeader.vue";
import { ICardProps } from "./Card.types";
import { getCarImagePath, translate } from "@/utils/carUtils";

const props = defineProps<ICardProps>();

const { car } = props;

const items = ref([
  { key: "Skrzynia biegów", value: translate(car.transmission) },
  { key: "Ilość miejsc", value: `${car.seats} osobowy` },
  { key: "Rodzaj paliwa", value: translate(car.fuelType) },
  { key: "Rok produkcji", value: car.productionYear },
  { key: "Pojemność silnika", value: (car.engineCapacity / 1000).toFixed(1) },
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
  padding: 1em;
  background: #fff;
  margin: 0 auto;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.05);
  width: 50%;

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
    align-items: stretch;
    font-size: 13px;
    gap: 2em;

    img {
      height: 200px;
      width: 250px;
    }

    .separator {
      border-right: 1px solid #ddd;
      height: auto; /* Adjusts to match the parent height */
      margin: 0; /* Removes any margin issues */
    }

    .offer-content {
      display: flex;
      flex-direction: column;
      gap: 1.5em;
      flex-grow: 1; /* Fills available space to align properly */

      button {
        border: none;
        padding: 1em;
        border-radius: 0.1em;
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        height: 3em;
        margin-top: auto;
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
