<template>
  <Banner text="Wynajem auta" />
  <div class="rent-container">
    <aside class="filters">
      <CarsFilter @filter="fetchAvailableCars" />
      <button class="show-all" @click="fetchCars">Pokaż wszystkie auta</button>
    </aside>
    <main class="cars">
      <Card v-for="car in cars" :key="car.id" :car="car" />
    </main>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import Card from "../organisms/CarCard/Card.vue";
import { onMounted, ref } from "vue";
import { ICar } from "../organisms/CarCard/Card.types";
import Banner from "../atoms/Banner/Banner.vue";
import CarsFilter from "../atoms/CarsFilter/CarsFilter.vue";

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

const fetchAvailableCars = async ({ startDate, endDate }) => {
  try {
    const response = await axios.get(
      "http://localhost:8081/api/Cars/available",
      {
        params: { startDate, endDate },
      }
    );
    cars.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchCars();
});
</script>

<style lang="scss" scoped>
.rent-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2em;

  width: 100%;
  margin: 0 auto;

  .filters {
    display: flex;
    flex-direction: column;
    gap: 2em;

    .show-all {
      font-size: 0.9rem;
      font-weight: bold;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: underline;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .cars {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    margin-top: 0;

    padding: 0 4em;
  }
}

@media (max-width: 1024px) {
  .rent-container {
    flex-direction: column;
    align-items: center;
  }

  .filters {
    flex: none;
    width: 100%;
    max-width: 500px;
  }

  .cars {
    width: 100%;
    max-width: 500px;
  }
}
</style>
