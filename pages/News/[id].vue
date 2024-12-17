<template>
  <div class="page-holder" v-if="pageData">
    <div class="mb-8 m-h-400 px-24 my-10">
      <div class="news-title">
        <h1 class="page-title">{{ pageData.title }}</h1>
        <h5 class="page-date mb-2 mt-4">{{ pageData.date }}</h5>

        <!-- Page Image Section -->
        <div class="page-image" v-if="pageData?.image">
          <img :src="pageData.image" alt="" class="page-background" />
        </div>

        <!-- Video Section -->
        <div class="videos-holder mt-8" v-if="pageData?.videos?.length">
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4 m-4"
            v-for="(video, index) in pageData.videos"
            :key="index"
          >
            <video controls class="full-width-video" v-if="video">
              <source :src="video" type="video/webm" />
              <source :src="video" type="video/mp4" />
              Download the
              <a :href="video">WEBM</a>
              or
              <a :href="video">MP4</a>
              video.
            </video>
          </div>
        </div>

        <!-- Description Section -->
        <h5 class="page-description mt-8">
          {{ pageData.description }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { $api } = useNuxtApp();
// Define the articles array
const route = useRoute();
const pageData = ref({});
const getBlog = () => {
  $api
    .get(`/blogs/${route.params.id}`)
    .then((res) => {
      pageData.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  getBlog();
});
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 2.5rem;
  font-weight: bold;
}

.page-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
}

.page-background {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: none;
  outline: none;
  box-shadow: none;
}

.videos {
  margin-top: 20px;
  text-align: center;
  border: none;
  outline: none;
  box-shadow: none;
}

.full-width-video {
  width: 100%;
  height: auto;
  border-radius: 8px;
  max-width: 100%;
  object-fit: cover;
  border: none;
  outline: none;
  box-shadow: none;
}

.full-width-video:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
  border: none;
  outline: none;
  box-shadow: none;
}
@media (max-width: 767px) {
  .mb-8.m-h-400.px-24.my-10 {
    padding: 20px 15px !important;
  }
  .page-background , .full-width-video{
    min-height: 250px;
  }
  .grid.grid-cols-1{
    padding: 0;
    margin: 0;
  }
}
</style>
