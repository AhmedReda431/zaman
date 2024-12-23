<template>
    <div class="gallery-holder" v-if="imgs?.length">
      <!-- Gallery Title (Optional) -->
      <h1 v-if="title" class="gallery-title">{{ title }}</h1>
  
      <!-- Image Grid -->
      <div class="gallery-grid grid gap-3 grid-cols-1 lg:grid-cols-4 md:grid-cols-2">
        <div
          v-for="(img, index) in imgs"
          :key="index"
          class="pic"
          @click="showImg(index)"
        >
          <img :src="img.url" :alt="img.caption" />
        </div>
      </div>
  
      <!-- Lightbox -->
      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="imgs.map((img) => img.url)"
        :index="indexRef"
        @hide="onHide"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import VueEasyLightbox from "vue-easy-lightbox";
  
  // Props to accept images and title
  defineProps({
    imgs: {
      type: Array,
      required: true,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
  });
  
  // Lightbox states
  const visibleRef = ref(false);
  const indexRef = ref(0);
  
  // Lightbox controls
  const showImg = (index) => {
    indexRef.value = index;
    visibleRef.value = true;
  };
  
  const onHide = () => {
    visibleRef.value = false;
  };
  </script>
  
  <style scoped>
  .gallery-holder {
    padding: 1em;
  }
  
  .gallery-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1em;
  }
  

  
  .pic img {
    width: 100%;
    height: auto;
    border-radius: 0;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .pic img:hover {
    /*transform: scale(1.05);*/
  }
  </style>
  