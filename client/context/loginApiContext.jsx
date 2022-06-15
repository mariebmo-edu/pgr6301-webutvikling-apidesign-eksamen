import React from "react";
import { fetchJSON, postJSON } from "../utils/jsonUtils";

export const LoginApiContext = React.createContext({
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },

  async registerLogin(provider, login) {
    return await postJSON(`/api/login/${provider}`, login);
  },

  async endSession() {
    const res = await fetch("/api/login", { method: "DELETE" });
    if (!res.ok) {
      throw new Error("Failed to end session.");
    }
  },
});
