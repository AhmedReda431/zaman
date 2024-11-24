import axios from "axios";
import { useCookie } from "#app";
import { useRouter } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  const tokenCookie = useCookie("token");
  const router = useRouter();
  const defaultUrl =
    config.VITE_NUXT_API_ENDPOINT || "https://admin.zman.sa/api";

  // Access the `t` function via Nuxt app's i18n instance
  const { t } = nuxtApp.vueApp.__VUE_I18N__.global;

  let api = axios.create({
    baseURL: defaultUrl,
  });

  // Watch for changes in the token cookie
  const unsubscribe = watch(
    tokenCookie,
    (newToken) => {
      api.defaults.headers.common["lang"] = "ar";
      if (newToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      } else {
        delete api.defaults.headers.common["Authorization"];
      }
    },
    { immediate: true }
  );

  // Add an interceptor to handle errors
  api.interceptors.response.use(
    (response) => {
      // Return the response if no error
      return response;
    },
    (error) => {
      const { $toastMessage } = nuxtApp;

      if (error.response) {
        // Handle specific error codes with translated messages
        if (error.response.status === 401) {
          tokenCookie.value = null;
          router.push("/login");
          $toastMessage(t("unauthorizedMessage"), "error");
        } else if (error.response.status === 500) {
          $toastMessage(t("serverErrorMessage"), "error");
        } else if (error.response.status === 400) {
          $toastMessage(t("badRequestMessage"), "error");
        }
      } else {
        $toastMessage(t("unexpectedErrorMessage"), "error");
      }

      // Reject the error to propagate it
      return Promise.reject(error);
    }
  );

  nuxtApp.hook("app:beforeUnmount", () => {
    unsubscribe();
  });

  return {
    provide: {
      api: api,
    },
  };
});
