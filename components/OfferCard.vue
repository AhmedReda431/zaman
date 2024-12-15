<script setup>
const props = defineProps({
  offer: {
    type: Object,
    required: true,
    // default: {
    //     title: 'استراحه الوسام',
    //     location: 'الرياض',
    //     imageUrl: 'https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=1024x1024&w=is&k=20&c=4TmxYMrPLVb8u09dT5amw1vBsAVbHCxMWZIXqoy-I34=',
    //     capacity: 35,
    //     old_price: 1000,
    //     price: 100000,
    // },
  },
  isGrid: {
    type: Boolean,
  },
});
</script>

<template>
  <div
    class="rounded-lg overflow-hidden border relative bg-white shadow-lg max-w-[320px]"
    :key="offer.title"
    :class="{ 'd-flex': isGrid }"
  >
    <nuxt-link :to="`/real-states/${offer.id}`">
      <img
        class="w-full object-cover h-48 md:h-64 card-img"
        :src="offer.images[0]"
        :class="{ grid: isGrid }"
        alt=""
      />
      <span
        class="absolute top-5 right-5 bg-secondary rounded text-sm text-white font-semibold px-4 py-1"
        :class="{ 'new-absolute-setting': isGrid }"
      >
        {{ $t("sell") }}
      </span>
      <span
        class="absolute top-5 left-5 w-8 h-8 bg-opacity-75 flex items-center justify-center rounded-full bg-secondary text-white"
      >
        <Icon size="20" name="ph:heart-bold" />
      </span>
    </nuxt-link>
    <div class="p-4 w-full">
      <div class="flex justify-between items-center">
        <nuxt-link :to="`/real-states/${offer.id}`">
          <h3
            class="text-lg font-semibold leading-8 tracking-tight text-gray-900 text-start"
            v-if="offer?.name"
          >
            {{ offer.name }}
          </h3>
        </nuxt-link>
        <div class="flex gap-2 items-start">
          <a
            :href="`whatsapp://send?abid=00966920014847&text=Hello`"
            class="text-gray-600 hover:text-green-600 flex items-center bg-white rounded connect-link"
          >
            <!-- <PhoneIcon size="24" /> -->
            <span class="mx-2 text-sm">
              <Icon size="24" name="logos:whatsapp-icon" />
            </span>
            <!-- {{ realState.whatsup }} -->
          </a>
          <a
            :href="`tel:00966920014847`"
            class="text-gray-600 hover:text-green-600 flex items-center bg-white rounded connect-link"
          >
            <!-- <PhoneIcon size="24" /> -->
            <span class="mx-2 text-sm d-flex gap-3 align-items-center">
              <Icon size="24" name="f7:phone-circle" />
            </span>
            <!-- {{ realState.phone }} -->
          </a>
        </div>
      </div>
      <p class="text-base leading-7 text-gray-500 flex items-center gap-2 mt-2">
        <svg
          style="width: 20px"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 19.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4Q9.475 4 7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35m0 1.975q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762q-.838-1.338-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575Q17.45 16.475 16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10q0-.825-.587-1.412T12 8q-.825 0-1.412.588T10 10q0 .825.588 1.413T12 12"
          />
        </svg>
        {{ offer.city.name }}
      </p>
      <nuxt-link :to="`/real-states/${offer.id}`">
        <div class="flex gap-4 mt-2 text-gray-500">
          <p v-if="offer?.number_of_rooms">
            <Icon size="20" name="material-symbols:bed-outline" />
            <span class="text-secondary">{{ offer.number_of_rooms }}</span>
            {{ $t("Rooms") }}
          </p>
          <p v-if="offer?.bathrooms_of_rooms">
            <Icon size="20" name="iconoir:bathroom" />
            <span class="text-secondary">{{ offer.bathrooms_of_rooms }}</span>
            {{ $t("Bathroom") }}
          </p>
        </div>
        <div
          class="mt-4 font-bold text-md text-secondary text-start"
          v-if="offer?.price"
        >
          <p>{{ offer.price }} {{ $t("common.SAR") }}</p>
        </div>
      </nuxt-link>
      <!-- <button type="button"
                class="w-full mt-4 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-80 focus:outline-none">
                {{ $t('common.bookNow') }}
            </button> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card-img {
  height: 300px !important;
  width: 100% !important;
}
.card-img.grid {
  height: 100% !important;
  width: 97px !important;
}

.new-absolute-setting {
  bottom: 10px;
  right: 10px;
  top: auto !important;
}
.connect-link {
  z-index: 99;
}
</style>
