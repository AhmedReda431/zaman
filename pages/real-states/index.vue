<script setup>
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
const { t } = useI18n();
const { fetchCities, cities } = useCities();
const { fetchNeighborhoods, neighborhoods } = useNeighborhoods();
const { fetchCategories, categories } = useCategories();
const { fetchRealStates, realStates, loading, success, error } =
  useRealStates();

const isFilterVisible = ref(false);
const isAdvancedFilterVisible = ref(false);
const toggleFilter = () => {
  isFilterVisible.value = !isFilterVisible.value;
};
const resetFilters = () => {
  // Reset all filters to their default values
  city_id.value = "";
  neighborhood_id.value = "";
  category_id.value = "";
  number_of_rooms.value = "";
  bathrooms_of_rooms.value = "";
  search.value = "";
  land_area.value = "";
  price_from.value = 0;
  price_to.value = 10000;
  number_of_streets.value = null;

  // Clear the query parameters in the URL
  router.push({
    path: route.path, // Keep the current route
    query: {}, // Clear all query parameters
  });

  // Refetch the data with cleared filters
  fetchRealStates({});
};

const toggleAdvancedFilter = () => {
  isAdvancedFilterVisible.value = !isAdvancedFilterVisible.value;
};
const route = useRoute();
const router = useRouter();
let query = "";

query = route.query;

// filter data
const city_id = ref(query.city_id || "");
const neighborhood_id = ref(query.neighborhood_id || "");
const category_id = ref(query.category_id || "");
const number_of_rooms = ref(query.number_of_rooms || "");
const bathrooms_of_rooms = ref(query.bathrooms_of_rooms || "");
const search = ref(query.search || "");
const land_area = ref(query.land_area || "");
const price_from = ref(query.price_from || 0);
const price_to = ref(query.price_to || 10000);
const number_of_streets = ref(query.number_of_streets || null);

// Reactive state for selected min and max values

// Methods to update the values when the slider emits events
const onMinValueUpdate = (value) => {
  price_from.value = value;
};

const onMaxValueUpdate = (value) => {
  price_to.value = value;
};

const cityName = computed(() => {
  if (city_id.value) {
    const obj = cities.value.find((cat) => cat.id == city_id.value);
    return unref(obj).name;
  }
  return t("select city");
});
const neighborhoodName = computed(() => {
  if (neighborhood_id.value) {
    const obj = neighborhoods.value.find(
      (cat) => cat.id == neighborhood_id.value
    );
    return unref(obj).name;
  }
  return t("select neighborhood");
});
const categoryName = computed(() => {
  if (category_id.value) {
    const obj = categories.value.find((cat) => cat.id == category_id.value);
    return unref(obj).name;
  }
  return t("select building type");
});

onMounted(async () => {
  loading.value = true;
  await fetchCities();
  // await fetchNeighborhoods();
  await fetchCategories();
  await fetchRealStates(query);
  loading.value = false;
});
const searchMethod = async () => {
  router.push({
    path: "/real-states",
    query: {
      city_id: city_id.value,
      neighborhood_id: neighborhood_id.value,
      category_id: category_id.value,
      number_of_rooms: number_of_rooms.value,
      bathrooms_of_rooms: bathrooms_of_rooms.value,
      search: search.value,
      land_area: land_area.value,
      price_from: price_from.value,
      price_to: price_to.value,
      number_of_streets: number_of_streets.value,
    },
  });
  query = route.query;
  await fetchRealStates(query).then(() => {
    router.go(0);
  });
};

// settign pagination

// Existing imports and setup remain unchanged

