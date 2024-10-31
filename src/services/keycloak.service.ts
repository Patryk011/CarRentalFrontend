import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";

const initOptions: KeycloakConfig = {
  url: "https://keycloak-local.pl:8443",
  realm: "car-rental",
  clientId: "car-rental-client",
};

const keycloak = new Keycloak(initOptions);

const initKeycloak = (): Promise<boolean> => {
  const options: KeycloakInitOptions = {
    onLoad: "check-sso",
    checkLoginIframe: false,
  };
  return keycloak
    .init(options)
    .then((authenticated) => {
      return authenticated;
    })
    .catch((error) => {
      // Handling an error that occurs only in Firefox browser when onLoad is set to "check-sso"
      if (error.error === "login_required") {
        keycloak.login();
        return true;
      } else {
        console.error("Keycloak initialization failed:", error);
        throw error;
      }
    });
};

const register = (): Promise<void> => keycloak.register();
const getToken = (): string | undefined => keycloak.token;

export { initKeycloak, register, getToken, keycloak };
