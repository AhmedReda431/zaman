<script setup>
import { useI18n } from 'vue-i18n'
import {
  Swiper as SwiperCore,
  SwiperSlide,
  SwiperAutoplay,
  SwiperEffectCreative,
  SwiperEffectFade,
  SwiperPagination,
  SwiperNavigation,
} from 'swiper/vue'

const { locale } = useI18n()

defineProps({
  slides: {
    type: [Object, Array],
    required: true,
  },
  slidesPerView: {
    type: [Number, String],
    default: 1,
  },
  effect: {
    type: String,
    default: 'fade',
  },
  swiperClass: {
    type: String,
    default: 'rounded aspect-video',
  },
  swiperNavigation: {
    type: Boolean,
    default: false,
  },
})

// Swiper modules and configuration
const swiperModules = [
  SwiperAutoplay,
  SwiperEffectCreative,
  SwiperEffectFade,
  SwiperPagination,
  SwiperNavigation,
]

const autoplayConfig = { delay: 6000 }
const creativeEffectConfig = {
  prev: { shadow: false, translate: ['-20%', 0, -1] },
  next: { translate: ['100%', 0, 0] },
}
</script>

<template>
  <Swiper
    :class="swiperClass"
    dir="ltr"
    :modules="swiperModules"
    :navigation="swiperNavigation"
    pagination
    :slides-per-view="slidesPerView"
    :loop="true"
    :effect="effect"
    :creative-effect="creativeEffectConfig"
    :autoplay="autoplayConfig"
  >
    <SwiperSlide v-for="slide in slides" :key="slide.id || slide.image">
      <slot name="slide" :slide="slide">
        <img :src="slide.image" :alt="slide.name" class="h-full w-full" />
        <strong
          class="absolute text-white bottom-8 left-3 rounded-[0.5rem] px-4 py-2 bg-zaman-dark"
        >
          {{ locale === 'ar' ? slide.name_ar : slide.name }}
        </strong>
      </slot>
    </SwiperSlide>
  </Swiper>
</template>
