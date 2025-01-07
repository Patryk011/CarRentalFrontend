import { ref, computed } from "vue";
import type { ITableData } from "@/components/Admin/organisms/Table/Table.types";

export const useSorting = (data) => {
  const sortColumn = ref<string | null>(null);
  const sortDirection = ref<"asc" | "desc">("asc");

  const sortedData = computed(() => {
    if (!sortColumn.value) return data.value;

    return [...data.value].sort((a, b) => {
      const valA = a[sortColumn.value];
      const valB = b[sortColumn.value];

      if (valA < valB) return sortDirection.value === "asc" ? -1 : 1;

      if (valA > valB) return sortDirection.value === "asc" ? 1 : -1;

      return 0;
    });
  });

  const setSortDirection = (column: string) => {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";

    if (sortColumn.value !== column) {
      sortColumn.value = column;
      sortDirection.value = "asc";
    }
  };

  return {
    sortColumn,
    sortDirection,
    sortedData,
    setSortDirection,
  };
};
