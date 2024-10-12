import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";

const initOptions: KeycloakConfig = {
  url: "http://keycloak:8080",
  realm: "car-rental",
  clientId: "car-rental-client",
};

const keycloak = new Keycloak(initOptions);

const initKeycloak = (): Promise<boolean> => {
  const options: KeycloakInitOptions = {
    onLoad: "login-required",
  };
  return keycloak.init(options);
};

const login = (): Promise<void> => keycloak.login();

const logout = (): Promise<void> => keycloak.logout();

const register = (): Promise<void> => keycloak.register();

const getToken = (): string | undefined => keycloak.token;

export { initKeycloak, login, logout, register, getToken };
