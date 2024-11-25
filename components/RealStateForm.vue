<script setup>
import { useForm, useIsFormValid, useValidateForm } from "vee-validate";
import { ref, computed, onMounted, watch } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const { t, locale } = useI18n();
const { values } = useForm();
const validateForm = useValidateForm();
const isValid = useIsFormValid();
const emit = defineEmits(["valid", "notValid"]);
const { fetchCities, cities } = useCities();
const { fetchCategories, categories } = useCategories();
defineProps({
  serverErrors: {
    required: false,
  },
  loading: {
    default: false,
  },
});

const formData = ref({
  price: "",
  email: "",
  city_id: "",
  category_id: "",
  images: [],
  videos: [],
  plans: [],
  description: "",
  //   whatsup: "",
  //   license_number: "",
  //   real_estate_characteristics: "",
  //   depth: "",
  water: 0,
  electricity: 0,
  street_facing: "",
  street_area: "",
  number_of_streets: "",
  street: "",
  land_area: "",
  number_of_council_rooms: "",
  hall_number: "",
  location: "",
});

const selectedFiles = ref([]);
const uploadedImages = ref([]);
const handleFileUpload = (event) => {
  // Append newly selected files to the existing selectedFiles array
  selectedFiles.value = [
    ...selectedFiles.value,
    ...Array.from(event.target.files),
  ];
  uploadImages();
};

const deleteImage = (index) => {
  uploadedImages.value.splice(index, 1);
  selectedFiles.value.splice(index, 1);
  formData.value.images.splice(index, 1);
};

const uploadImages = () => {
  formData.value.images = selectedFiles.value;
  uploadedImages.value = selectedFiles.value.map((file) => ({
    url: URL.createObjectURL(file),
  }));
};

// plans

const selectedFilesPlans = ref([]);
const uploadedImagesPlans = ref([]);
const handleFileUploadPlans = (event) => {
  // Append newly selected files to the existing selectedFilesPlans array
  selectedFilesPlans.value = [
    ...selectedFilesPlans.value,
    ...Array.from(event.target.files),
  ];
  uploadImagesPlans();
};

const deleteImagePlans = (index) => {
  uploadedImagesPlans.value.splice(index, 1);
  selectedFilesPlans.value.splice(index, 1);
  formData.value.images.splice(index, 1);
};

const uploadImagesPlans = () => {
  formData.value.plans = selectedFilesPlans.value;
  uploadedImagesPlans.value = selectedFilesPlans.value.map((file) => ({
    url: URL.createObjectURL(file),
  }));
};

const selectedLocation = ref(null);
const location = (data) => {
  selectedLocation.value = data;
};

const submit = async () => {
  await validateForm();
  if (isValid.value) {
    const formDataSend = new FormData();

    // Append all fields to FormData
    Object.entries(formData.value).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        // Handle arrays (e.g., images, plans)
        val.forEach((item, index) => {
          formDataSend.append(`${key}[${index}]`, item);
        });
      } else {
        // Handle other fields
        formDataSend.append(key, val);
      }
    });
    emit("submit", formDataSend);
  }
};
import { useRouter } from "vue-router";
const isAuthenticated = computed(() => useAuthStore().isAuthenticated);

const { $toastMessage } = useNuxtApp();

const showToast = (message, type) => {
  $toastMessage(message, type); // Use type 'success', 'error', 'info', etc.
};
onMounted(async () => {
  if (!isAuthenticated.value) {
    showToast(t("you must login first!"), "error");
    const router = useRouter();
    router.push("/login");
  }
  await fetchCities();
  await fetchCategories();
});
</script>

