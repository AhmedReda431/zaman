import { ref } from "vue";

export const useAboutUs = () => {
  const { $api } = useNuxtApp();
  const { showAlert } = useAlert();
  const aboutUsFirst = ref([]);
  const aboutUsCenter = ref([]);
  const aboutUsLast = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchAboutUs = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get("/about-us?place=first");
      aboutUsFirst.value = response.data.data[0];
    } catch (err) {
      error.value =
        err.response?.data?.data?.message ||
        "An error occurred while fetching aboutUs.";
      showAlert(error.value, "danger");
    } finally {
      loading.value = false;
    }
    try {
      const response = await $api.get("/about-us?place=center");
      aboutUsCenter.value = response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.data?.message ||
        "An error occurred while fetching aboutUs.";
      console.log(err);
    } finally {
      loading.value = false;
    }
    try {
      const response = await $api.get("/about-us?place=last");
      aboutUsLast.value = response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.data?.message ||
        "An error occurred while fetching aboutUs.";
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchAboutUs,
    aboutUsFirst,
    aboutUsCenter,
    aboutUsLast,
    loading,
    error,
  };
};
