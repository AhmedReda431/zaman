<script setup>
import {
  ClockIcon,
  Share2Icon,
  HeartIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarFoldIcon,
} from "lucide-vue-next";
const { fetchRealState, realState, loading, success, error } = useRealStates();
const { t, locale } = useI18n();
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

let propertyInfo = ref([]);
let streetInfo = ref([]);
let info = ref([]);
const { $api } = useNuxtApp();
onMounted(async () => {
  // Ensure this runs only on the client-side
  currentPageUrl = window.location.href;
  currentPageTitle = document.title;

  let id = useRoute().params.id;
  await fetchRealState(id);
  // property info
  if (realState.value.land_area)
    propertyInfo.value.push({
      label: t("Land area"),
      value: `${realState.value.land_area} م`,
      icon: "mdi mdi-vector-square",
    });
  if (realState.value.number_of_rooms)
    propertyInfo.value.push({
      label: t("Number of rooms"),
      value: `${realState.value.number_of_rooms} `,
      icon: "mdi mdi-vector-square",
    });

  if (realState.value.number_of_council_rooms)
    propertyInfo.value.push({
      label: t("numberOfCouncilRooms"),
      value: `${realState.value.number_of_council_rooms} `,
      icon: "mdi mdi-vector-square",
    });

  if (realState.value.bathrooms_of_rooms)
    propertyInfo.value.push({
      label: t("Number of bathrooms"),
      value: `${realState.value.bathrooms_of_rooms} `,
      icon: "mdi mdi-vector-square",
    });
  if (realState.value.hall_number)
    propertyInfo.value.push({
      label: t("numberOfHalls"),
      value: `${realState.value.hall_number} `,
      icon: "mdi mdi-vector-square",
    });
  // street info
  if (realState.value.street)
    streetInfo.value.push({
      label: t('streetName'),
      value: `${realState.value.street} `,
      icon: "mdi mdi-vector-square",
    });
  if (realState.value.number_of_streets)
    streetInfo.value.push({
      label: t("Number of streets"),
      value: `${realState.value.number_of_streets} `,
      icon: "mdi mdi-vector-square",
    });

  if (realState.value.street_area)
    streetInfo.value.push({
      label: t("streetWidth"),
      value: `${realState.value.street_area} `,
      icon: "mdi mdi-vector-square",
    });

  if (realState.value.street_facing)
    streetInfo.value.push({
      label: t("streetFacade"),
      value: `${realState.value.street_facing} `,
      icon: "mdi mdi-vector-square",
    });
});
let currentImageIndex = ref(0);

let currentPageUrl = "";
let currentPageTitle = "";
const sharePage = () => {
  if (navigator.share) {
    navigator
      .share({
        title: currentPageTitle,
        text: `Check out this page: ${currentPageTitle}`,
        url: currentPageUrl,
      })
      .then(() => {
        console.log("Page shared successfully!");
      })
      .catch((error) => {
        console.error("Error sharing page:", error);
      });
  } else {
    copyToClipboard(currentPageUrl);
    alert("The URL has been copied to your clipboard!");
  }
};

const copyToClipboard = (text) => {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
};

// dialog
const bookDialogIsOpen = ref(false);
const reportDialogIsOpen = ref(false);

function closeBookModal() {
  bookDialogIsOpen.value = false;
}
function closeReportModal() {
  reportDialogIsOpen.value = false;
}
function openBookModal() {
  bookDialogIsOpen.value = true;
}
function openReportModal() {
  reportDialogIsOpen.value = true;
}

