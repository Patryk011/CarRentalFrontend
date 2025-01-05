<template>
  <form @submit.prevent="handleSubmit">
    <label class="required" for="email">Email</label>
    <input id="email" type="text" v-model="formData.email" required />
    <label class="required" for="fullName">Imię i nazwisko</label>
    <input id="fullName" type="text" v-model="formData.fullName" required />
    <label class="required" for="message">Wiadomość</label>
    <textarea name="message" id="message" required />

    <button type="submit">Wyślij</button>
  </form>

  <span
    v-if="responseMessage"
    :class="[
      'response-message',
      { success: isResponseOk, error: !isResponseOk },
    ]"
  >
    {{ responseMessage }}
  </span>
</template>

<script setup lang="ts">
import axios from "axios";
import { reactive, ref } from "vue";

const isResponseOk = ref(false);
const responseMessage = ref("");

const formData = reactive({
  email: "",
  fullName: "",
  message: "",
});

const handleSubmit = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8081/api/messages",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) isResponseOk.value = true;

    responseMessage.value = "Wiadomość została wysłana";
    formData.email = "";
    formData.fullName = "";
    formData.message = "";
  } catch (error) {
    isResponseOk.value = false;
    responseMessage.value =
      "Wystąpił błąd podczas wysyłania wiadomości, spróbuj ponownie";
  }
};
</script>

<style scoped lang="scss">
form {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 600px;

  label {
    display: block;
    margin-bottom: 12px;
    font-weight: bold;
    color: #333;

    &.required::after {
      color: #ff0a21;
      content: " *";
    }
  }

  input,
  textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: Arial, sans-serif;
    transition: border-color 0.3s ease;
    resize: vertical;
  }

  textarea {
    height: 200px;
    min-height: 150px;
    max-height: 400px;
  }

  button {
    display: block;
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    background-color: #d32e22;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f03506;
    }
  }
}

.response-message {
  display: block;
  margin-top: 20px;
  padding: 15px;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;

  &.success {
    color: green;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
  }

  &.error {
    color: red;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
  }
}
</style>
