<template>
  <table class="table">
    <thead>
      <tr class="table-header">
        <th
          v-for="column in columns"
          :key="column.key"
          @click="setSortDirection(column.key)"
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
import { useSorting } from "@/composables/useSorting";

const props = defineProps<ITableProps>();
const { columns, data } = props;

const isModalVisible = ref(false);
const recordToDelete = ref<number | null>(null);

const { sortedData, sortColumn, setSortDirection, sortDirection } =
  useSorting(data);

const openModal = (id: number) => {
  recordToDelete.value = id;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  recordToDelete.value = null;
};

const deleteUser = () => {
  if (recordToDelete.value === null) return;

  const index = data.findIndex((item) => item.id === recordToDelete.value);

  if (index !== -1) data.splice(index, 1);

  closeModal();
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  text-align: left;
  min-width: 800px;

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

  tr {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }

    &:hover {
      background-color: #f1f1f1;
    }
  }

  .delete-button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #c0392b;
    }
  }
}
</style>
