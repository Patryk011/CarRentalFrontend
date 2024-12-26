<template>
  <div class="users-container">
    <Table :columns="columns" :data="users" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { getToken } from "@/services/keycloak.service";
import Table from "../organisms/Table/Table.vue";

const users = ref([
  {
    id: 1,
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan.kowalski@example.com",
    phoneNumber: "+48 123 456 789",
    birthDate: "1990-01-01",
    licenseNumber: "ABC123456",
    address: "ul. Pięciomorgowa 1, Warszawa",
    registrationDate: "2020-02-15",
  },
  {
    id: 2,
    firstName: "Anna",
    lastName: "Nowak",
    email: "anna.nowak@example.com",
    phoneNumber: "+48 987 654 321",
    birthDate: "1985-06-20",
    licenseNumber: "DEF654321",
    address: "ul. Młodsza 2, Kraków",
    registrationDate: "2021-03-10",
  },
  {
    id: 3,
    firstName: "Paweł",
    lastName: "Wiśniewski",
    email: "pawel.wisniewski@example.com",
    phoneNumber: "+48 567 890 123",
    birthDate: "1992-11-05",
    licenseNumber: "GHI789456",
    address: "ul. Słoneczna 3, Gdańsk",
    registrationDate: "2021-06-25",
  },
  {
    id: 4,
    firstName: "Katarzyna",
    lastName: "Zielińska",
    email: "katarzyna.zielinska@example.com",
    phoneNumber: "+48 321 654 987",
    birthDate: "1994-08-10",
    licenseNumber: "JKL456789",
    address: "ul. Łaskotna 4, Poznań",
    registrationDate: "2022-01-15",
  },
  {
    id: 5,
    firstName: "Tomasz",
    lastName: "Wójcik",
    email: "tomasz.wojcik@example.com",
    phoneNumber: "+48 654 321 987",
    birthDate: "1988-03-30",
    licenseNumber: "MNO123789",
    address: "ul. Zielona 5, Wrocław",
    registrationDate: "2023-04-10",
  },
  {
    id: 6,
    firstName: "Michał",
    lastName: "Szymański",
    email: "michal.szymanski@example.com",
    phoneNumber: "+48 234 567 890",
    birthDate: "1978-12-24",
    licenseNumber: "PQR890123",
    address: "ul. Główna 6, Łódź",
    registrationDate: "2023-10-26",
  },
  {
    id: 7,
    firstName: "Zofia",
    lastName: "Malinowska",
    email: "zofia.malinowska@example.com",
    phoneNumber: "+48 789 456 123",
    birthDate: "2000-05-12",
    licenseNumber: "RST321987",
    address: "ul. Polna 7, Białystok",
    registrationDate: "2024-05-18",
  },
  {
    id: 8,
    firstName: "Mateusz",
    lastName: "Dąbrowski",
    email: "mateusz.dabrowski@example.com",
    phoneNumber: "+48 456 789 234",
    birthDate: "1982-09-07",
    licenseNumber: "STU098456",
    address: "ul. Leśna 8, Lublin",
    registrationDate: "2024-11-21",
  },
  {
    id: 9,
    firstName: "Magdalena",
    lastName: "Kwiatkowska",
    email: "magdalena.kwiatkowska@example.com",
    phoneNumber: "+48 890 321 456",
    birthDate: "1998-02-14",
    licenseNumber: "UVW654123",
    address: "ul. Nadrzeczna 9, Szczecin",
    registrationDate: "2024-12-10",
  },
  {
    id: 10,
    firstName: "Bartosz",
    lastName: "Mazur",
    email: "bartosz.mazur@example.com",
    phoneNumber: "+48 159 753 862",
    birthDate: "1995-07-21",
    licenseNumber: "VWX123987",
    address: "ul. Spokojna 10, Gdynia",
    registrationDate: "2024-12-25",
  },
]);

const columns = [
  { key: "id", label: "ID" },
  { key: "firstName", label: "Imię" },
  { key: "lastName", label: "Nazwisko" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Numer telefonu" },
  { key: "birthDate", label: "Data urodzenia" },
  { key: "licenseNumber", label: "Numer prawa jazdy" },
  { key: "address", label: "Adres" },
  { key: "registrationDate", label: "Data rejestracji" },
];

const fetchUsers = async () => {
  try {
    const token = getToken();

    if (!token) {
      console.error("No keycloak token");
      return;
    }

    const response = await axios.get(
      "http://localhost:8081/api/customers/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    users.value = response.data;
  } catch (err) {
    console.error("Error fetching users: ", err);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