const handlePageChange = async (page) => {
  // Check if the query object has at least one key-value pair
  const hasFilters = Object.keys(query).length > 0;

  // Construct the updated query, only including 'page' if filters exist
  const updatedQuery = hasFilters ? { ...query, page } : { page };

  // Update the route with the new page query
  router.push({
    path: route.path,
    query: updatedQuery,
  });

  // Wait for the route to fully update and fetch data
  await fetchRealStates(updatedQuery);

  // Ensure the scroll happens after the data and DOM update
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, 100);
};
</script>
<template>
  <div class="max-w--6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div>
      <!-- Top Bar -->

      <div class="mt-5 flex items-center justify-between gap-2 px-10">
        <!-- Filter Button -->
        <button
          @click="toggleFilter"
          class="bg-zaman text-white px-3 py-2.5 rounded-md flex items-center"
        >
          <Icon name="mdi:filter" class="w-4 h-4" />
          <span class="text-sm">{{ $t("filter") }}</span>
        </button>
        <button
          @click="resetFilters"
          v-if="Object.keys(route.query).length"
          class="bg-zaman text-white px-3 py-2.5 rounded-md flex items-center"
        >
          <Icon name="mdi:filter" class="w-4 h-4" />
          <span class="text-sm">Reset</span>
        </button>

        <!-- Search Bar -->
        <div class="flex-grow relative">
          <input
            v-model="search"
            type="text"
            name="search"
            id="search"
            :placeholder="$t('search about')"
            class="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-md placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        <!-- Results Counter -->
        <div
          class="bg-secondary text-white px-3 py-2.5 rounded-md flex justify-center items-center gap-x-1"
        >
          <span class="font-semibold text-sm"
            >{{ $t("results") }}
            <span class="main-color font-weight-bold mx-2">{{
              realStates?.meta?.total || 0
            }}</span>
          </span>
          <!-- <span class="text-sm">{{$t('results')}}</span> -->
        </div>
      </div>

      <!-- Filter Section -->
      <div
        v-if="isFilterVisible"
        class="mt-3 bg-white p-6 rounded-lg shadow-md filter-holder"
      >
        <!-- Grid Container -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 align-items-end"
        >
          <!-- City Selection -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">{{
              $t("city")
            }}</label>
            <div class="relative">
              <div class="flex flex-col">
                <Listbox v-model="city_id">
                  <div class="relative mt-1">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{ cityName }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2"
                      >
                      </span>
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
                          v-for="city in cities"
                          :key="city.name"
                          :value="city.id"
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
                              >{{ city.name }}</span
                            >
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                            >
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
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
          <!-- neighborhood Selection -->
          <div class="space-y-2" v-if="neighborhoods?.length">
            <label class="block text-sm font-medium text-gray-700">{{
              $t("neighborhood")
            }}</label>
            <div class="relative">
              <div class="flex flex-col">
                <Listbox v-model="city_id">
                  <div class="relative mt-1">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{ neighborhoodName }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2"
                      >
                      </span>
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
                          v-for="neighborhood in neighborhoods"
                          :key="neighborhood.name"
                          :value="neighborhood.id"
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
                              >{{ neighborhood.name }}</span
                            >
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                            >
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
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

          <!-- land_area Selection -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">{{
              $t("Building area")
            }}</label>
            <div class="relative">
              <div class="flex flex-col">
                <Field
                  v-model="land_area"
                  type="text"
                  name="land_area"
                  id="land_area"
                  :placeholder="$t('Enter the area in square metres')"
                  class="block w-full rounded-lg ring-1 ring-inset ring-gray-300 border-0 mt-1 py-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <!-- Property Type Selection -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">{{
              $t("Building type")
            }}</label>
            <div class="relative">
              <div class="flex flex-col">
                <Listbox v-model="category_id">
                  <div class="relative mt-1">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{ categoryName }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2"
                      >
                      </span>
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
                              {{ category.name }}
                            </span>
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                            >
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
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
          <div class="space-y-2">
            <!-- <label class="block text-sm font-medium text-gray-700">{{
              $t("select")
            }}</label>
            <div class="relative">
              <div class="flex flex-col">
                <Listbox v-model="bathrooms_of_rooms">
                  <div class="relative mt-1">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{
                        bathrooms_of_rooms ||
                        $t("Choose the number of bathrooms")
                      }}</span>
                      <span
                        class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2"
                      >
                      </span>
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
                          v-for="i in 10"
                          :key="i + '-bathrooms_of_rooms'"
                          :value="i"
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
                              {{ i }}
                            </span>
                            <span
                              v-if="selected"
                              class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                            >
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
              </div>
            </div> -->
          </div>

          <!-- price_from Range -->
          <!-- <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">{{
              $t("price")
            }}</label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="1000"
              v-model="price_from"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
            />
            <div class="text-center">{{ price_from }} {{ $t("riyal") }}</div>
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">{{
              $t("price")
            }}</label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="1000"
              v-model="price_to"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
            />
            <div class="text-center">{{ price_to }} {{ $t("riyal") }}</div>
          </div> -->
          <div class="filter-holder2">
            <PriceRangeSlider
              :min="0"
              :max="10000"
              :step="100"
              :initialMin="price_from"
              :initialMax="price_to"
              gap="500"
              @update:minValue="onMinValueUpdate"
              @update:maxValue="onMaxValueUpdate"
            />
            <div class="pt-5">
              {{ $t("price") }} : {{ price_from }} - {{ price_to }}
              {{ $t("riyal") }}
            </div>
          </div>
        </div>
        <!-- Additional Filter Options -->
        <template v-if="isAdvancedFilterVisible">
          <div class="flex items-center space-x-2 my-4">
            <h2 class="text-sm font-semibold leading-6 text-secondary ml-2">
              {{ $t("advanced search") }}
            </h2>
            <div class="flex-grow border-t border-gray-300"></div>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
          >
            <!-- Room Count -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">{{
                $t("Number of rooms")
              }}</label>
              <div class="relative">
                <div class="flex flex-col">
                  <Listbox v-model="number_of_rooms">
                    <div class="relative mt-1">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                      >
                        <span class="block truncate">{{
                          number_of_rooms || $t("Choose the number of rooms")
                        }}</span>
                        <span
                          class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2"
                        >
                        </span>
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
                            v-for="i in 20"
                            :key="i + '-number_of_rooms'"
                            :value="i"
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
                                {{ i }}
                              </span>
                              <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                              >
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
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

            <!-- Bathroom Count -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">{{
                $t("Number of bathrooms")
              }}</label>
              <div class="relative">
                <div class="flex flex-col">
                  <Listbox v-model="bathrooms_of_rooms">
                    <div class="relative mt-1">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                      >
                        <span class="block truncate">{{
                          bathrooms_of_rooms ||
                          $t("Choose the number of bathrooms")
                        }}</span>
                        <span
                          class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2"
                        >
                        </span>
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
                            v-for="i in 10"
                            :key="i + '-bathrooms_of_rooms'"
                            :value="i"
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
                                {{ i }}
                              </span>
                              <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                              >
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
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

            <!-- Street Count -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">{{
                $t("Number of streets")
              }}</label>
              <div class="relative">
                <div class="flex flex-col">
                  <Listbox v-model="number_of_streets">
                    <div class="relative mt-1">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-3 rtl:pr-3 pl-3 rtl:pl-10 pr-10 text-left rtl:text-right shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-zaman-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                      >
                        <span class="block truncate">{{
                          number_of_streets ||
                          $t("Choose the number of streets")
                        }}</span>
                        <span
                          class="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-2 pr-2"
                        >
                        </span>
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
                            v-for="i in 4"
                            :key="i + '-number_of_streets'"
                            :value="i"
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
                                {{ i }}
                              </span>
                              <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                              >
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
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
          </div>
        </template>

        <!-- Buttons -->
        <div class="mt-6 flex justify-center space-x-4">
          <button
            @click="searchMethod"
            class="px-4 py-2 mx-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            style="background-color: #264642; color: white"
          >
            {{ $t("search") }}
          </button>
          <button
            @click="toggleAdvancedFilter"
            class="px-4 py-2 mx-4 bg-secondary text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            {{ $t("advanced search") }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="mt-8 rent-page-cards-holder w-full m-0"
      v-if="realStates.real_estates && realStates.real_estates.length > 0"
    >
      <NuxtLink
        v-for="item in realStates.real_estates"
        :key="item.id"
        :to="`/real-states/${item.id}`"
        class="card-holder w-full"
      >
        <OfferCard :offer="item" class="my-4 w-full" />
      </NuxtLink>
    </div>
    <!-- Pagination Component -->
    <Pagination
      v-if="realStates?.meta"
      :meta="realStates.meta"
      @pageChange="handlePageChange"
    />
    <div v-if="loading" class="mt-8 grid grid-cols-4 gap-4 mb-5">
      <CardSkeleton v-for="i in 8" :key="i" />
    </div>

    <div
      v-if="
        !loading &&
        (!realStates.real_estates || realStates.real_estates.length == 0)
      "
      class="mt-8 w-full text-center mb-5"
    >
      <h2>
        {{ $t("There are no items") }}
      </h2>
    </div>
  </div>
  <LoadingScreen v-if="loading" />
</template>

<style scoped lang="scss">
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(255, 136, 0);
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(255, 136, 0);
  cursor: pointer;
}

input[type="range"]::-ms-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgb(255, 136, 0);
  cursor: pointer;
}
.card-holder {
  display: flex;
  justify-content: center;
  width: 100%;
}
.rent-page-cards-holder {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .card-holder {
    width: 18%;
    margin: 0 5px;
  }
}
.filter-holder {
  width: 95%;
  margin-inline: auto;
}
.filter-holder2 {
  width: 100%;
  margin-top: 30px;
}
</style>
