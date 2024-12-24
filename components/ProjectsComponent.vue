<template>
  <div class="hold-all-data bg-white p-4 m-h-400 px-10">
    <div class="d-flex justify-content-between my-8 flex-sm-column">
      <h1 class="title" v-if="projectsTitle">
        {{ projectsTitle }}
      </h1>
      <p class="description" v-if="projectsDescription" v-html="projectsDescription"></p>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 px-0 mx-0"
      v-if="projects?.length"
    >
      <nuxt-link
        :to="`/projects/${project.id}`"
        v-for="(project, index) in projects"
        :key="index"
        class="project"
        v-bind:style="{ 'background-image': 'url(' + project.main_image + ')' }"
      >
        <div class="overlay"></div>

        <h1>
          <span>{{ project.title }}</span>
        </h1>
      </nuxt-link>
    </div>
    <div
      class="text-center m-h-400 d-flex align-items-center justify-content-center"
      v-else
    >
      {{ $t("no data available") }}
    </div>
    <!-- Pagination Component -->
    <Pagination
      v-if="projectsMeta"
      :meta="projectsMeta"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { $api } = useNuxtApp();
// Define the projects array
const projectsTitle = ref(null);
const projectsDescription = ref(null);
const projectsMeta = ref(null);
const projects = ref([]);
const getProjects = () => {
  $api
    .get("/projects")
    .then((res) => {
      projectsTitle.value = res.data.data.tile;
      projectsDescription.value = res.data.data.description;
      projects.value = res.data.data.projects;
      projectsMeta.value = res.data.data.meta;
    })
    .catch((err) => {
      console.log(err);
    });
};
// settign pagination

// Existing imports and setup remain unchanged

const handlePageChange = async (page) => {
  // Check if the query object has at least one key-value pair
  const hasFilters = Object.keys(query).length > 0;

  // Construct the updated query, only including 'page' if filters exist
  const updatedQuery = hasFilters ? { ...query, page } : { page };

  // Update the route with the new page query
  router.push({
    path: route.path,
    query: updatedQuery,
  });

  // Wait for the route to fully update and fetch data
  await getProjects(updatedQuery);

  // Ensure the scroll happens after the data and DOM update
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, 100);
};
onMounted(() => {
  getProjects();
});
</script>

<style scoped>
.project {
  display: flex;
  flex-direction: column;
  height: 500px;
  position: relative;
  background-size: cover;
  border-radius: 0px;
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

.project h1 {
  font-size: 1.5em;
  margin-top: auto;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  z-index: 2;
  pointer-events: none;
}

.project h1 {
  transform: translateY(-20px);
}

.project h1 span {
  color: #fff;
}

.project span.cat {
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

  .project h1 {
    transform: translateY(0px);
  }

  .project:hover h1 {
    transform: translateY(-20px);
  }

  .project span.cat {
    color: transparent;
  }

  .project span.cat::before,
  .project span.cat::after {
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

  .project span.cat::before {
    color: yellow;
    transition-delay: 100ms;
  }

  .project span.cat::after {
    color: white;
  }

  .project:hover span.cat:after,
  .project:hover span.cat:before {
    max-width: 100%;
  }

  .project:hover span.cat:after {
    transition-delay: 300ms;
  }
}
.m-h-400 {
  min-height: 400px !important;
}

@media (max-width: 767px) {
  .bg-white.p-4.m-h-400.px-24 {
    padding: 20px 10px !important;
  }
  .description{
    width: 100% !important;
  }
  .title {
    font-size: 25px;
  }
}
.title {
  font-size: 2.5em;
  margin-bottom: 40px;
}
.description{
  width: 60%;
  font-size: 20px;
}
</style>
