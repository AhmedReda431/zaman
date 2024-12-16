<template>
  <div class="wrap">
    <nuxt-link
      :to="`/news/${article.id}`"
      v-for="(article, index) in articles"
      :key="index"
      class="article"
      @mousemove="handleMouseMove($event, index)"
      @mouseleave="handleMouseLeave(index)"
      :style="articleStyles(index)"
    >
      <div class="overlay"></div>
      <div class="wrap-cat">
        <span class="cat" :data-hover="article.date">{{ article.date }}</span>
      </div>
      <h1>
        <span>{{ article.title }}</span>
      </h1> </nuxt-link
    >>
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
    };
  },
  methods: {
    handleMouseMove(event, index) {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;
      const article = this.$refs[`article-${index}`][0];

      article.style.transform = `rotateY(${
        (((mouseX * 100) / article.offsetWidth - 50) / 100) * 2
      }deg) rotateX(${
        (((mouseY * 100) / article.offsetHeight - 50) / 100) * 2
      }deg)`;

      const overlay = article.querySelector(".overlay");
      overlay.style.backgroundImage = `radial-gradient(circle at ${
        (mouseX * 100) / -article.offsetWidth + 100
      }% ${
        (mouseY * 100) / -article.offsetHeight + 100
      }%, rgba(0,0,0,0.2) 25%, rgba(0,0,0,0.33) 50%)`;
    },
    handleMouseLeave(index) {
      const article = this.$refs[`article-${index}`][0];
      article.style.transform = "rotateX(0deg) rotateY(0deg)";

      const overlay = article.querySelector(".overlay");
      overlay.style.backgroundImage = `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.3) 50%)`;
    },
    articleStyles(index) {
      return {
        backgroundImage: `url(${this.articles[index].background})`,
      };
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Oswald");
@import url("https://fonts.googleapis.com/css?family=Lato");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-image: url("https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/starfield-banner.jpg");
}

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
</style>
