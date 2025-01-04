<template>
  <div class="car-card">
    <CardHeader
      :brand="`${car.carBrandName} ${car.carModelName}`"
      :price="`od ${car.pricePerDay} zł / dzień`"
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
        <button class="offer" @click="openModal">Zobacz ofertę</button>
      </div>
    </div>
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Wybierz daty wynajmu</h3>
      </template>

      <template #body>
        <div class="modal-body-content">
          <label>Data rozpoczęcia:</label>
          <input type="date" v-model="startDate" />

          <label>Data zakończenia:</label>
          <input type="date" v-model="finishDate" />
        </div>
      </template>

      <template #footer>
        <button class="rent-button" @click="createRental">Zarezerwuj</button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CardInfo from "./CardInfo/CardInfo.vue";
import CardHeader from "./CardHeader/CardHeader.vue";
import { ICardProps } from "./Card.types";
import { getCarImagePath, translate } from "@/utils/carUtils";
import Modal from "../Modal/Modal.vue";
import { getToken } from "@/services/keycloak.service";
import axios from "axios";

const showModal = ref(false);
const startDate = ref("");
const finishDate = ref("");
const user = ref(null);

const props = defineProps<ICardProps>();

const { car } = props;

const openModal = () => {
  showModal.value = true;
};

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
    console.log("User data:", user);
    return user;
  } catch (err) {
    console.error("Error fetching current user:", err);
  }
}

onMounted(() => {
  getCurrentUser();
});

const createRental = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No Keycloak token");
      return;
    }
    const rentalRequest = {
      carId: car.id,
      customerId: user.value.id,
      startDate: startDate.value,
      finishDate: finishDate.value,
    };

    const response = await axios.post(
      "http://localhost:8081/api/rentals",
      rentalRequest,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const rental = response.data;
    console.log("Rental created:", rental);

    showModal.value = false;

    window.location.href = `/rental-details/${rental.id}`;
  } catch (err) {
    console.error("Error creating rental:", err);
  }
};

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
    align-items: stretch;
    font-size: 13px;
    gap: 2em;

    img {
      height: 200px;
      width: 250px;
    }

    .separator {
      border-right: 1px solid #ddd;
      height: auto;
      margin: 0;
    }

    .offer-content {
      display: flex;
      flex-direction: column;
      gap: 1.5em;
      flex-grow: 1;

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
