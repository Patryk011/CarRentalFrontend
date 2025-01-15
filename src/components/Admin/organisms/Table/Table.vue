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
  <div
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="loading"
    :infinite-scroll-distance="10"
    class="table-container"
  >
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
          <td v-if="actions">
            <button
              v-for="(action, actionIndex) in actions?.(item) || []"
              :key="actionIndex"
              :class="action.class"
              @click="() => action.onClick(item)"
            >
              {{ action.label }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="loading-indicator">Ładowanie...</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, watch } from "vue";
import { useSorting } from "@/composables/useSorting";
import { ITableData, ITableProps } from "./Table.types";

const props = defineProps<ITableProps>();

const { columns, actions } = props;

const tableData = ref<ITableData[]>(props.data);

const { sortedData, sortColumn, setSortDirection, sortDirection } =
  useSorting(tableData);

const searchQuery = ref("");
const loading = ref(false);
const currentPage = ref(1);

const loadMore = () => {
  if (loading.value) return;
  loading.value = true;
  currentPage.value += 1;
};

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

.table-container {
  overflow-y: auto;
  max-height: 48.5em;
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

  .button {
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
.loading-indicator {
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
  color: #888;
}

.discount-button {
  margin-bottom: 0.12rem;
  padding: 0.25rem 0.25rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.block-button {
  background-color: red;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.block-button:hover {
  background-color: darkred;
}

.unblock-button {
  background-color: green;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.unblock-button:hover {
  background-color: darkgreen;
}
</style>
