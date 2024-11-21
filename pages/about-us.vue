<template>
  <div class="page-holder">
    <!-- Section with Image and Text Side by Side -->
    <div class="mb-8 bg-white p-4 shadow-sm m-h-400 px-24">
      <div class="intro-holder">
        <div class="d-flex align-items-start justify-content-between">
          <div class="data w-50">
            <div class="w-full mt-5">
              <h1
                class="font-bold text-secondary mb-4 border-b-2 border-secondary inline-block title mt-2 mb-8"
              >
                {{ $t("about zaman") }}
              </h1>
              <p class="text-gray-700 leading-relaxed description">
                {{ $t("zaman description") }}
              </p>
            </div>
          </div>
          <div class="img-holder w-50">
            <img
              src="https://picsum.photos/800/400"
              alt="House Image"
              class="w-full h-full object-cover w-100"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Icon and Description Section -->
    <div
      class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 m-8 py-24 px-20"
    >
      <div class="text-center vision-div">
        <div class="mb-4">
          <img
            src="~/assets/img/about/vision.svg"
            alt="Vision Icon"
            class="mx-auto w-35 h-35"
          />
        </div>
        <h3
          class="text-m font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block title mt-2 mb-8"
        >
          {{ $t("our vision") }}
        </h3>
        <p class="text-gray-700 leading-relaxed text-center">
          {{ $t("vision desc") }}
        </p>
      </div>

      <div class="text-center mission-div">
        <div class="mb-4">
          <img
            src="~/assets/img/about/mission.svg"
            alt="Vision Icon"
            class="mx-auto w-35 h-35"
          />
        </div>
        <h3
          class="text-m font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block title mt-2 mb-8"
        >
          {{ $t("our mission") }}
        </h3>
        <p class="text-gray-700 leading-relaxed text-center">
          {{ $t("mission desc") }}
        </p>
      </div>

      <div class="text-center values-div">
        <div class="mb-4">
          <img
            src="~/assets/img/about/values.svg"
            alt="Vision Icon"
            class="mx-auto w-35 h-35"
          />
        </div>
        <h3
          class="text-m font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block title mt-2 mb-8"
        >
          {{ $t("our values") }}
        </h3>
        <p class="text-gray-700 leading-relaxed text-center">
          {{ $t("values desc") }}
        </p>
      </div>
    </div>
  </div>

  <div class="goals-holder">
    <div class="container-holder">
      <!-- Slider Section -->
      <div class="container-data">
        <h2
          class="section-title text-m font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block title mt-2 mb-24"
        >
          {{ $t("Desired goals") }}
        </h2>
        <swiper
          :navigation="true"
          :modules="modules"
          class="mySwiper"
          :breakpoints="{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 10 },
          }"
          :pagination="{
            clickable: true,
          }"
        >
          <swiper-slide v-for="(slide, index) in slides" :key="index">
            <div class="text-center swiper-card">
              <div class="text-2xl font-bold mb-2 card-number">
                {{ index + 1 }}
              </div>
              <p class="text-lg">{{ slide.text }}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <!-- Cards Section -->
  <div class="care-section">
    <div class="care-section-holder">
      <div class="text-center mb-8">
        <h2
          class="text-m font-semibold text-secondary mb-4 border-b-2 border-secondary inline-block title"
        >
         {{ $t('Caring for our customers through') }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Card 1 -->
        <div class="flex items-center text-right p-4">
          <div class="w-1/4">
            <img
              src="~/assets/img/about/care/1.svg"
              alt="Innovation Icon"
              class="mx-auto w-20 h-20 rounded-full"
            />
          </div>
          <div class="w-3/4 pl-4 text-start">
            <h3
              class="text-lg font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block"
            >
              {{ $t("Innovation") }}
            </h3>
            <p class="text-gray-700 leading-relaxed">
              {{ $t("innovation desc") }}
            </p>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="flex items-center text-right p-4">
          <div class="w-1/4">
            <img
              src="~/assets/img/about/care/2.svg"
              alt="Commitment Icon"
              class="mx-auto w-20 h-20 rounded-full"
            />
          </div>
          <div class="w-3/4 pl-4 text-start">
            <h3
              class="text-lg font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block"
            >
              {{ $t("Commitment") }}
            </h3>
            <p class="text-gray-700 leading-relaxed">
              {{ $t("commitment desc") }}
            </p>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="flex items-center text-right p-4">
          <div class="w-1/4">
            <img
              src="~/assets/img/about/care/3.svg"
              alt="Reputation Icon"
              class="mx-auto w-20 h-20 rounded-full"
            />
          </div>
          <div class="w-3/4 pl-4 text-start">
            <h3
              class="text-lg font-semibold text-secondary mb-2 border-b-2 border-secondary inline-block"
            >
             {{ $t('Building reputation') }}
            </h3>
            <p class="text-gray-700 leading-relaxed">
             
              {{$t('Building reputation desc')}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted } from "vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import required modules
import { Navigation, Pagination } from "swiper/modules";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      slides: [
        { number: "1", text: "فقرة 1: تفاصيل حول الهدف الأول." },
        { number: "2", text: "فقرة 2: تفاصيل حول الهدف الثاني." },
        { number: "3", text: "فقرة 3: تفاصيل حول الهدف الثالث." },
        { number: "4", text: "فقرة 4: تفاصيل حول الهدف الرابع." },
        { number: "5", text: "فقرة 5: تفاصيل حول الهدف الخامس." },
      ],
      breakpoints: {
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
        },
      },
    };
  },
  name: "ResponsiveSection",
  setup() {
    const modules = [Navigation, Pagination];
    return { modules: modules };
  },
};
</script>

<style scoped lang="scss">
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #76857557;
  border: 2px solid #ffffff9c;
}
.swiper-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
  .card-number {
    background: #fff;
    color: #bd9a60;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }
}

.swiper-pagination-bullet-active {
  background-color: #49685e;
}

.swiper-button-next,
.swiper-button-prev {
  color: rgb(87, 133, 129);
}

.container {
  max-width: 1200px;
}
.m-h-400 {
  min-height: 400px;
}
.img-holder {
  img {
    height: 100%;
    width: 100%;
    padding: 20px;
    border-radius: 42px !important;
  }
}
.description {
  padding-inline-end: 30px;
}
.title {
  font-size: 28px;
  text-transform: capitalize;
}
@media (max-width: 992px) {
  .intro-holder {
    .d-flex {
      flex-direction: column;
      div {
        width: 100% !important;
      }
    }
  }
}
.mission-div {
  border-inline: 1px solid #eee;
  padding: 0 15px;
}
.goals-holder {
  background: url("~/assets/img/contact_back.jpg");
  color: #fff;
  text-align: center;
  .container-holder {
    padding: 5% 0 5% 0;
    background-color: rgb(38 70 66 / 78%);
    .container-data {
      padding-inline: 5%;
    }
  }
}
.care-section {
  margin: 5% 2%;
}
</style>
