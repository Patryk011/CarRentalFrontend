<template>
  <div class="rentals-container">
    <button @click="showAddRentalForm = true" class="add-rental-button">
      Dodaj wypożyczenie
    </button>
    <Table :columns="columns" :data="rentals" />

    <div v-if="showAddRentalForm" class="modal-overlay">
      <div class="modal-content">
        <h2>Dodaj nowe wypożyczenie</h2>
        <form @submit.prevent="submitRentalForm">
          <div class="form-field">
            <label for="startDate">Data rozpoczęcia</label>
            <input
              type="date"
              id="startDate"
              v-model="newRental.startDate"
              @change="checkDatesAndFetchCars"
              required
            />
          </div>

          <div class="form-field">
            <label for="finishDate">Data zakończenia</label>
            <input
              type="date"
              id="finishDate"
              v-model="newRental.finishDate"
              @change="checkDatesAndFetchCars"
              required
            />
          </div>

          <div class="form-field">
            <label for="car">Samochód</label>
            <select
              id="car"
              v-model="newRental.carId"
              :disabled="!cars.length"
              required
            >
              <option v-for="car in cars" :key="car.id" :value="car.id">
                {{ car.carBrandName }} {{ car.carModelName }} ({{
                  car.productionYear
                }}) - ID: {{ car.id }}
              </option>
            </select>
          </div>

          <div class="form-field">
            <label for="user">Klient</label>
            <select id="user" v-model="newRental.customerId" required>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.firstName }} {{ user.lastName }}
              </option>
            </select>
          </div>

          <div class="modal-actions">
            <button type="submit" class="submit-button">Zapisz</button>
            <button
              type="button"
              @click="showAddRentalForm = false"
              class="cancel-button"
            >
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import Table from "../organisms/Table/Table.vue";
import { getToken } from "@/services/keycloak.service";
import { CustomerDTO } from "../organisms/FormsFields/CustomerFormFields";
import { RentalDTO } from "../organisms/FormsFields/RentalFormFields";
import { CarDTO } from "../organisms/FormsFields/CarFormFields";

const rentals = ref<RentalDTO[]>([]);
const users = ref<CustomerDTO[]>([]);
const cars = ref<CarDTO[]>([]);
const showAddRentalForm = ref(false);

const newRental = ref<RentalDTO>({
  customerId: 0,
  carId: 0,
  startDate: "",
  finishDate: "",
});

const columns = [
  { key: "id", label: "ID wypożyczenia" },
  { key: "customerName", label: "Klient" },
  { key: "carBrand", label: "Marka" },
  { key: "carModel", label: "Model" },
  { key: "totalCost", label: "Koszt wynajmu" },
  { key: "startDate", label: "Data rozpoczęcia" },
  { key: "finishDate", label: "Data zakończenia" },
  { key: "status", label: "Status" },
];

const fetchAvailableCars = async ({ startDate, endDate }) => {
  try {
    const response = await axios.get<CarDTO[]>(
      "http://localhost:8081/api/Cars/available",
      {
        params: { startDate, endDate },
      }
    );
    cars.value = response.data;
  } catch (error) {
    console.error("Błąd przy pobieraniu dostępnych samochodów:", error);
  }
};

const checkDatesAndFetchCars = () => {
  const startDate = newRental.value.startDate;
  const finishDate = newRental.value.finishDate;

  if (startDate && finishDate && new Date(startDate) < new Date(finishDate)) {
    fetchAvailableCars({ startDate, endDate: finishDate });
  } else {
    cars.value = [];
  }
};

const fetchRentals = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const response = await axios.get<RentalDTO[]>(
      "http://localhost:8081/api/rentals/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    rentals.value = await Promise.all(
      response.data.map(async (rental) => {
        const customer = users.value.find(
          (user) => user.id === rental.customerId
        );
        const car = cars.value.find((car) => car.id === rental.carId);

        return {
          ...rental,
          customerName: customer
            ? `${customer.firstName} ${customer.lastName}`
            : "Nieznany",
          carBrandName: car ? car.carBrandName : "Nieznany",
          carModelName: car ? car.carModelName : "Nieznany",
        };
      })
    );
  } catch (err) {
    console.error("Błąd przy pobieraniu danych: ", err);
  }
};

const fetchUsers = async () => {
  try {
    const token = getToken();

    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const response = await axios.get<CustomerDTO[]>(
      "http://localhost:8081/api/customers/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    users.value = response.data;
  } catch (err) {
    console.error("Błąd przy pobieraniu danych: ", err);
  }
};

const fetchCars = async () => {
  try {
    const token = getToken();
    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const response = await axios.get<CarDTO[]>(
      "http://localhost:8081/api/Cars/all",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    cars.value = response.data;
  } catch (err) {
    console.error("Błąd przy pobieraniu danych: ", err);
  }
};

const submitRentalForm = async () => {
  try {
    const token = getToken();

    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const response = await axios.post<RentalDTO>(
      "http://localhost:8081/api/rentals/add",
      newRental.value,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    rentals.value.push({
      customerId: response.data.customerId,
      carId: response.data.carId,
      startDate: response.data.startDate,
      finishDate: response.data.finishDate,
    });

    await fetchRentals();

    showAddRentalForm.value = false;
    newRental.value = {
      customerId: 0,
      carId: 0,
      startDate: "",
      finishDate: "",
    };
  } catch (err) {
    console.error("Błąd dodawania wypożyczenia: ", err);
  }
};

onMounted(() => {
  fetchCars();
  fetchRentals();
  fetchUsers();
});
</script>

<style lang="scss" scoped>
.rentals-container {
  padding: 2rem;

  .add-rental-button {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  .add-rental-button:hover {
    background-color: #0056b3;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 90%;
    max-width: 40rem;
    max-height: 80vh;
    overflow-y: auto;
  }

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 0.12rem solid #ccc;
    border-radius: 0.25rem;
    box-sizing: border-box;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }

  .modal-actions button {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .modal-actions button:first-of-type {
    background-color: #28a745;
    color: white;
  }

  .modal-actions button:last-of-type {
    background-color: #dc3545;
    color: white;
  }
}
</style>
