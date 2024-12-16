<template>
  <div class="wrap" v-if="articles?.length">
    <nuxt-link
      :to="`/news/${article.id}`"
      v-for="(article, index) in articles"
      :key="index"
      class="article"
      v-bind:style="{ 'background-image': 'url(' + article.image + ')' }"
    >
      <div class="overlay"></div>
      <div class="wrap-cat">
        <span class="cat" :data-hover="article.date">{{ article.date }}</span>
      </div>
      <h1>
        <span>{{ article.title }}</span>
      </h1>
    </nuxt-link>
  </div>
  <div
    class="text-center m-h-400 d-flex align-items-center justify-content-center"
    v-else
  >
    {{ $t("no data available") }}
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { $api } = useNuxtApp();
// Define the articles array
const articles = ref([]);
const getBlog = () => {
  $api
    .get("/blogs")
    .then((res) => {
      articles.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  getBlog();
});
</script>

<style scoped>
.wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 10px;
  padding: 0.5em;
  perspective: 500px;
}

.article {
  display: flex;
  flex-direction: column;
  height: 550px;
  position: relative;
  background-size: cover;
  border-radius: 7px;
  overflow: hidden;
  padding: 1em;
  cursor: pointer;
  transform: rotateX(0deg) rotateY(0deg);
  transition: all 0.2s linear;
  will-change: transform;
}

.overlay {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    circle at 50% 50%,
    rgba(0, 0, 0, 0.3) 20%,
    rgba(0, 0, 0, 0.4) 50%
  );
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.article h1 {
  font-size: 1.5em;
  margin-top: auto;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  z-index: 2;
  pointer-events: none;
}

.article h1 {
  transform: translateY(-20px);
}

.article h1 span {
  color: #fff;
}

.article span.cat {
  letter-spacing: 2px;
  font-weight: bold;
  position: relative;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
  color: #fff;
}

@media screen and (min-width: 1000px) {
  .wrap {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-gap: 20px;
    padding: 1em;
  }

  .article h1 {
    transform: translateY(0px);
  }

  .article:hover h1 {
    transform: translateY(-20px);
  }

  .article span.cat {
    color: transparent;
  }

  .article span.cat::before,
  .article span.cat::after {
    content: attr(data-hover);
    position: absolute;
    display: inline-block;
    left: 0;
    top: 0;
    white-space: nowrap;
    overflow: hidden;
    max-width: 0%;
    transition: max-width 300ms ease-out;
  }

  .article span.cat::before {
    color: yellow;
    transition-delay: 100ms;
  }

  .article span.cat::after {
    color: white;
  }

  .article:hover span.cat:after,
  .article:hover span.cat:before {
    max-width: 100%;
  }

  .article:hover span.cat:after {
    transition-delay: 300ms;
  }
}
.m-h-400 {
  min-height: 400px !important;
}
</style>
