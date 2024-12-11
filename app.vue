<template>
  <Html :lang="locale" :dir="localeValue" :class="`${$i18n.locale}-lang`">
    <NuxtLayout>
      <LoadingScreen v-if="isLoading" />
      <NuxtPage :key="`${locale}-${route.fullPath}`" />
      <transition name="page">
        <AlertComponent
          v-if="alert"
          :message="alert.message"
          :type="alert.type"
          @close="dismissAlert"
        />
      </transition>
    </NuxtLayout>
  </Html>
</template>

<script setup>
import {
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const { locale, setLocale } = useI18n();
const localeValue = computed(() => {
  return locale.value === "ar" ? "rtl" : "ltr";
});
const i18n = useCookie("i18n_redirected");
if (!i18n.value) {
  setLocale("ar");
}

const route = useRoute();
const isLoading = ref(false);
const isRefreshed = useCookie("isRefreshed"); // Cookie to track refresh state

const { onAlert } = useAlert();
const alert = ref(null);

onAlert((newAlert) => {
  showAlert(newAlert);
});

function showAlert(newAlert) {
  alert.value = newAlert;
  setTimeout(() => {
    dismissAlert();
  }, 4500); // Alert auto-dismiss after 4.5 seconds
}

function dismissAlert() {
  alert.value = null;
}

const { $api } = useNuxtApp();

function getSettingData() {
  $api
    .get("/settings")
    .then((res) => {
      Object.entries(res?.data?.data).forEach((element) => {
        const [key, value] = element;
        if (value && key !== "id") {
          const emailCookie = useCookie(`setting-${key}`, { maxAge: 3600 });
          emailCookie.value = value;
        }
      });
    })
    .catch((err) => {
      if (err?.response?.data?.message) {
        showAlert(err.response.data.message, "danger");
      }
    });
}

getSettingData();

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});

// Watch route changes and handle reload on 'home' route
watch(
  route,
  () => {
    if (route.name === "index" && isRefreshed.value === false) {
      isRefreshed.value = true; // Set refresh flag to true when the route is 'index'
      isLoading.value = true;
      setTimeout(() => {
        router.go(router.currentRoute); // Trigger page reload
      }, 2000);
    } else if (route.name !== "index") {
      isRefreshed.value = false; // Reset isRefreshed when route is not 'index'
    }
  },
  { immediate: true } // Ensure this logic runs immediately when the component is mounted
);
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
