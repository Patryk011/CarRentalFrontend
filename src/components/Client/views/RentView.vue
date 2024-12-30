<template>
  <div class="cars"><Card v-for="car in cars" :key="car.id" :car /></div>
</template>

<script setup lang="ts">
import axios from "axios";
import Card from "../organisms/CarCard/Card.vue";
import { onMounted, ref } from "vue";
import { ICar } from "../organisms/CarCard/Card.types";

const cars = ref<ICar[]>();

const fetchCars = async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/Cars/all");
    cars.value = response.data;
    console.log(cars.value);
  } catch (err) {
    console.error("Error fetching cars: ", err);
  }
};

onMounted(() => {
  fetchCars();
});
</script>

<style lang="scss" scoped>
.cars {
  display: flex;
  flex-direction: column;
  gap: 2em;
}
</style>
