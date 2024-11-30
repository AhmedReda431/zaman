import { ref } from "vue";

export const useStates = () => {
  const { $api } = useNuxtApp();
  const { showAlert } = useAlert();
  const states = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchStates = async (cityId) => {
    if (!cityId) {
      states.value = [];
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get(`/states?city_id=${cityId}`);
      states.value = response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.data?.message ||
        "An error occurred while fetching states.";
      showAlert(error.value, "danger");
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchStates,
    states,
    loading,
    error,
  };
};
