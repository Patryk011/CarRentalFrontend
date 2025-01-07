<template>
  <div class="rental-card">
    <h2 class="rental-title">Wynajem #{{ rental?.id }}</h2>
    <div class="rental-details">
      <div
        v-for="(detail, index) in rentailsDetails"
        :key="index"
        class="detail"
      >
        <span class="label">{{ detail.label }}</span>
        <span class="value"> {{ detail.value }} </span>
      </div>

      <div v-if="rental?.discountPercentage > 0" class="discount">
        <p>
          Dziękujemy za zaufanie nam po raz kolejny. W ramach odwdzięczenia
          naliczyliśmy Tobie rabat {{ rental?.discountPercentage }}%.
        </p>
      </div>
      <div class="detail total">
        <span class="label">Koszt:</span>
        <span v-if="rental?.discountPercentage > 0" class="without-discount"
          >{{ costWithoutDiscount.toFixed(2) }} zł</span
        >
        <span class="value"> {{ rental?.totalCost }} zł</span>
      </div>
    </div>
    <button @click="handlePayment" class="pay-button">Zapłać</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
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
  discountPercentage: number;
  carModel: string;
  carBrand: string;
  registrationNumber: string;
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

const getCurrentUser = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No Keycloak token");
      return;
    }

    console.log(token);

    const response = await axios.get("http://localhost:8081/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    user.value = response.data;
    console.log("user data:", user.value);
  } catch (err) {
    console.error("Error fetching current user:", err);
  }
};

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

const costWithoutDiscount = computed(() => {
  if (!rental.value) return 0;

  const discountPercentage = rental.value.discountPercentage;

  if (discountPercentage === 100) return rental.value.totalCost;

  return (rental.value.totalCost / (100 - discountPercentage)) * 100;
});

const rentailsDetails = computed(() => {
  if (!rental.value) return [];

  return [
    { label: "Numer rejestracyjny:", value: rental.value.registrationNumber },
    {
      label: "Model:",
      value: rental.value.carBrand + " " + rental.value.carModel,
    },
    { label: "Rozpoczęcie", value: rental.value.startDate },
    { label: "Zakończenie:", value: rental.value.finishDate },
  ];
});
</script>

<style lang="scss" scoped>
.rental-card {
  max-width: 500px;
  margin: 10em auto;
  padding: 2.5em;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  .rental-title {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #333333;
    text-align: center;
  }

  .rental-details {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .detail {
      display: flex;
      justify-content: space-between;
      font-size: 1rem;
      color: #555555;

      .label {
        font-weight: 600;
      }

      .value {
        color: #000000;
      }

      &.total {
        border-top: 1px solid #e0e0e0;
        padding-top: 15px;
        font-size: 1.1rem;

        .without-discount {
          color: red;
          text-decoration: line-through;
          padding-left: 9em;
        }

        .value {
          color: #2e7d32;
          font-weight: 700;
        }
      }
    }

    .discount {
      background-color: #fff8e1;
      border-left: 4px solid #ffb300;
      padding: 15px;
      border-radius: 4px;
      font-size: 0.95rem;
      color: #555555;

      p {
        margin: 5px 0;

        strong {
          color: #d84315;
          text-decoration: line-through;
        }
      }
    }
  }

  .pay-button {
    width: 100%;
    padding: 12px;
    margin-top: 25px;
    background-color: #d23e19;
    color: #ffffff;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #ce352a;
      transform: scale(1.02);
    }
  }
}

@media (max-width: 600px) {
  .rental-card {
    padding: 20px;

    .rental-title {
      font-size: 1.5rem;
    }

    .rental-details {
      .detail {
        font-size: 0.95rem;
      }

      .discount {
        font-size: 0.9rem;
      }
    }

    .pay-button {
      font-size: 0.95rem;
      padding: 10px;
    }
  }
}
</style>
