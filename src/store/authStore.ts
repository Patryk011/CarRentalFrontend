import { defineStore } from "pinia";
import {
  initKeycloak,
  login,
  logout,
  getToken,
  keycloak,
} from "../services/keycloak.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    isAdmin: false,
    token: null as string | null,
  }),
  actions: {
    async initAuth() {
      const authenticated = await initKeycloak();
      this.isAuthenticated = authenticated;
      this.token = keycloak.token || null;
      this.isAdmin = keycloak.tokenParsed?.roles?.includes("admin") || false;
    },
    async login() {
      await login();
      await this.initAuth();
    },
    async logout() {
      await logout();
      this.$reset();
    },
    getToken() {
      return getToken();
    },
  },
});
