import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "../src/router/router";
import { initKeycloak } from "@/services/keycloak.service";

const pinia = createPinia();

initKeycloak().then(() => {
  const app = createApp(App);
  app.use(pinia);
  app.use(router);
  app.mount("#app");
});
