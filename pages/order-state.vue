<script setup>
import { ref, onMounted } from "vue";
const { fetchCategories, categories } = useCategories();
const { fetchCities, cities } = useCities();
const { fetchStates, states } = useStates();
const { showAlert } = useAlert();
const { t } = useI18n();
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
definePageMeta({
  description: "state order",
  middleware: "auth",
});
let isSubmitted = ref(false);
let requestErrorMessage = ref(null);
let responseMessage = ref(null);
// let featuresArray = ref([]);
// const features = ref([]);
// let features_id = ref([]);
const category_id = ref(null);
const type_id = ref(null);
const number_of_rooms = ref(null);
const bathrooms_of_rooms = ref(null);
const land_area = ref(null);
const price_from = ref(null);
const price_to = ref(null);
const city_id = ref(null);
const state_id = ref(null);
const note = ref(null);
const { $api } = useNuxtApp();
// function getFeatures() {
//   $api
//     .get(`/features`)
//     .then((res) => {
//       features.value = res.data.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
const handleSubmit = async () => {
  try {
    const payload = {
      type: type_id.value,
      city_id: city_id.value,
      state_id: state_id.value,
      note: note.value || "",
      category_id: category_id.value,
      number_of_rooms: number_of_rooms.value,
      land_area: land_area.value,
      price_from: price_from.value,
      price_to: price_to.value,
      bathrooms_of_rooms: bathrooms_of_rooms.value,
      // features: features_id.value, // Array of selected feature IDs
    };

    const response = await $api.post("/real-estates", payload);
    responseMessage.value =
      response?.data?.message || t("Request submitted successfully");
    isSubmitted.value = true;
    requestErrorMessage.value = null
  } catch (error) {
    requestErrorMessage.value =
      error?.response?.data?.message ||
      t("An error occurred while submitting the request.");
    isSubmitted.value = true;
    console.error("API Error:", error);
  }
};
// Watch for changes in `featuresArray` and update `features_id` accordingly
// watch(
//   featuresArray,
//   (newVal) => {
//     // Reset `features_id` before pushing new values
//     features_id.value = newVal.map((feature) => feature.id);
//   },
//   { immediate: true }
// ); // Use immediate to run the watch on initial load
// Watch for changes in `city_id` and fetch states
watch(
  city_id,
  async (newCityId) => {
    await fetchStates(newCityId);
  },
  { immediate: true }
);

onMounted(async () => {
  // await getFeatures();
  await fetchCategories();
  await fetchCities();
});
const categoryName = computed(() => {
  if (category_id.value) {
    const obj = categories.value.find((cat) => cat.id == category_id.value);
    return unref(obj).title;
  }
  return t("select building type");
});
</script>

