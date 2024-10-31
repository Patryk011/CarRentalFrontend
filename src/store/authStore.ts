import { defineStore } from "pinia";
import { keycloak } from "../services/keycloak.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: null,
    isAdmin: null,
  }),
  actions: {
    async initAuth() {
      this.isAuthenticated = keycloak.authenticated || false;
      this.isAdmin = keycloak.hasRealmRole("admin") || false;
      console.log("Auth Store Initialized:", {
        isAuthenticated: this.isAuthenticated,
        isAdmin: this.isAdmin,
      });
    },
    login() {
      keycloak.login();
    },
    logout() {
      keycloak.logout();
    },
  },
});
