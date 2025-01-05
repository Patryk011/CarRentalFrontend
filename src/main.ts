import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "../src/router/router";
import { initKeycloak } from "./services/keycloak.service";
import "./style.css";

// Function that cleans the 'error' from a URL that doesn't exist.
const cleanUrl = () => {
  const urlHash = window.location.hash;

  if (urlHash.includes("error=login_required")) {
    const cleanedUrl = window.location.href.split("#")[0];
    window.history.replaceState(null, "", cleanedUrl);
  }
};

const pinia = createPinia();
initKeycloak().then(() => {
  const app = createApp(App);
  app.use(pinia);
  app.use(router);
  app.mount("#app");
  setTimeout(cleanUrl, 0);
});
