import { ref } from "vue";

export const useNeighborhoods = () => {
  const { $api } = useNuxtApp();
  const { showAlert } = useAlert();
  const neighborhoods = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchNeighborhoods = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $api.get("/neighborhoods");
      neighborhoods.value = response.data.data;
    } catch (err) {
      error.value =
        err.response?.data?.data?.message ||
        "An error occurred while fetching neighborhoods.";
        showAlert(error.value, 'danger')
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchNeighborhoods,
    neighborhoods,
    loading,
    error,
  };
};
