<template>
  <div class="account-container"></div>
</template>

<script setup lang="ts">
import { getToken } from "@/services/keycloak.service";
import axios from "axios";
import { ref } from "vue";

const customer = ref({});
const rentals = ref([]);

const getCustomerInfo = async () => {
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

    customer.value = await response.json();
    console.log("customer data:", customer.value);
  } catch (err) {
    console.error("Error fetching current customer:", err);
  }
};

const fetchRentals = async () => {
  try {
    const token = getToken();

    if (!token) {
      console.error("No token");
      return;
    }

    const response = await axios.get("http://localhost:8081/api/rentals/all", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    rentals.value = response.data;
  } catch (error) {
    console.error("errror fetching rentals", error);
  }
};

const cancelRental = async (rentalId: number) => {
  try {
    const token = getToken();

    if (!token) {
      console.error("no token");
      return;
    }
    const response = await axios.patch(
      `http://localhost:8081/api/rentals/${rentalId}/cancel`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Rental canceled:", response.data);

    await fetchRentals();
  } catch (err) {
    console.error("Error canceling rental:", err);
  }
};
</script>
