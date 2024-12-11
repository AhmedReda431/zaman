import { defineStore } from 'pinia';
import { useCookie } from "#app";
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('token') || null,
    user: useCookie('user') || null,
    redirectRoute: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setRedirectRoute(route) {
      this.redirectRoute = route;
    },
    setToken(newToken, newUserHere) {
      this.token = newToken;
      if (newUserHere) {
        this.user = newUserHere
      }
    },
    setUser(newUserHere) {
      if (newUserHere) {
        this.user = newUserHere
      }
    },
    clearAuth() {
      this.token = null;
      this.user = null;
    },
    logout() {
      this.clearAuth();
    },
  },
});
