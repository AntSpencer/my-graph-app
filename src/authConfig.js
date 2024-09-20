import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "ef62c780-a244-4a9a-a5b5-c1a8f219149a",
    authority: "https://login.microsoftonline.com/e34fd78b-f48d-4235-9787-fef76723be14",
    redirectUri: "http://localhost:5173" // Default Vite dev server port
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
};

export const loginRequest = {
  scopes: ["User.Read"]
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

export const msalInstance = new PublicClientApplication(msalConfig);