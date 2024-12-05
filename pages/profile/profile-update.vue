<template>
  <div class="component-holder">
    <div class="mb-8 bg-white shadow-sm m-h-400 px-24 m-5 py-16">
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <!-- Profile Picture Field with Custom Image Chooser -->
        <div class="col-span-1 md:col-span-3">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <!-- Image Preview -->
              <img
                :src="profileImageUrl || '/images/default-profile.png'"
                alt="Profile Picture"
                class="w-24 h-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer img-back"
                @click="triggerFileInput"
              />
              <!-- Hidden File Input -->
              <input
                ref="imageInput"
                type="file"
                @change="handleImageChange"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
              />
              <!-- Change Icon Button -->
              <div
                class="absolute top-0 left-0 p-1 text-secondary bg-white rounded-full shadow-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path
                      d="M12 20H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1a2 2 0 0 0 2-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5M16 19h6m-3-3v6"
                    />
                    <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <!-- Profile Fields -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">{{
              $t("name")
            }}</label>
            <input
              v-model="formData.name"
              id="name"
              type="text"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700"
              >{{ $t("email") }}</label
            >
            <input
              v-model="formData.email"
              id="email"
              type="email"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <!-- Phone Field -->
          <div>
            <label
              for="phone"
              class="block text-sm font-medium text-gray-700"
              >{{ $t("mobile number") }}</label
            >
            <input
              v-model="formData.phone"
              id="phone"
              type="tel"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <!-- City Field -->
          <div class="grid grid-cols-1">
            <label class="block text-sm font-medium text-gray-700">{{
              $t("city")
            }}</label>
            <select
              v-model="formData.city_id"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option :value="null" disabled>{{ $t("select") }}</option>
              <option
                :value="city.id"
                v-for="(city, index) in cities"
                :key="index"
              >
                {{ city.name }}
              </option>
            </select>
          </div>

          <!-- Neighborhood Field -->
          <div class="grid grid-cols-1">
            <label class="block text-sm font-medium text-gray-700">{{
              $t("The neighborhood")
            }}</label>
            <select
              v-model="formData.state_id"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              :disabled="!formData.city_id"
              required
            >
              <option :value="null" disabled>{{ $t("select") }}</option>
              <option
                :value="state.id"
                v-for="(state, index) in states"
                :key="index"
              >
                {{ state.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-6 flex justify-center">
          <button
            type="submit"
            :disabled="!isFormChanged || loading"
            class="bg-main px-6 py-2 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {{ $t("save changes") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
const { fetchCities, cities } = useCities();
const { fetchStates, states } = useStates();
const { $api } = useNuxtApp();
// Reactive states
const formData = ref({
  name: "",
  email: "",
  phone: "",
  city_id: "",
  state_id: "",
});
const loading = ref(false);
const profileImageUrl = ref(""); // The URL of the profile image
const imageFile = ref(null);

const { $toastMessage } = useNuxtApp();

const showToast = (message, type) => {
  $toastMessage(message, type); // Use type 'success', 'error', 'info', etc.
};

// Fetch profile data when the component is mounted
onMounted(async () => {
  await fetchCities();
  try {
    const response = await $api.get("/profile-info"); // Replace with your API endpoint
    formData.value = {
      name: response.data.name,
      email: response.data.email,
      phone: response.data.phone,
      city_id: response.data.city_id,
      state_id: response.data.state_id,
    };
    profileImageUrl.value = response.data.profile_image_url || ""; // Image URL from the API
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
});

// Watch for city_id changes and fetch states
watch(
  () => formData.value.city_id, // Watching the correct reactive data
  async (newCityId) => {
    if (newCityId) {
      await fetchStates(newCityId);
    } else {
      // Reset states when no city is selected
      states.value = [];
    }
  },
  { immediate: true }
);

// Handle image file change
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    profileImageUrl.value = URL.createObjectURL(file); // Display image preview
  }
};

// Trigger file input click on image preview
const triggerFileInput = () => {
  const input = document.querySelector('input[type="file"]');
  if (input) {
    input.click();
  }
};

// Reactive state to track if the form has changed
const isFormChanged = computed(() => {
  return (
    formData.value.name !== "" ||
    formData.value.email !== "" ||
    formData.value.phone !== "" ||
    formData.value.city_id !== null ||
    formData.value.state_id !== null ||
    imageFile.value
  );
});

// Handle form submission
const handleSubmit = async () => {
  const form = new FormData();
  form.append("name", formData.value.name);
  form.append("email", formData.value.email);
  form.append("phone", formData.value.phone);
  form.append("city_id", formData.value.city_id);
  form.append("state_id", formData.value.state_id);
  if (imageFile.value) {
    form.append("profile_image", imageFile.value); // Append the image file
  }
  loading.value = true;
  try {
    await $api.post("/update-profile", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    showToast(res?.data?.message, "success");
    loading.value = false;
  } catch (error) {
    console.error("Error updating profile:", error);
    showToast(
      error?.response?.data?.message
        ? error.response.data.message
        : "Error updating profile:",
      "danger"
    );
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
/* Custom styles can go here */
.img-back {
  background-color: #26464273;
  color: transparent;
}
</style>
