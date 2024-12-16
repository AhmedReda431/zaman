<template>
  <div class="page-holder" v-if="pageData">
    <div class="mb-8 m-h-400 px-24 my-10">
      <div class="news-title">
        <h1 class="page-title">{{ pageData.title }}</h1>
        <h5 class="page-date mb-2 mt-4">{{ pageData.date }}</h5>

        <!-- Page Image Section -->
        <div class="page-image" v-if="pageData?.background">
          <img :src="pageData.background" alt="" class="page-background" />
        </div>

        <!-- Video Section -->
        <div class="videos mt-3">
          <video controls class="full-width-video">
            <source
              src="http://media.w3.org/2010/05/bunny/trailer.mp4"
              type="video/webm"
            />
            <source
              src="http://media.w3.org/2010/05/bunny/trailer.mp4"
              type="video/mp4"
            />
            Download the
            <a href="http://media.w3.org/2010/05/bunny/trailer.mp4">WEBM</a>
            or
            <a href="http://media.w3.org/2010/05/bunny/trailer.mp4">MP4</a>
            video.
          </video>
        </div>

        <!-- Description Section -->
        <h5 class="page-description mt-5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam,
          quasi quaerat ut rem ducimus dolores iure quis dolorem voluptatum
          asperiores blanditiis maxime et labore doloribus, aliquid beatae qui
          corrupti repudiandae?
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        {
          id: 1,
          date: "ديسمبر 8, 2024",
          title: "blog 1",
          background:
            "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 2,
          date: "ديسمبر 8, 2024",
          title: "blog 2",
          background:
            "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 3,
          date: "ديسمبر 8, 2024",
          title: "blog 3",
          background:
            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 4,
          date: "ديسمبر 8, 2024",
          title: "blog 4",
          background:
            "https://images.unsplash.com/photo-1614121181207-4b6c334d353d?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 5,
          date: "ديسمبر 8, 2024",
          title: "blog 5",
          background:
            "https://images.unsplash.com/photo-1656077217715-bdaeb06bd01f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          id: 6,
          date: "ديسمبر 8, 2024",
          title: "blog 6",
          background:
            "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      pageData: null,
      id: this.$route.params.id,
    };
  },
  mounted() {
    this.pageData = this.articles.find((el) => el.id == this.id);
  },
};
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
</style>