<template>
  <div class="bg-gray-100 p-10">
    <div class="bg-white rounded-md">
      <div class="border-gray-200 px-4 py-5 sm:px-6">
        <h3 class="text-base font-semibold leading-6 text-zaman-700">
          {{ $t("View the property") }}
        </h3>
      </div>
      <div class="p-4 sm:px-6">
        <!-- Details -->
        <div>
          <h2 class="text-sm font-semibold leading-6 text-secondary">
            {{ $t("details") }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">{{
                $t("city")
              }}</label>
              <select
                v-model="formData.city_id"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option :value="null" selected disabled>
                  {{ $t("select") }}
                </option>
                <option v-for="city in cities" :value="city.id" :key="city">
                  {{ city.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                {{ $t("Property type") }}</label
              >
              <select
                v-model="formData.category_id"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option :value="null" selected disabled>
                  {{ $t("select") }}
                </option>
                <option v-for="cat in categories" :value="cat.id" :key="cat">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                {{ $t("price") }}</label
              >
              <input
                v-model="formData.price"
                type="number"
                min="0"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="mt-8">
          <h2 class="text-sm font-semibold leading-6 text-secondary">
            {{ $t("informations to contact") }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                {{ $t("mobile number") }}</label
              >
              <input
                v-model="formData.phone"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">{{
                $t("email")
              }}</label>
              <input
                v-model="formData.email"
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div class="md:col-span-1">
              <label class="block text-sm font-medium text-gray-700">{{
                $t("Marketer's name")
              }}</label>
              <input
                v-model="formData.marketerName"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">
                {{ $t("General Real Estate Authority license number") }}
              </label>
              <input
                v-model="formData.licenseNumber"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Property Information -->
        <div class="mt-8">
          <h2 class="text-sm font-semibold leading-6 text-secondary">
            {{ $t("Property information") }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">{{
                $t("Number of bedrooms")
              }}</label>
              <select
                v-model="formData.bedrooms"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>{{ $t("select") }}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">{{
                $t("Number of bathrooms")
              }}</label>
              <select
                v-model="formData.bathrooms_of_rooms"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>{{ $t("select") }}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                {{ $t("Number of halls") }}</label
              >
              <select
                v-model="formData.hall_number"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>{{ $t("select") }}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                {{ $t("Number of council rooms") }}</label
              >
              <select
                v-model="formData.number_of_council_rooms"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>{{ $t("select") }}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">
                {{ $t("Floor area of ​​council rooms") }}</label
              >
              <input
                v-model="formData.land_area"
                type="number"
                min="0"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Site and Street Information -->
        <div class="mt-8">
          <h2 class="text-sm font-semibold leading-6 text-secondary">
            {{ $t("Location and street information") }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">
                {{ $t("Street name") }}</label
              >
              <input
                v-model="formData.street"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">{{
                $t("Number of streets")
              }}</label>
              <select
                v-model="formData.number_of_streets"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>{{ $t("select") }}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">
                {{ $t("Street width") }}</label
              >
              <input
                v-model="formData.street_area"
                type="number"
                min="0"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700">
                {{ $t("Street facade") }}</label
              >
              <input
                v-model="formData.street_facing"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <!-- <div class="mt-8">
          <h2 class="text-sm font-semibold leading-6 text-secondary">
           {{$t('Additional information')}}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >مياه</label
              >
              <div class="mt-1 flex items-center space-x-4">
                <label class="inline-flex items-center">
                  <input
                    v-model="formData.water"
                    type="radio"
                    :value="1"
                    class="form-radio"
                  />
                  <span class="mr-2 ml-8">نعم</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    v-model="formData.water"
                    type="radio"
                    :value="0"
                    class="form-radio"
                  />
                  <span class="mr-2">لا</span>
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >كهرباء</label
              >
              <div class="mt-1 flex items-center space-x-4">
                <label class="inline-flex items-center">
                  <input
                    v-model="formData.electricity"
                    type="radio"
                    :value="1"
                    class="form-radio"
                  />
                  <span class="mr-2 ml-8">نعم</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    v-model="formData.electricity"
                    type="radio"
                    :value="0"
                    class="form-radio"
                  />
                  <span class="mr-2">لا</span>
                </label>
              </div>
            </div>
            <div class="md:col-span-1">
              <label class="block text-sm font-medium text-gray-700"
                >الطول</label
              >
              <input
                v-model="formData.length"
                type="number"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div class="md:col-span-1">
              <label class="block text-sm font-medium text-gray-700"
                >العمق</label
              >
              <input
                v-model="formData.depth"
                type="number"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div> -->

        <!-- Features and Amenities -->
        <!-- <div class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">المميزات والمرافق</h2>
                    <div class="m-4">
                        <label class="block text-sm font-medium text-gray-700">المميزات والمرافق</label>
                        <input v-model="formData.formData.amenities" type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    </div>
                </div> -->

        <!-- Property Description -->
        <div class="mt-8">
          <h2 class="text-sm font-semibold leading-6 text-secondary">
            {{ $t("Description") }}
          </h2>
          <div class="m-4">
            <label class="block text-sm font-medium text-gray-700">{{
              $t("Description of the property")
            }}</label>
            <textarea
              v-model="formData.description"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows="6"
            ></textarea>
          </div>
        </div>

        <!-- Images Section -->
        <!-- <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الصور</h2>
                    <div class="grid grid-cols-5 gap-4 mb-2 m-4">
                        <div v-for="n in 5" :key="n"
                            class="flex justify-center items-center bg-gray-100 h-40 rounded-lg">
                            <img src="" alt="Image Placeholder" class="w-8 h-8">
                        </div>
                    </div>
                    <p class="text-sm text-right text-orange-600 cursor-pointer">اضافة صور أخرى</p>
                </section> -->

        <!-- Multiple Image Upload Section -->
        <h2 class="text-sm font-semibold leading-6 text-secondary mt-5">
          {{ $t("the pictures") }}
        </h2>
        <div class="images-holder">
          <div class="flex items-center justify-center w-full">
            <!-- Button to trigger multiple image upload -->

            <label
              for="multiple-image-upload"
              class="flex justify-center items-center bg-gray-50 rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 border-2 border-gray-300 border-dashed adding-label"
            >
              <div class="flex flex-row items-center gap-5 justify-center px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 21v-8H3v-2h8V3h2v8h8v2h-8v8z"
                  />
                </svg>
                <p class="text-sm text-gray-700">
                  <span class="font-semibold">{{
                    $t("addImages.addAdditionalImages")
                  }}</span>
                </p>
              </div>
              <input
                id="multiple-image-upload"
                @change="handleFileUpload"
                type="file"
                multiple
                class="hidden"
              />
            </label>
          </div>

          <div v-if="uploadedImages.length" class="grid gap-4 grid-cols-6">
            <div
              v-for="(image, index) in uploadedImages"
              :key="index"
              class="relative"
            >
              <img
                :src="image.url"
                alt="Uploaded Image"
                class="border-2 rounded m-2 w-64 object-cover aspect-[4/3]"
              />
              <button
                @click="deleteImage(index)"
                class="absolute top-0 right-0 m-3 text-red-500 hover:text-red-700"
              >
                <Icon name="material-symbols:delete-forever-outline" />
              </button>
            </div>
          </div>
        </div>

        <!-- Video Section -->
        <!-- <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الفيديو</h2>
                    <div class="bg-gray-100 h-24 flex items-center justify-between px-4 rounded-lg m-4">
                        <span></span> 
                        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                            <span>ارفاق فيديو</span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 01-2.828 0L2.343 10.172M15.172 7H8.343l-4 4m4-4l6.586 6.586c.78.78 2.048.78 2.828 0l6.586-6.586">
                                </path>
                            </svg>
                        </button>
                    </div>
                </section> -->

        <!-- Location Section -->
        <!-- <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">الموقع</h2>
                    <div class="bg-gray-100 h-24 flex items-center justify-between px-4 rounded-lg m-4">
                        <span></span> 
                        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                            <span>اضافة الموقع</span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 11V7a4 4 0 10-8 0v4a8 8 0 1016 0V7a4 4 0 00-8 0z"></path>
                            </svg>
                        </button>
                    </div>
                </section> -->

        <h2 class="text-sm font-semibold leading-6 text-secondary mt-5">
          {{ $t('building location') }}
        </h2>
        <LocationViewer class="mt-3" @updateLocation="formData.location = $event" />

        <!-- plans Image Upload Section -->
        <h2 class="text-sm font-semibold leading-6 text-secondary mt-5">
          {{ $t("chart") }}
        </h2>
        <div class="images-holder">
          <div class="flex items-center justify-center w-full">
            <!-- Button to trigger plans image upload -->

            <label
              for="multiple-image-plans-upload"
              class="flex justify-center items-center bg-gray-50 rounded-lg py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 border-2 border-gray-300 border-dashed adding-label"
            >
              <div class="flex flex-row items-center gap-5 justify-center px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 21v-8H3v-2h8V3h2v8h8v2h-8v8z"
                  />
                </svg>
                <p class="text-sm text-gray-700">
                  <span class="font-semibold"> {{ $t("Add chart") }}</span>
                </p>
              </div>
              <input
                id="multiple-image-plans-upload"
                @change="handleFileUploadPlans"
                type="file"
                multiple
                class="hidden"
              />
            </label>
          </div>

          <div v-if="uploadedImagesPlans.length" class="grid gap-4 grid-cols-6">
            <div
              v-for="(image, index) in uploadedImagesPlans"
              :key="index"
              class="relative"
            >
              <img
                :src="image.url"
                alt="Uploaded Image"
                class="border-2 rounded m-2 w-64 object-cover aspect-[4/3]"
              />
              <button
                @click="deleteImagePlans(index)"
                class="absolute top-0 right-0 m-3 text-red-500 hover:text-red-700"
              >
                <Icon name="material-symbols:delete-forever-outline" />
              </button>
            </div>
          </div>
        </div>

        <!-- Plan Section -->
        <!-- <section class="mt-8">
                    <h2 class="text-sm font-semibold leading-6 text-secondary">المخطط</h2>
                    <div class="bg-gray-100 h-24 flex items-center justify-between px-4 rounded-lg m-4">
                        <span></span>
                        <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center">
                            <span>اضافة المخطط</span>
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 14l-7 7-7-7M5 10l7-7 7 7"></path>
                            </svg>
                        </button>
                    </div>
                </section> -->
      </div>
    </div>
    <button
      :class="{ 'cursor-not-allowed': loading, 'opacity-50': loading }"
      :disabled="loading"
      class="my-5 w-full bg-zaman text-white px-3 py-2.5 rounded-md flex items-center justify-center"
      @click="submit"
    >
      <span v-if="!loading"> {{ $t("submit") }} </span>
      <span v-if="loading">
        {{ $t("loading") }}
        <IconsLoadingWhite />
      </span>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.adding-label {
  width: 230px;
  height: 70px;
}
.images-holder {
  background: #f5f5f5;
  padding: 35px 10px;
  margin: 20px 15px;
  border-radius: 15px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
