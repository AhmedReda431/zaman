<template>
  <div class="page-holder" v-if="pageData">
    <div class="mb-0 m-h-400 ">
      <div class="news-title my-12">
        <h1 class="page-title px-24">{{ pageData.title }}</h1>

        <!-- Page Image Section -->
        <div class="page-image mt-12" v-if="pageData?.image">
          <img :src="pageData.image" alt="" class="page-background" />
        </div>
        <!-- Description Section -->
        <h5 class="page-description mt-8 px-24">
          {{ pageData.description }}
        </h5>
        <div class="bruchour my-24 px-24">
          <button class="bg-main text-white p-4 rounded">
            {{ $t("download bruchor") }}
          </button>
        </div>
      </div>
      <div class="gallery-holder" v-if="images?.length">
        <Gallery :imgs="images" :title="$t('images gallery')" />
      </div>
      <div class="projects-form px-24">
        <ProjectsForm />
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
const images = [
  {
    url: "https://via.placeholder.com/450.png/",
    caption: "Living Room Design",
  },
  {
    url: "https://via.placeholder.com/300.png/",
    caption: "Modern Interior",
  },
  {
    url: "https://via.placeholder.com/450.png/",
    caption: "Luxury Apartment",
  },
  {
    url: "https://via.placeholder.com/300.png/",
    caption: "Elegant Bedroom",
  },
  {
    url: "https://via.placeholder.com/450.png/",
    caption: "Living Room Design",
  },
  {
    url: "https://via.placeholder.com/300.png/",
    caption: "Modern Interior",
  },
  {
    url: "https://via.placeholder.com/450.png/",
    caption: "Luxury Apartment",
  },
  {
    url: "https://via.placeholder.com/300.png/",
    caption: "Elegant Bedroom",
  },
];
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
  //transform: scale(1.02);
  transition: transform 0.3s ease;
  border: none;
  outline: none;
  box-shadow: none;
}
@media (max-width: 767px) {
  .mb-8.m-h-400.px-24.my-10 {
    padding: 20px 15px !important;
  }
  .page-background,
  .full-width-video {
    min-height: 250px;
  }
  .grid.grid-cols-1 {
    padding: 0;
    margin: 0;
  }
}
.projects-form {
  background: #ebebeb;
}
</style>