let bookFormData = ref({
  name: null,
  phone: null,
  date: null,
  note: null,
  real_estate_id: useRoute().params.id,
});
let reportFormData = ref({
  name: null,
  phone: null,
  type: null,
  note: null,
  real_estate_id: useRoute().params.id,
});
const { $toastMessage } = useNuxtApp();
const showToast = (message, type) => {
  $toastMessage(message, type); // Use type 'success', 'error', 'info', etc.
};
function bookApiCall() {
  $api
    .post("/booking-real-estates", bookFormData.value)
    .then((res) => {
      showToast(res?.data?.message, "success");
    })
    .catch((err) => {
      if (err?.response?.data?.message) {
        showToast(err?.response?.data?.message, "danger");
      }
    })
    .finally(() => {
      closeBookModal();
    });
}
function reportApiCall() {
  $api
    .post("/notify-real-estates", reportFormData.value)
    .then((res) => {
      showToast(res?.data?.message, "success");
    })
    .catch((err) => {
      if (err?.response?.data?.message) {
        showToast(err?.response?.data?.message, "danger");
      }
    })
    .finally(() => {
      closeReportModal();
    });
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
      <div class="md:col-span-2">
        <div class="location bg-white p-2 shadow-sm rounded mb-5">
          <div
            class="flex items-center justify-content-between liang-items-center flex-sm-column"
          >
            <span class="font-semibold">{{ realState?.name }}</span>
            <span class="font-semibold d-flex gap-2 align-items-center">
              <span><MapPinIcon size="24" /></span>
              <span>{{ realState?.city?.name }}</span>
            </span>
          </div>
        </div>
        <!-- Main image -->
        <div class="relative overflow-hidden rounded-lg mb-2 h-96 h-500px">
          <img
            v-if="
              realState.images &&
              realState.images.length > 0 &&
              realState.images[currentImageIndex]
            "
            :src="realState?.images[currentImageIndex]"
            alt="Property main view"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Thumbnail gallery -->
        <div
          class="flex space-x-2 rtl:space-x-reverse overflow-x-auto pb-2 Thumbnail-gallery-holder"
        >
          <div
            v-for="(image, index) in realState.images"
            :key="index"
            class="flex-shrink-0 cursor-pointer relative"
            @click="currentImageIndex = index"
          >
            <img
              :src="image"
              :alt="`Thumbnail ${index + 1}`"
              class="w-20 h-20 object-cover rounded"
            />
          </div>
        </div>
        <div
          class="mt-5 mx-5"
          v-if="realState?.description"
          v-html="realState.description"
        ></div>
      </div>

      <div class="w-full mx-auto rounded-lg overflow-hidden md:col-span-1 mb-3">
        <div class="location bg-white p-2 shadow-sm rounded mb-5">
          <div
            class="flex items-center justify-content-between liang-items-center flex-sm-column"
          >
            <!-- <div class="font-semibold">
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <ClockIcon class="text-gray-500" :size="18" />
                <span class="text-sm text-gray-500 ml-2"
                  >كود العقار {{ code }}</span
                >
                <span class="text-sm text-gray-500">{{ formattedDate }}</span>
              </div>
            </div> -->
            <span
              class="font-semibold d-flex gap-2 align-items-center"
              v-if="realState?.uniqu_code"
            >
              <span> {{ $t("building code") }} : </span>
              <span class="orange">{{ realState?.uniqu_code }}</span>
            </span>
            <span
              class="font-semibold d-flex gap-2 align-items-center"
              v-if="realState?.date"
            >
              <span><CalendarFoldIcon size="24" /></span>
              <span>{{ realState?.date }}</span>
            </span>
            <span
              class="font-semibold d-flex gap-2 align-items-center"
              v-if="realState?.time"
            >
              <span><ClockIcon size="24" /></span>
              <span>{{ realState?.time }}</span>
            </span>
          </div>
        </div>
        <!-- Price -->
        <div class="bg-teal-800 text-white text-center py-3 text-xl font-bold">
          {{ realState?.price }} {{ $t("riyal") }}
        </div>

        <!-- Logo -->
        <div class="p-4 flex justify-center">
          <IconsLogo class="h-14 w-auto" alt="zaman" />
        </div>

        <!-- Contact buttons -->
        <div
          class="grid grid-cols-1 p-4 gap-2 border-t border-b border-gray-200 d-flex align-items-center flex-wrap gap-2"
        >
          <a
            :href="`tel:+966920014847`"
            
            class="text-gray-600 hover:text-green-600 flex items-center bg-white p-2 rounded"
          >
            <!-- <PhoneIcon size="24" /> -->
            <span class="mx-2 text-sm d-flex gap-3 align-items-center">
              <img src="~/assets/Icons/mobile.svg" alt="whatsapp" />
              <p class="font-semibold">{{ $t("mobile number") }}</p>
            </span>
            <!-- {{ realState.phone }} -->
          </a>

          <a
            href="https://wa.me/+966920014847"
            class="text-gray-600 hover:text-green-600 flex items-center bg-white p-2 rounded connect-link"
            target="_blank"
          >
            <!-- <PhoneIcon size="24" /> -->
            <span class="mx-2 text-sm">
              <!-- {{ $t("whatsapp number") }} -->
              <img src="~/assets/Icons/whatsapp.svg" alt="whatsapp" />
            </span>
            <!-- {{ realState.whatsup }} -->
          </a>
          <a
            :href="`mailto:Info@zman.sa`"
            
            class="text-gray-600 hover:text-green-600 flex items-center bg-white p-2 rounded connect-link"
          >
            <!-- <MailIcon size="24" /> -->
            <span class="mx-2 text-sm">
              <!-- {{ $t("email") }} -->
              <img src="~/assets/Icons/email.svg" alt="email" />
            </span>
            <!-- {{ realState.email }} -->
          </a>
          <button
            class="text-gray-600 hover:text-green-600 flex items-center bg-white p-2 rounded"
            @click="sharePage"
          >
            <!-- <MailIcon size="24" /> -->
            <span class="mx-2 text-sm">
              <!-- {{ $t("email") }} -->
              <img src="~/assets/Icons/share.svg" alt="email" />
            </span>
            <!-- {{ realState.email }} -->
          </button>
          <div
            v-if="!realState?.phone && !realState?.whatsup && !realState?.email"
          >
            {{ $t("There is no information to deal with the property") }}
          </div>
          <!-- Agent info -->
          <div class="flex justify-between px-4 py-2 bg-gray-100 w-full">
            <div class="bg-white p-3 rounded" v-if="realState?.marketer_name">
              <p class="text-sm text-gray-600 d-flex gap-2 align-items-center">
                <span>
                  <img src="~/assets/Icons/person.svg" alt="email" /> </span
                ><span>{{ $t("marketerName") }}</span>
              </p>
              <p class="font-semibold">{{ realState.marketer_name }}</p>
            </div>
            <div class="bg-white p-3 rounded" v-if="realState?.license_number">
              <p class="text-sm text-gray-600 d-flex gap-2 align-items-center">
                <span>
                  <img src="~/assets/Icons/license.svg" alt="email" />
                </span>
                <span>{{ $t("generalRealEstateLicense") }}</span>
              </p>
              <p class="font-semibold">{{ realState.license_number }}</p>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="p-4 space-y-2 actions-holder">
          <button
            class="w-full bg-gray-500 text-white py-2 rounded transition duration-300 ease-in-out"
            @click="openBookModal"
          >
            {{ $t("Book a property inspection") }}
          </button>
          <button
            class="w-full bg-gray-500 text-white py-2 rounded transition duration-300 ease-in-out"
            @click="openReportModal"
          >
            {{ $t("Report this property") }}
          </button>
        </div>
      </div>
    </div>

    <div
      class="p-4 md:p-8 bg-white rounded-lg shadow-lg border border-gray-300 m-3"
    >
      <h2
        class="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-start"
      >
        {{ $t("propertyInfo") }}
      </h2>
      <div class="d-flex gap-4 align-items-center flex-wrap flex-sm-column">
        <div
          v-for="(item, index) in propertyInfo"
          :key="index"
          class="flex flex-col items-center border border-gray-300 rounded-lg p-3 w-36 text-center info-data-holder"
        >
          <span class="flex items-center gap-1 text-yellow-700">
            <span v-if="item.icon" :class="item.icon"></span>
            {{ item.value }}
          </span>
          <span class="text-gray-500">{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div
      class="p-4 md:p-8 bg-white rounded-lg shadow-lg border border-gray-300 m-3"
      v-if="realState?.location"
    >
      <h2
        class="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-start"
      >
        {{ $t("location") }}
      </h2>
      <div class="iframe-container">
        <div class="" v-html="realState?.location"></div>
      </div>
    </div>

    <div
      class="p-4 md:p-8 bg-white rounded-lg shadow-lg border border-gray-300 m-3"
    >
      <h2
        class="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-start"
      >
        {{ $t("Street information") }}
      </h2>
      <div class="flex flex-col md:flex-row gap-4 flex-wrap flex-sm-column-centered">
        <div
          v-for="(item, index) in streetInfo"
          :key="index"
          class="flex flex-col items-center border border-gray-300 rounded-lg p-2 w-32 text-center info-data-holder"
        >
          <span class="flex items-center gap-1 text-yellow-700">
            <span v-if="item.icon" :class="item.icon"></span>
            {{ item.value }}
          </span>
          <span class="text-gray-500">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <div
      class="p-4 md:p-8 bg-white rounded-lg shadow-lg border border-gray-300 m-3"
      v-if="realState?.features?.length"
    >
      <h2
        class="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-start"
      >
        {{ $t("additional informations") }}
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-6 pt-4">
        <div
          v-for="(item, index) in realState.features"
          :key="index"
          class="flex flex-col items-center border-l pr-4"
        >
          <!-- <span v-if="item.image">
          <img :src="item.image" alt="" class="small-image">
        </span> -->
          <span class="text-gray-500">{{ item.name }}</span>
          <span class="text-yellow-700">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <!-- <div class="p-4 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 class="text-lg font-semibold text-start text-gray-700 mb-4">المميزات والمرافق</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="(amenity, index) in amenities" :key="index"
          class="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg border border-gray-400">
          <i :class="amenity.icon" class="text-2xl mb-2"></i>
          <span class="text-sm text-gray-700">{{ amenity.label }}</span>
        </div>
      </div>
    </div> -->

    <TransitionRoot appear :show="bookDialogIsOpen" as="template">
      <Dialog as="div" @close="closeBookModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 bg-main text-white p-4 rounded"
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="title">
                      {{ $t("Book a property inspection") }}
                    </div>
                    <button
                      class="dismiss-icon border px-3 py-1 rounded"
                      @click="bookDialogIsOpen = false"
                    >
                      x
                    </button>
                  </div>
                </DialogTitle>
                <div class="mt-2 p-4">
                  <form>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          {{ $t("name") }}</label
                        >
                        <input
                          v-model="bookFormData.name"
                          required
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          {{ $t("mobile number") }}</label
                        >
                        <input
                          v-model="bookFormData.phone"
                          required
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          {{ $t("Inspection date") }}</label
                        >
                        <input
                          v-model="bookFormData.date"
                          required
                          type="date"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-1 gap-4 m-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          {{ $t("notes") }}</label
                        >
                        <textarea
                          v-model="bookFormData.note"
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          rows="6"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="mt-4 p-4 d-flex justify-content-center mb-3">
                  <button
                    @click.stop="bookApiCall"
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
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <TransitionRoot appear :show="reportDialogIsOpen" as="template">
      <Dialog as="div" @close="closeReportModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 bg-main text-white p-4 rounded"
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="title">
                      {{ $t("Report this property") }}
                    </div>
                    <button
                      class="dismiss-icon border px-3 py-1 rounded"
                      @click="reportDialogIsOpen = false"
                    >
                      x
                    </button>
                  </div>
                </DialogTitle>
                <div class="mt-2 p-4">
                  <form>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          {{ $t("name") }}</label
                        >
                        <input
                          v-model="reportFormData.name"
                          required
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          {{ $t("mobile number") }}</label
                        >
                        <input
                          v-model="reportFormData.phone"
                          required
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          {{ $t("report type") }}</label
                        >
                        <select
                          v-model="reportFormData.type"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="" disabled>{{ $t("select") }}</option>
                          <option value="0">
                            {{ $t("The property is not available") }}
                          </option>
                          <option value="1">
                            {{ $t("No response from the broker") }}
                          </option>
                          <option value="2">
                            {{ $t("There are no ownership details") }}
                          </option>
                          <option value="3">
                            {{ $t("The property information is inaccurate") }}
                          </option>
                          <option value="4">
                            {{ $t("Poorly written description") }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-1 gap-4 m-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          {{ $t("notes") }}</label
                        >
                        <textarea
                          v-model="reportFormData.note"
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          rows="6"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="mt-4 p-4 d-flex justify-content-center mb-3">
                  <button
                    @click.stop="reportApiCall"
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
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style scoped lang="scss">
/* Add custom styles here if needed */

/* Custom scrollbar styles */
.Thumbnail-gallery-holder {
  width: 100%;
  overflow-y: auto; /* Enables vertical scrolling */
}

/* Scrollbar track */
.Thumbnail-gallery-holder::-webkit-scrollbar {
  width: 10px; /* Width of the scrollbar */
  border-radius: 10px;
}

.Thumbnail-gallery-holder::-webkit-scrollbar-track {
  background: #f0f0f0; /* Background color of the track */
  border-radius: 10px; /* Rounded corners */
}

/* Scrollbar thumb */
.Thumbnail-gallery-holder::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the scrollbar handle */
  border-radius: 10px; /* Rounded corners */
  border: 2px solid #f0f0f0; /* Adds padding around the handle */
}

/* Scrollbar thumb hover */
.Thumbnail-gallery-holder::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Darker color on hover */
}

/* Firefox-specific scrollbar styling */
.Thumbnail-gallery-holder {
  scrollbar-width: thin; /* Sets scrollbar width to thin */
  scrollbar-color: #888 #f0f0f0; /* Thumb color and track color */
  border-radius: 10px;
}
.actions-holder {
  button {
    background-color: #768c88;
    padding-block: 15px;
    border-radius: 10px;
  }
}
label {
  text-align: start !important;
}
.dismiss-icon {
  border-radius: 10px;
}
.small-image {
  width: 70px;
  height: 70%;
  border-radius: 10px;
}
.info-data-holder {
  min-width: 225px;
  min-height: 89px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.connect-link{
  z-index: 99;
}
</style>
