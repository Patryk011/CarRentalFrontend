<template>
  <div class="users-container">
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h3>Dodaj zniżkę</h3>
        <p>
          Użytkownik:
          <strong>
            {{ selectedUser.firstName }} {{ selectedUser.lastName }}
          </strong>
        </p>
        <div class="form-group">
          <label for="discount">Wpisz zniżkę (%)</label>
          <input
            id="discount"
            type="number"
            v-model="discountValue"
            min="0"
            max="50"
            placeholder="Wpisz zniżkę (%)"
          />
        </div>
        <div class="modal-actions">
          <button @click="setDiscount">Zapisz</button>
          <button @click="closeDiscountModal">Anuluj</button>
        </div>
      </div>
    </div>
    <Table :columns="columns" :data="users" :actions="actions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import Table from "../organisms/Table/Table.vue";
import { CustomerDTO } from "../organisms/FormsFields/CustomerFormFields";

const users = ref<CustomerDTO[]>([]);
const isModalOpen = ref(false);
const selectedUser = ref<CustomerDTO | null>(null);
const discountValue = ref<number | null>(null);

const columns = [
  { key: "id", label: "ID" },
  { key: "firstName", label: "Imię" },
  { key: "lastName", label: "Nazwisko" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Numer telefonu" },
  { key: "birthDate", label: "Data urodzenia" },
];

const actions = (item: CustomerDTO) => [
  {
    label: "Ustaw zniżkę",
    onClick: () => openDiscountModal(item),
    class: "discount-button",
  },
];

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

const openDiscountModal = (user: CustomerDTO) => {
  selectedUser.value = user;
  discountValue.value = user.discountPercentage || null;
  isModalOpen.value = true;
};

const closeDiscountModal = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
  discountValue.value = null;
};

const setDiscount = async () => {
  if (!selectedUser.value || discountValue.value === null) {
    console.error("Nie wybrano użytkownika lub zniżki");
    return;
  }
  const finalDiscount = discountValue.value === 0 ? null : discountValue.value;

  try {
    const token = getToken();
    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const updatedUser = {
      ...selectedUser.value,
      discountPercentage: finalDiscount,
    };

    await axios.post(
      `http://localhost:8081/api/customers/${updatedUser.id}`,
      updatedUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userIndex = users.value.findIndex((u) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users.value[userIndex] = updatedUser;
    }

    closeDiscountModal();
  } catch (err) {
    console.error("Błąd podczas ustawiania zniżki: ", err);
  }
};

fetchUsers();
</script>

<style lang="scss" scoped>
.users-container {
  padding: 2rem;
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

button:hover {
  opacity: 0.9;
}
</style>
