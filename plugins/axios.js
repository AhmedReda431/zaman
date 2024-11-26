import axios from "axios";
import { useCookie } from "#app";
import { useRouter } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  const tokenCookie = useCookie("token");
  const router = useRouter();
  const defaultUrl =
    config.VITE_NUXT_API_ENDPOINT || "https://admin.zman.sa/api";

  let api = axios.create({
    baseURL: defaultUrl,
  });

  // Watch for changes in the token cookie and update headers accordingly
  const unsubscribe = watch(
    tokenCookie,
    (newToken) => {
      api.defaults.headers.common["lang"] = "ar"; // Set default language
      if (newToken) {
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      } else {
        delete api.defaults.headers.common["Authorization"];
      }
    },
    { immediate: true }
  );

  // Hook into app's lifecycle to ensure i18n is initialized
  nuxtApp.hook("app:mounted", () => {
    const i18n = nuxtApp.vueApp.__VUE_I18N__;

    // Validate i18n initialization
    if (!i18n || !i18n.global) {
      console.warn("i18n plugin is not properly initialized");
      return;
    }

    const { t } = i18n.global;

    // Add Axios interceptor to handle API errors
    api.interceptors.response.use(
      (response) => {
        return response; // No errors, return response
      },
      (error) => {
        const { $toastMessage } = nuxtApp;

        // Handle specific error codes
        if (error.response) {
          switch (error.response.status) {
            case 401: // Unauthorized
              tokenCookie.value = null;
              router.push("/login");
              $toastMessage(
                t("unauthorizedMessage") || "Unauthorized",
                "error"
              );
              break;
            case 500: // Server error
              $toastMessage(t("serverErrorMessage") || "Server error", "error");
              break;
            case 400: // Bad request
              $toastMessage(t("badRequestMessage") || "Bad request", "error");
              break;
            default:
              $toastMessage(
                t("unexpectedErrorMessage") || "An unexpected error occurred",
                "error"
              );
          }
        } else {
          // Handle network or unknown errors
          $toastMessage(
            t("unexpectedErrorMessage") || "An unexpected error occurred",
            "error"
          );
        }

        return Promise.reject(error); // Reject the promise to propagate the error
      }
    );

    console.log("i18n plugin is initialized, Axios is ready to use.");
  });

  // Clean up watcher on app unmount
  nuxtApp.hook("app:beforeUnmount", () => {
    unsubscribe();
  });

  // Provide the Axios instance globally
  return {
    provide: {
      api: api,
    },
  };
});
