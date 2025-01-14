import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "../src/router/router";
import { initKeycloak } from "./services/keycloak.service";
import "./style.css";
import Antd from "ant-design-vue";
import InfiniteScroll from "v-infinite-scroll";

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
  app.use(InfiniteScroll);
  app.use(Antd);
  app.use(pinia);
  app.use(router);
  app.mount("#app");
  setTimeout(cleanUrl, 0);
});
