<script setup>
const { fetchRealStates, realStates, loading, success, error } =
  useRealStates();

onMounted(async () => {
  loading.value = true;
  await fetchRealStates().finally(() => {
    loading.value = false;
  });
});
</script>

<template>
  <div class="pt-20 mb-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="d-flex justify-content-between align-items-center">
        <h2
          class="text-2xl font-semibold leading-7 mb-6 pb-0 abolute-bottom-border d-inline-block"
        >
          {{ $t("latestOffers") }}
        </h2>
        <nuxt-link to="/real-states" class="all-offers gray d-flex m-0 p-0 cursor-pointer">
          <span>{{ $t("View all offers") }}</span>
          <span class="mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </span>
        </nuxt-link>
      </div>
      <div
        class="mt-8 grid grid-cols-4 gap-x-4"
        v-if="realStates.real_estates && realStates.real_estates.length > 0"
      >
        <NuxtLink
          v-for="item in realStates.real_estates.slice(0, 4)"
          :key="item.id"
          :to="`/real-states/${item.id}`"
        >
          <OfferCard :offer="item" class="my-4" />
        </NuxtLink>
      </div>
      <div v-if="loading" class="mt-8 grid grid-cols-4 gap-4 mb-5">
        <CardSkeleton v-for="i in 4" :key="i" />
      </div>

      <div
        v-if="
          !loading &&
          (!realStates.real_estates || realStates.real_estates.length == 0)
        "
        class="mt-8 w-full text-center mb-5"
      >
        <h2>لا يوجد عناصر</h2>
      </div>
    </div>
  </div>
  <LoadingComp :loading="loading" />
</template>

<style scoped>
@media (max-width: 640px) {
  .text-secondary {
    color: #ff6347;
    /* Example color */
  }
}
</style>
