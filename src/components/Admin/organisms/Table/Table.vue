<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      class="search-input"
      placeholder="Wyszukaj w tabeli..."
    />
    <button class="clear-button" @click="clearSearch">Wyczyść</button>
  </div>

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
        <th v-if="actions">Akcje</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filteredData" :key="item.id">
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
import { defineProps, ref, computed, watch } from "vue";
import Modal from "../Modal/Modal.vue"; //
import { useSorting } from "@/composables/useSorting";
import { ITableData, ITableProps } from "./Table.types";

const props = defineProps<ITableProps>();

const { columns } = props;

const tableData = ref<ITableData[]>(props.data);

const isModalVisible = ref(false);
const recordToDelete = ref<number | null>(null);

const { sortedData, sortColumn, setSortDirection, sortDirection } =
  useSorting(tableData);

const searchQuery = ref("");

const filteredData = computed<ITableData[]>(() => {
  if (!searchQuery.value) return sortedData.value;

  const query = searchQuery.value.toLowerCase();

  return sortedData.value.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(query)
    )
  );
});

const clearSearch = () => {
  searchQuery.value = "";
};

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

  const index = tableData.value.findIndex(
    (item) => item.id === recordToDelete.value
  );

  if (index !== -1) tableData.value.splice(index, 1);

  closeModal();
};

watch(
  () => props.data,
  (newData) => {
    tableData.value = newData;
  }
);
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 0.0625rem;

  .search-input {
    flex-grow: 1;
  }

  .clear-button {
    background-color: #eceaea;
    color: rgb(182, 58, 58);
    border: 0.5rem;
    padding: 0.5rem 0.9375rem;
    cursor: pointer;
    border-radius: 0.125rem;
    font-size: 0.75rem;

    &:hover {
      background-color: #adacaa;
    }
  }
}
.table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  text-align: left;
  min-width: 50rem;

  .table-header {
    background-color: #f5f5f5;
    cursor: pointer;
    user-select: none;
  }

  th,
  td {
    border: 0.0625rem solid #ddd;
    padding: 0.625rem;
  }

  th {
    position: relative;
  }

  .sort-indicator {
    margin-left: 0.5rem;
    font-size: 0.75rem;
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
    padding: 0.3125rem 0.625rem;
    cursor: pointer;
    border-radius: 0.25rem;

    &:hover {
      background-color: #c0392b;
    }
  }
}
</style>
