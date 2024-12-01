<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required modules
import { Navigation } from "swiper/modules";

// Modules and Swiper instance
const modules = [Navigation];
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

<template>
  <div class="pt-20 mb-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="d-flex justify-content-between align-items-center align-items-sm-baseline">
        <h2 class="text-2xl font-semibold leading-7 mb-6 abolute-bottom-border">
          {{ $t("latestOffers") }}
        </h2>
        <nuxt-link to="/real-states" class="all-offers gray">
          <h1 class="title">
            <span>{{ $t("View all offers") }}</span>
            <span
              ><Icon name="material-symbols:arrow-outward" color="black"
            /></span>
          </h1>
        </nuxt-link>
      </div>

      <!-- Swiper Component -->
      <div v-if="!loading && realStates?.real_estates?.length">
        <ClientOnly>
          <swiper
            :navigation="true"
            :modules="modules"
            class="mySwiper"
            :breakpoints="{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 4, spaceBetween: 10 },
            }"
          >
            <swiper-slide
              v-for="item in realStates.real_estates"
              :key="item.id"
            >
              <NuxtLink :to="`/real-states/${item.id}`">
                <OfferCard :offer="item" class="my-4" />
              </NuxtLink>
            </swiper-slide>
          </swiper>
        </ClientOnly>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="mt-8">
        <CardSkeleton v-for="i in 4" :key="i" />
      </div>

      <!-- No Data Message -->
      <div
        v-if="!loading && !realStates?.real_estates?.length"
        class="mt-8 w-full text-center"
      >
        <h2>لا يوجد عناصر</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .text-secondary {
    color: #ff6347;
    /* Example color */
  }
}
.title {
  font-size: 20px;
}
</style>
