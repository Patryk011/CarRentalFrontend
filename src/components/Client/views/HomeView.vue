<template>
  <div>HOME</div>
  <button @click="handlePayment">Pay now</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";

async function createPayment(paymentData) {
  try {
    const token = getToken();

    if (!token) {
      console.error("No keycloak token");
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
    console.error("Erorr payment ", err);
    throw err;
  }
}

const handlePayment = async () => {
  try {
    const paymentData = {
      amount: 110,
      customerEmail: "test1@test1.pl",
      description: "Rental payment",
    };

    const { orderId, redirectUri } = await createPayment(paymentData);
    window.location = redirectUri;
  } catch (err) {
    console.error("err", err);
  }
};
</script>
