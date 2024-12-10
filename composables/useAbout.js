import { ref } from "vue";

export const useAboutUs = () => {
  const { $api } = useNuxtApp();
  const { showAlert } = useAlert();
  const aboutUs = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchAboutUs = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get("/about-us");
      aboutUs.value = response.data.data[0];
    } catch (err) {
      error.value =
        err.response?.data?.data?.message ||
        "An error occurred while fetching aboutUs.";
      showAlert(error.value, "danger");
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchAboutUs,
    aboutUs,
    loading,
    error,
  };
};
