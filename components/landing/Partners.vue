<template>
  <div class="partners-holder w-full h-full my-24">
    <div class="container-holder">
      <section class="container mx-auto mx-8 px-4">
        <div class="d-flex justify-content-between align-items-center">
          <h2
            class="text-2xl font-semibold leading-7 mb-6 abolute-bottom-border"
          >
            {{ $t("Certificates") }}
          </h2>
          <!-- <nuxt-link to="/real-states" class="all-offers gray">
            <h1 class="title">
              <span>{{ $t("View all Certificates") }}</span>
              <span
                ><Icon name="material-symbols:arrow-outward" color="black"
              /></span>
            </h1>
          </nuxt-link> -->
        </div>
        <div
          class="certificates-holder mt-24 text-center"
        >
          <!-- Swiper Component -->
          <div>
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
              <swiper-slide v-for="(x, index) in 20" :key="index">
                <IconsLogo class="h-14 w-auto" alt="zaman" />
              </swiper-slide>
            </swiper>
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
</style>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation , Autoplay } from "swiper/modules";

// Modules and Swiper instance
const modules = [Navigation , Autoplay];
const swiperInstance = ref(null);

// Fetching real estate data
const { fetchRealStates, realStates, loading, success, error } =
  useRealStates();

// Lifecycle: Mounted
onMounted(async () => {
  loading.value = true;

  await fetchRealStates().finally(() => {
    loading.value = false;

    // Check if the Swiper instance exists before updating
    if (swiperInstance.value) {
      swiperInstance.value.update();
    }
  });
});
</script>
