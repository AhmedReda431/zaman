<template>
  <div
    v-if="totalPages > 1"
    class="flex justify-center items-center space-x-2 my-8"
  >
    <!-- Previous Button -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
    >
      {{ $t('Previous') }}
    </button>

    <!-- Page Numbers -->
    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="[
        'px-4 py-2 rounded-md',
        currentPage === page
          ? 'bg-main text-white'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      ]"
    >
      {{ page }}
    </button>

    <!-- Next Button -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
    >
      {{ $t('Next') }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currentPage() {
      return this.meta?.current_page || 1; // Default to page 1 if undefined
    },
    totalPages() {
      if (this.meta?.last_page) {
        return this.meta.last_page; // Use `last_page` if provided
      }
      const total = this.meta?.total || 0;
      const perPage = this.meta?.per_page || 1;
      return Math.ceil(total / perPage);
    },
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit("pageChange", page);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
