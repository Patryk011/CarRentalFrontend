<template>
  <Banner text="Twoje konto " />
  <div class="account-container">
    <div class="customer-info" v-if="customer && customer.id">
      <h1>{{ customer.firstName }} {{ customer.lastName }}</h1>
      <p><strong>Email:</strong> {{ customer.email }}</p>
      <p><strong>Telefon:</strong> {{ customer.phoneNumber }}</p>
      <p>
        <strong>Data urodzenia:</strong> {{ formatDate(customer.birthDate) }}
      </p>
    </div>

    <button class="toggle-button" @click="toggleRentals">
      {{ showRentals ? "Ukryj wypożyczenia" : "Twoje wypożyczenia" }}
    </button>

    <div class="rentals-section" v-if="showRentals">
      <h2>Twoje Wypożyczenia</h2>
      <div v-if="!rentals.length">
        <p>Nie masz żadnych wypożyczeń</p>
      </div>
      <ul v-else class="rentals-list">
        <li
          v-for="rental in visibleRentals"
          :key="rental.id"
          class="rental-item"
        >
          <p><strong>Marka auta:</strong> {{ rental.carBrand }}</p>
          <p><strong>Model auta:</strong> {{ rental.carModel }}</p>

          <p><strong>Status:</strong> {{ rental.status }}</p>
          <p>
            <strong>Data Rozpoczęcia:</strong>
            {{ formatDate(rental.startDate) }}
          </p>
          <p v-if="rental.finishDate">
            <strong>Data Zakończenia:</strong>
            {{ formatDate(rental.finishDate) }}
          </p>
          <button
            v-if="rental.status === 'CONFIRMED'"
            @click="cancelRental(rental.id)"
            class="cancel-button"
          >
            Anuluj Wypożyczenie
          </button>
        </li>
      </ul>
      <div ref="infiniteScrollTrigger" class="infinite-scroll-trigger"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getToken } from "@/services/keycloak.service";
import axios from "axios";
import Banner from "../atoms/Banner/Banner.vue";

const customer = ref<any>({});
const rentals = ref([]);
const visibleRentals = ref([]);
const chunkSize = 10;
const currentIndex = ref(0);
const infiniteScrollTrigger = ref<HTMLElement | null>(null);
const showRentals = ref(false);

const toggleRentals = () => {
  showRentals.value = !showRentals.value;
};

const formatDate = (dateStr: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("pl", options);
};

const getCustomerInfo = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No Keycloak token");
      return;
    }

    const response = await axios.get("http://localhost:8081/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);

    customer.value = response.data;
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
    const response = await axios.get("http://localhost:8081/api/rentals/my", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    rentals.value = response.data;
    loadMoreRentals();
  } catch (error) {
    console.error("Error fetching rentals", error);
  }
};

const loadMoreRentals = () => {
  const nextChunk = rentals.value.slice(
    currentIndex.value,
    currentIndex.value + chunkSize
  );
  visibleRentals.value.push(...nextChunk);
  currentIndex.value += chunkSize;
};

const cancelRental = async (rentalId: number) => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No token");
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
    const index = rentals.value.findIndex((r) => r.id === rentalId);

    if (index !== -1) {
      rentals.value[index].status = "CANCELLED";
      const visibleIndex = visibleRentals.value.findIndex(
        (r) => r.id === rentalId
      );
      if (visibleIndex !== -1) {
        visibleRentals.value[visibleIndex].status = "CANCELLED";
      }
    }
  } catch (err) {
    console.error("Error canceling rental:", err);
  }
};

onMounted(() => {
  getCustomerInfo();
  fetchRentals();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (currentIndex.value < rentals.value.length) {
            loadMoreRentals();
          }
        }
      });
    },
    { rootMargin: "200px" }
  );

  if (infiniteScrollTrigger.value) {
    observer.observe(infiniteScrollTrigger.value);
  }
});
</script>

<style lang="scss" scoped>
.account-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
  color: #333;

  .customer-info {
    background: #fefefe;
    padding: 30px;
    border-radius: 10px;
    margin-bottom: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid #e0e0e0;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }

    h1 {
      font-size: 2.2em;
      color: #2c3e50;
      margin-bottom: 10px;
      padding-bottom: 5px;
    }

    p {
      margin: 8px 0;
      font-size: 1.15em;
      line-height: 1.6;
    }
  }

  .toggle-button {
    display: block;
    width: 100%;
    padding: 14px;
    margin-bottom: 30px;
    background: linear-gradient(145deg, #db6334, #e55b2e);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 1.2em;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      background: linear-gradient(145deg, #b96a29, #c85f27);
      transform: translateY(-2px);
    }
  }

  .rentals-section {
    margin-top: 40px;

    h2 {
      font-size: 2em;
      color: #2c3e50;
      margin-bottom: 20px;
      padding-bottom: 5px;
    }

    .rentals-list {
      list-style: none;
      padding: 0;

      .rental-item {
        background: #fff;
        margin-bottom: 20px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
        border-left: 4px solid #db6334;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        p {
          margin: 8px 0;
          line-height: 1.5;
        }

        .cancel-button {
          display: inline-block;
          margin-top: 15px;
          padding: 10px 18px;
          background: linear-gradient(145deg, #e74c3c, #d64333);
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s ease, transform 0.2s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

          &:hover {
            background: linear-gradient(145deg, #c0392b, #af3327);
            transform: translateY(-1px);
          }
        }
      }
    }

    .infinite-scroll-trigger {
      height: 1px;
    }
  }
}
</style>
