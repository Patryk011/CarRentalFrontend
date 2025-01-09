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
    <RentModal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Wybierz daty wynajmu</h3>
      </template>

      <template #body>
        <div class="modal-body-content">
          <label>Data rozpoczęcia:</label>
          <a-date-picker
            v-model="startDate"
            @change="handleStartDateChange"
            :format="'DD-MM-YYYY'"
          />
          <label>Data zakończenia:</label>
          <a-date-picker
            v-model="finishDate"
            class="filter-input"
            @change="handleFinishDateChange"
            :format="'DD-MM-YYYY'"
          />
        </div>
      </template>

      <template #footer>
        <button
          class="rent-button"
          :disabled="isDateBeforeCurrent"
          @click="createRental"
        >
          Zarezerwuj
        </button>
      </template>
    </RentModal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import CardInfo from "./CardInfo/CardInfo.vue";
import CardHeader from "./CardHeader/CardHeader.vue";
import { ICardProps } from "./Card.types";
import { getCarImagePath, translate } from "@/utils/carUtils";
import RentModal from "../../molecules/RentModal/RentModal.vue";
import { getToken } from "@/services/keycloak.service";
import axios from "axios";
import "ant-design-vue/dist/antd.css";

interface RentalDataForEmail {
  id: string;
  startDate: string;
  finishDate: string;
}

const showModal = ref(false);
const startDate = ref("");
const finishDate = ref("");
const user = ref(null);

const props = defineProps<ICardProps>();

const { car } = props;

const openModal = () => {
  showModal.value = true;
};

const getUserInfo = async () => {
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

    user.value = response.data;
  } catch (err) {
    console.error("Error fetching current customer:", err);
  }
};

const sendConfirmationEmail = async (data: RentalDataForEmail) => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No Keycloak token");
      return;
    }

    const emailRequest = {
      toEmail: user.value.email,
      subject: `Potwierdzenie rezerwacji nr ${data.id}`,
      body: `Informujemy, że rezerwacja nr ${data.id} będzie ważna w dniach od ${data.startDate} do ${data.finishDate}.`,
    };

    await axios.post("http://localhost:8081/api/email/send", emailRequest, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

const createRental = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No Keycloak token");
      return;
    }
    const rentalRequest = {
      carId: car.id,
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

    await sendConfirmationEmail(rental);

    showModal.value = false;

    window.location.href = `/rental-details/${rental.id}`;
  } catch (err) {
    console.error("Error creating rental:", err);
  }
};

const handleStartDateChange = (selectedStartDate: Date) => {
  startDate.value = selectedStartDate.toISOString().split("T")[0];
};

const handleFinishDateChange = (selectedFinishDate: Date) => {
  finishDate.value = selectedFinishDate.toISOString().split("T")[0];
};

const isDateBeforeCurrent = computed(() => {
  if (!startDate.value || !finishDate.value) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedStart = new Date(startDate.value);

  const selectedEnd = new Date(finishDate.value);

  return selectedStart < today || selectedEnd < today;
});

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

onMounted(() => {
  getUserInfo();
});
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

  .modal-body-content {
    display: flex;
    flex-direction: column;
    gap: 0.75em;

    label {
      font-weight: 500;
      color: #555;
    }

    input[type="date"] {
      padding: 0.5em;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1em;
      width: 100%;
      box-sizing: border-box;
      transition: (border-color 0.2s ease);

      &:focus {
        border-color: #007bff;
        outline: none;
      }
    }
    .input-group {
      display: flex;
      flex-direction: column;
    }
  }
  .rent-button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 0.75em 1.5em;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;
    transition: (background-color 0.2s ease);

    &:hover {
      background-color: #218838;
    }

    &:disabled {
      opacity: 0.5;
      background-color: gray;
      cursor: not-allowed;
    }
  }
}
</style>
