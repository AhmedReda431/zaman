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
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";

let propertyInfo = ref([]);
let streetInfo = ref([]);
let info = ref([]);

onMounted(async () => {
  // Ensure this runs only on the client-side
  currentPageUrl = window.location.href;
  currentPageTitle = document.title;

  let id = useRoute().params.id;
  await fetchRealState(id);
});
let currentImageIndex = ref(0);
let date = "23-8-2024";
let time = "7:00";
let propertyCode = "C10304";
let propertyType = "فيلا للبيع في جدة";
let neighborhood = "حي النزهة";
let currentIndex = ref(0);
let images = [
  "/api/placeholder/800/600",
  "/api/placeholder/800/600",
  "/api/placeholder/800/600",
];
let currentTab = ref("images");
let tabs = ref([
  { label: "تفاصيل", value: "details" },
  { label: "صور", value: "images" },
]);
let price = "1000000";
let agentName = "احمد حسن";
let licenseNumber = "7100017784";
let contactIcons = [Share2Icon, HeartIcon, MailIcon];
let actions = ["طلب تمويل عقاري", "حجز معاينة العقار", "الابلاغ عن هذا العقار"];
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
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
      <div class="md:col-span-2">
        <div class="location bg-white p-2 shadow-sm rounded mb-5">
          <div
            class="flex items-center justify-content-between liang-items-center"
          >
            <span class="font-semibold">{{ realState?.name }}</span>
            <span class="font-semibold d-flex gap-2 align-items-center">
              <span><MapPinIcon size="24" /></span>
              <span>{{ realState?.city?.name }}</span>
            </span>
          </div>
        </div>
        <!-- Main image -->
        <div class="relative overflow-hidden rounded-lg mb-2 h-96">
          <img
            v-if="
              currentTab == 'images' &&
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
            class="flex items-center justify-content-between liang-items-center"
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
            :href="`tel:${realState?.phone}`"
            v-if="realState?.phone"
            class="text-gray-600 hover:text-green-600 flex items-center bg-white p-2 rounded"
          >
            <!-- <PhoneIcon size="24" /> -->
            <span class="mx-2 text-sm d-flex gap-3 align-items-center">
              <img src="~/assets/Icons/mobile.svg" alt="whatsapp" />
              {{ $t("mobile number") }}
            </span>
            <!-- {{ realState.phone }} -->
          </a>

          <a
            :href="`whatsapp://send?abid=${realState?.whatsup}&text=Hello`"
            v-if="realState?.whatsup"
            class="text-gray-600 hover:text-green-600 flex items-center bg-white p-2 rounded"
          >
            <!-- <PhoneIcon size="24" /> -->
            <span class="mx-2 text-sm">
              <!-- {{ $t("whatsapp number") }} -->
              <img src="~/assets/Icons/whatsapp.svg" alt="whatsapp" />
            </span>
            <!-- {{ realState.whatsup }} -->
          </a>
          <a
            :href="`mianto:${realState.email}`"
            v-if="realState?.email"
            class="text-gray-600 hover:text-green-600 flex items-center bg-white p-2 rounded"
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
                  <img src="~/assets/Icons/license.svg" alt="email" /> </span
                >
                <span>{{ $t("generalRealEstateLicense") }}</span>
              </p>
              <p class="font-semibold">{{ realState.license_number }}</p>
            </div>
          </div>
        </div>

        <!-- Agent info -->
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
      <div class="d-flex gap-4 align-items-center flex-wrap">
        <div
          v-for="(item, index) in propertyInfo"
          :key="index"
          class="flex flex-col items-center border border-gray-300 rounded-lg p-3 w-36 text-center"
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
    >
      <h2
        class="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-start"
      >
        {{ $t("location") }}
      </h2>
      <div class="d-flex gap-4 align-items-center flex-wrap">
        <div
          v-for="(item, index) in propertyInfo"
          :key="index"
          class="flex flex-col items-center border border-gray-300 rounded-lg p-3 w-36 text-center"
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
    >
      <h2
        class="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-start"
      >
        {{ $t("Street information") }}
      </h2>
      <div class="flex flex-col md:flex-row gap-4 flex-wrap">
        <div
          v-for="(item, index) in streetInfo"
          :key="index"
          class="flex flex-col items-center border border-gray-300 rounded-lg p-2 w-32 text-center"
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
    >
      <h2
        class="text-lg md:text-xl font-semibold text-gray-700 mb-4 text-start"
      >
        {{ $t("additional informations") }}
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-6 pt-4">
        <div
          v-for="(item, index) in info"
          :key="index"
          class="flex flex-col items-center border-l pr-4"
        >
          <span class="text-gray-500">{{ item.label }}</span>
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
  </div>
</template>

<style scoped>
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
</style>