<template>
  <section>
    <div
      class="data-holder d-flex align-items-start justify-content-between gap-10 my-8 mx-24 d-mg-fleex-column"
    >
      <div class="left-side h-full rounded-custom m-h-650 w-50">
        <div class="form-holder rounded-custom" v-if="!isSubmitted || isSubmitted && requestErrorMessage">
          <div class="mt-10">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- <div class="flex flex-col" v-if="features?.length">
                <label for="features" class="mb-2">{{ $t("features") }}</label>

                <Listbox v-model="featuresArray" multiple>
                  <ListboxButton
                    class="w-full px-4 py-2 border rounded-md bg-white text-left flex items-center justify-between multi_select_dropdown"
                  >
                    <span>{{
                      featuresArray.map((feature) => feature.name).join(", ")
                    }}</span>
                    <ChevronDownIcon class="h-5 w-5 text-gray-500" />
                  </ListboxButton>
                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-out"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <ListboxOptions class="border rounded">
                      <ListboxOption
                        v-for="feature in features"
                        :key="feature.id"
                        :value="feature"
                        class="cursor-pointer px-4 py-2 hover:bg-gray-200 d-flex gap-3"
                      >
                        <CheckIcon
                          v-if="featuresArray.includes(feature)"
                          class="h-5 w-5 text-indigo-600"
                        />
                        <span>{{ feature.name }}</span>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </Listbox>
              </div> -->
              <!-- Property category -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">{{
                  $t("Property category")
                }}</label>
                <div class="relative">
                  <div class="flex flex-col">
                    <Listbox v-model="category_id">
                      <div class="relative mt-1">
                        <ListboxButton
                          class="w-full px-4 py-2 border rounded-md bg-white text-left flex items-center justify-between multi_select_dropdown"
                        >
                          <span class="block truncate">{{ categoryName }}</span>
                          <span
                            class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2"
                          >
                          </span>
                          <ChevronDownIcon class="h-5 w-5 text-gray-500" />
                        </ListboxButton>

                        <transition
                          leave-active-class="transition duration-100 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <ListboxOptions
                            class="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm"
                          >
                            <ListboxOption
                              v-slot="{ active, selected }"
                              v-for="category in categories"
                              :key="category.name"
                              :value="category.id"
                              as="template"
                            >
                              <li
                                :class="[
                                  active
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]"
                              >
                                <span
                                  :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate',
                                  ]"
                                >
                                  {{ category.title }}
                                </span>
                                <span
                                  v-if="selected"
                                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                                >
                                  <CheckIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </li>
                            </ListboxOption>
                          </ListboxOptions>
                        </transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
              <!-- Property type -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">{{
                  $t("Property type")
                }}</label>
                <div class="relative">
                  <select
                    v-model="type_id"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option :value="null" selected disabled>
                      {{ $t("select") }}
                    </option>
                    <option value="0">
                      {{ $t("sell") }}
                    </option>
                    <option value="1">
                      {{ $t("categories.rent") }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">{{
                    $t("Number of bedrooms")
                  }}</label>
                  <input
                    v-model="number_of_rooms"
                    type="number"
                    min="0"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">{{
                    $t("Number of bathrooms")
                  }}</label>
                  <input
                    v-model="bathrooms_of_rooms"
                    type="number"
                    min="0"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1">
                <div>
                  <label class="block text-sm font-medium text-gray-700">{{
                    $t("Land area")
                  }}</label>
                  <input
                    v-model="land_area"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">{{
                    $t("price from")
                  }}</label>
                  <input
                    v-model="price_from"
                    type="number"
                    min="0"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">{{
                    $t("price to")
                  }}</label>
                  <input
                    v-model="price_to"
                    type="number"
                    min="1"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1">
                <label class="block text-sm font-medium text-gray-700">{{
                  $t("city")
                }}</label>
                <select
                  v-model="city_id"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option :value="null" selected disabled>
                    {{ $t("select") }}
                  </option>
                  <option
                    :value="city.id"
                    v-for="(city, index) in cities"
                    :key="index"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>
              <div class="grid grid-cols-1">
                <label class="block text-sm font-medium text-gray-700">{{
                  $t("The neighborhood")
                }}</label>
                <select
                  v-model="state_id"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  :disabled="!city_id"
                >
                  <option :value="null" selected disabled>
                    {{ $t("select") }}
                  </option>
                  <option
                    :value="state.id"
                    v-for="(state, index) in states"
                    :key="index"
                  >
                    {{ state.name }}
                  </option>
                </select>
              </div>
              <div class="grid grid-cols-1">
                <div>
                  <label class="block text-sm font-medium text-gray-700">{{
                    $t("notes")
                  }}</label>
                  <textarea
                    v-model="note"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows="6"
                  ></textarea>
                </div>
              </div>
              <div class="py-5">
                <button
                  type="submit"
                  class="px-6 py-2 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300 d-flex gap-3 py-3"
                  style="background-color: #264642; color: white"
                >
                  <span>{{ $t("submit") }}</span>
                  <span class="icon">
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      data-v-f6fc78ba=""
                    >
                      <g clip-path="url(#clip0_85_49628)" data-v-f6fc78ba="">
                        <path
                          d="M6.54912 15.64L0.504717 12.2912C0.36228 12.1963 0.247336 12.0656 0.171435 11.9121C0.0955337 11.7587 0.0613492 11.588 0.0723167 11.4172C0.076226 11.247 0.127319 11.0811 0.219905 10.9382C0.312492 10.7952 0.442938 10.6808 0.596717 10.6076L21.8579 0.0736193C22.0094 0.0180221 22.1757 0.0180221 22.3271 0.0736193L6.53072 15.7044L6.54912 15.64ZM6.43872 17.0844V22.356C6.43964 22.4497 6.46913 22.5408 6.52323 22.6172C6.57733 22.6937 6.65348 22.7518 6.74149 22.7838C6.8295 22.8158 6.92519 22.8202 7.01575 22.7963C7.10632 22.7725 7.18746 22.7216 7.24832 22.6504L10.9283 18.1608L15.4547 20.7C15.5728 20.778 15.7073 20.8277 15.8477 20.8453C15.9881 20.8628 16.1307 20.8478 16.2643 20.8012C16.4049 20.7536 16.5319 20.6727 16.6344 20.5653C16.7369 20.458 16.812 20.3274 16.8531 20.1848L22.8331 0.920019C22.8382 0.871082 22.8382 0.821756 22.8331 0.772819L6.43872 17.0844Z"
                          fill="white"
                          data-v-f6fc78ba=""
                        ></path>
                      </g>
                      <defs data-v-f6fc78ba="">
                        <clipPath id="clip0_85_49628" data-v-f6fc78ba="">
                          <rect
                            width="23"
                            height="23"
                            fill="white"
                            data-v-f6fc78ba=""
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- Success message after form submission -->
        <div
          v-else-if="isSubmitted && responseMessage"
          class="mx-auto text-center w-full"
        >
          <!-- نفس التعديل هنا -->
          <!-- <img
       src="https://picsum.photos/800/400"
       alt="Success Image"
       class="mx-auto mb-4"
     /> -->

          <div class="success-message-holder">
            <div class="main-container">
              <!-- <div class="check-container">
           <div class="check-background">
             <svg
               viewBox="0 0 65 51"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M7 25L27.3077 44L58.5 7"
                 stroke="white"
                 stroke-width="13"
                 stroke-linecap="round"
                 stroke-linejoin="round"
               />
             </svg>
           </div>
           <div class="check-shadow"></div>
         </div> -->
              <img
                src="~/assets/img/submit_done.svg"
                alt="Success Image"
                class="mx-auto mb-4"
              />
            </div>
          </div>
          <!-- <h3 class="text-green-600 text-2xl font-bold">
       {{responseMessage}}
     </h3> -->
          <h3 class="text-green-600 text-2xl font-bold">
            {{ $t("Request sent successfully!") }}
          </h3>
          <p class="text-gray-600 mt-2">
            {{
              $t(
                "We are happy to communicate with Zaman Company and we will respond as soon as possible"
              )
            }}
          </p>
        </div>
      </div>
      <div
        class="right-side w-50 d-flex align-items-center justify-content-center flex-1 right-side-holder m-h-650 rounded-custom"
      >
        <div
          class="right-side d-flex align-items-center justify-content-center flex-column m-h-650 rounded-custom"
        >
          <div class="title">
            <h1>{{ $t("requistBuilding") }}</h1>
          </div>
          <div class="description">
            <h3>
              {{ $t("Fill in your information now") }}
            </h3>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="error" v-if="isSubmitted && requestErrorMessage">
      {{ requestErrorMessage }}
    </div> -->
  </section>
</template>
<style lang="scss" scoped>
.right-side-holder {
  background: url("@/assets/img/contact/contact-back.jpg") no-repeat center
    center;
  background-size: cover;
  .right-side {
    background: #264642eb;
    width: 100%;
    height: 100%;
    inset: 0;
    color: #fff;
  }
}
.title {
  font-size: 2.5em;
  margin-bottom: 40px;
}
.description {
  font-size: 1.3em;
}
.rounded-custom {
  border-radius: 15px;
}
.m-h-650 {
  min-height: 650px;
}
.left-side {
  padding: 10px 40px;
  background: #fff;
}
</style>
