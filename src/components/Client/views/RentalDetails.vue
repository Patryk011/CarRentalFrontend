<template>
  <div>
    <Banner text="Wypożycz auto dopasowane do siebie" />
    <h2>Wynajem #{{ rental?.id }}</h2>
    <p>Car ID: {{ rental?.carId }}</p>
    <p>Start: {{ rental?.startDate }}</p>
    <p>End: {{ rental?.finishDate }}</p>
    <p>Koszt całkowity: {{ rental?.totalCost }} zł</p>

    <button @click="handlePayment">Zapłać</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import Banner from "../atoms/Banner/Banner.vue";

interface RentalDTO {
  id: number;
  carId: number;
  customerId: number;
  startDate: string;
  finishDate: string;
  status: string;
  totalCost: number;
}

const route = useRoute();
const rentalId = parseInt(route.params.id as string, 10);
const rental = ref<RentalDTO | null>(null);
const user = ref(null);

async function fetchRental() {
  try {
    const token = getToken();
    if (!token) {
      console.error("No Keycloak token");
      return;
    }
    const response = await axios.get(
      `http://localhost:8081/api/rentals/${rentalId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    rental.value = response.data;
  } catch (err) {
    console.error("Error fetching rental data:", err);
  }
}

console.log(rental);

async function getCurrentUser() {
  try {
    const token = getToken();
    if (!token) {
      console.error("No Keycloak token");
      return;
    }

    const response = await fetch("http://localhost:8081/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }

    user.value = await response.json();
    console.log("User data:", user.value);
  } catch (err) {
    console.error("Error fetching current user:", err);
  }
}

async function createPayment(paymentData) {
  try {
    const token = getToken();
    if (!token) {
      console.error("No Keycloak token");
      return;
    }

    const response = await axios.post(
      "http://localhost:8081/api/payments",
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error creating payment:", err);
    throw err;
  }
}

const handlePayment = async () => {
  if (!rental.value) return;

  try {
    const paymentData = {
      amount: rental.value.totalCost,
      customerId: rental.value.customerId,
      rentalId: rental.value.id,
      description: "Rental payment",
    };

    const { redirectUri } = await createPayment(paymentData);
    window.location.href = redirectUri;
  } catch (err) {
    console.error("Error handling payment:", err);
  }
};

onMounted(() => {
  fetchRental();
  getCurrentUser();
});
</script>

<style lang="scss" scoped>
button {
  margin-top: 10em;
}
</style>
