import { defineStore } from "pinia";
import { keycloak } from "../services/keycloak.service";
import router from "@/router/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: null,
    isAdmin: null,
    redirectAfterLogin: null,
  }),
  actions: {
    async initAuth() {
      this.isAuthenticated = keycloak.authenticated || false;
      this.isAdmin = keycloak.hasRealmRole("admin") || false;
    },
    login() {
      keycloak.login();
    },
    logout() {
      keycloak.logout({
        redirectUri: window.location.origin,
      });
    },
  },
});
