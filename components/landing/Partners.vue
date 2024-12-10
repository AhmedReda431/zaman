<template>
  <div class="partners-holder w-full h-full my-24">
    <div class="container-holder">
      <section class="container mx-auto mx-8 px-4">
        <div class="d-flex justify-content-between align-items-center">
          <h2
            class="text-2xl font-semibold leading-7 mb-6 abolute-bottom-border"
          >
            {{ $t("partners") }}
          </h2>
          <!-- <nuxt-link to="/real-states" class="all-offers gray">
            <h1 class="title">
              <span>{{ $t("View all partners") }}</span>
              <span
                ><Icon name="material-symbols:arrow-outward" color="black"
              /></span>
            </h1>
          </nuxt-link> -->
        </div>
        <div class="partners-holder mt-24 text-center" v-if="partners?.length">
          <!-- Swiper Component -->
          <div>
            <ClientOnly>
              <swiper
                :navigation="false"
                :autoplay="true"
                :modules="modules"
                class="mySwiper text-center d-flex justify-content-center align-items-center"
                :breakpoints="{
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  640: { slidesPerView: 2, spaceBetween: 10 },
                  768: { slidesPerView: 3, spaceBetween: 10 },
                  1024: { slidesPerView: 4, spaceBetween: 10 },
                }"
              >
                <swiper-slide
                  v-for="(partner, index) in partners"
                  :key="index"
                >
                  <img
                    :src="partner.image"
                    class="h-14 w-auto"
                    alt="partner-img"
                    v-if="partner?.image"
                  />
                  <h2 class="partner-title mt-3">
                    {{ partner.title }}
                  </h2>
                </swiper-slide>
              </swiper>
            </ClientOnly>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.download-our-app-holder {
  background: url("~/assets/img/contact_back.jpg") no-repeat center center;
  background-size: cover;
  margin-top: 8%;
  .container-holder {
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: #26464273;
    .mobile-ing-holder {
      margin-top: -5%;
      @media (max-width: 767px) {
        margin-top: 0;
      }
    }
    .title {
      color: #fff;
      font-size: 40px;
    }
  }
}
.swiper-slide img {
  width: 250px !important;
  height: 250px !important;
  border-radius: 50%;
}
.swiper-slide{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
<script setup>
import logo from "@/assets/img/Logo-zamn.png";
const { $api } = useNuxtApp();
let partners = ref(null);
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation, Autoplay } from "swiper/modules";

// Modules and Swiper instance
const modules = [Navigation, Autoplay];
const swiperInstance = ref(null);

// Fetching real estate data
const { fetchRealStates, realStates, loading, success, error } =
  useRealStates();

// Lifecycle: Mounted
onMounted(async () => {
  loading.value = true;
  getPartnersData();
  await fetchRealStates().finally(() => {
    loading.value = false;

    // Check if the Swiper instance exists before updating
    if (swiperInstance.value) {
      swiperInstance.value.update();
    }
  });
});

function getPartnersData() {
  $api
    .get("/partners")
    .then((res) => {
      partners.value = res?.data?.data;
    })
    .catch((err) => {
      if (err?.response?.data?.message) {
        showAlert(err.response.data.message, "danger");
      }
    });
}
function setAltImage(event) {
  event.target.src = logo; // Use the imported logo
}
</script>
