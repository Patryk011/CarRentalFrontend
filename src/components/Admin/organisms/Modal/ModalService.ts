import { ref } from "vue";

export const isModalVisible = ref(false);

export const openModal = () => {
  isModalVisible.value = true;
};

export const closeModal = () => {
  isModalVisible.value = false;
};
