import { createApp } from "vue";
import App from "./App.vue";
import { initKeycloak } from "./services/keycloak.service";

initKeycloak()
  .then(() => {
    const app = createApp(App);
    app.mount("#app");
  })
  .catch((err) => {
    console.error("Keycloak initialization failed: ", err);
  });
