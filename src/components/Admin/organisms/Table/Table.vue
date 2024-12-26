<template>
  <table class="table">
    <thead>
      <tr class="table-header">
        <th
          v-for="column in columns"
          :key="column.key"
          @click="sort(column.key)"
        >
          {{ column.label }}
          <span v-if="sortColumn === column.key" class="sort-indicator">
            {{ sortDirection === "asc" ? "↑" : "↓" }}
          </span>
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sortedData" :key="item.id">
        <td v-for="column in columns" :key="column.key">
          {{ item[column.key] }}
        </td>
        <td>
          <button class="delete-button" @click="openModal(item.id)">
            Usuń
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <Modal
    :isVisible="isModalVisible"
    :message="'Czy na pewno chcesz usunąć ten rekord?'"
    @confirmed="deleteUser"
    @cancelled="closeModal"
  />
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from "vue";
import Modal from "../Modal.vue"; //
import { ITableProps } from "./Table.types";

const props = defineProps<ITableProps>();
const { columns, data } = props;

const isModalVisible = ref(false);
const userToDelete = ref<number | null>(null);

const sortColumn = ref<string | null>(null);
const sortDirection = ref<string>("asc");

const sortedData = computed(() => {
  if (!sortColumn.value) return data;
  return [...data].sort((a, b) => {
    if (a[sortColumn.value] < b[sortColumn.value]) {
      return sortDirection.value === "asc" ? -1 : 1;
    }
    if (a[sortColumn.value] > b[sortColumn.value]) {
      return sortDirection.value === "asc" ? 1 : -1;
    }
    return 0;
  });
});

const sort = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "asc";
  }
};

const openModal = (id: number) => {
  userToDelete.value = id;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  userToDelete.value = null;
};

const deleteUser = () => {
  if (userToDelete.value !== null) {
    const index = data.findIndex((item) => item.id === userToDelete.value);
    if (index !== -1) {
      data.splice(index, 1);
    }
  }
  closeModal();
};
</script>

<style lang="scss" scoped>
.table-container {
  overflow-x: auto;
  margin: 20px 0;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  text-align: left;
  min-width: 800px;
}

.table-header {
  background-color: #f5f5f5;
  cursor: pointer;
  user-select: none;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
}

th {
  position: relative;
}

.sort-indicator {
  margin-left: 8px;
  font-size: 12px;
  color: #666;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.delete-button:hover {
  background-color: #c0392b;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
}

.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  font-weight: bold;
}
</style>
