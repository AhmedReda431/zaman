<template>
    <div class="component-holder">
      <div
        class="mb-8 bg-white shadow-sm m-h-400 px-24 m-5 py-16"
        v-if="requests?.real_estate_requests.length && !loading"
      >
        <div class="container mx-auto px-4 sm:px-8">
          <h1 class="title font-bold">
              {{ $t("Inspection requests") }}
            </h1>
          <div class="py-8">
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div
                class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
              >
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        {{ $t("date") }}
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        {{ $t("Reference number") }}
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        {{ $t("The property") }}
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        {{ $t("Advertiser") }}
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        {{ $t("Displayed price") }}
                      </th>
                      <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        {{ $t("Actions") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(request, index) in requests.real_estate_requests"
                      :key="index"
                    >
                      <td
                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        {{ request.created_at }}
                      </td>
                      <td
                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        <span v-if="request?.license_number">
                          {{ request?.license_number }}
                        </span>
                      </td>
                      <td
                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        <span v-if="request?.category?.title">
                          {{ request.category.title }}
                        </span>
                      </td>
                      <td
                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        {{ request.marketer_name }}
                      </td>
                      <td
                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        <span v-if="request?.price_from && request?.price_to">
                          {{ request.price_from }} - {{ request.price_to }}
                          {{ $t("riyal") }}</span
                        >
                      </td>
                      <td
                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm d-flex align-items-center gap-8 actions"
                      >
                        <!-- <div
                            class="edit-action cursor-pointer"
                            @click="
                              selectRequest(request);
                              openEditModal();
                            "
                          >
                            <div class="svg-holder">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <g
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                >
                                  <path
                                    d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"
                                  />
                                  <path
                                    d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"
                                  />
                                </g>
                              </svg>
                            </div>
                          </div> -->
                        <div
                          class="delete-action cursor-pointer"
                          @click="
                            selectRequest(request);
                            openDeleteModal();
                          "
                        >
                          <div class="svg-holder">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="red"
                                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- Pagination Component -->
        <Pagination
          v-if="requests?.meta"
          :meta="requests.meta"
          @pageChange="handlePageChange"
        />
      </div>
      <div
        class="text-center py-24 my-24"
        v-else-if="!requests?.real_estate_requests.length && !loading"
      >
        {{ $t("no requests to display") }}
      </div>
      <LoadingScreen v-if="loading" />
      <TransitionRoot appear :show="deleteDialogIsOpen" as="template">
        <Dialog as="div" @close="closeDeleteModal" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>
  
          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900 bg-main text-white p-4 rounded"
                  >
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="title">
                        {{ $t("Delete Request") }}
                      </div>
                      <button
                        class="dismiss-icon border px-3 py-1 rounded"
                        @click="deleteDialogIsOpen = false"
                      >
                        x
                      </button>
                    </div>
                  </DialogTitle>
                  <div class="mt-2 p-4">
                    <div
                      class="text-center d-flex flex-column gap-5 justify-content-center align-items-center"
                    >
                      <div class="svg-holder">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="60"
                          height="60"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="red"
                            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                          />
                        </svg>
                      </div>
                      <h2>
                        {{ $t("Are you sure you want to delete the request?") }}
                      </h2>
                    </div>
                  </div>
  
                  <div class="mt-4 p-4 d-flex justify-content-center mb-3 gap-5">
                    <button
                      @click.stop="deleteRequest"
                      class="px-6 py-2 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300 d-flex gap-3 py-3"
                      style="background-color: #264642; color: white"
                    >
                      <span>{{ $t("delete") }}</span>
                    </button>
                    <button
                      @click.stop="closeDeleteModal"
                      class="px-6 py-2 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300 d-flex gap-3 py-3"
                      style="background-color: red; color: white"
                    >
                      <span>{{ $t("cancel") }}</span>
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
      <TransitionRoot appear :show="editDialogIsOpen" as="template">
        <Dialog as="div" @close="closeEditModal" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>
  
          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900 bg-main text-white p-4 rounded"
                  >
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="title">
                        {{ $t("Edit Request") }}
                      </div>
                      <button
                        class="dismiss-icon border px-3 py-1 rounded"
                        @click="editDialogIsOpen = false"
                      >
                        x
                      </button>
                    </div>
                  </DialogTitle>
                  <div class="mt-2 p-4">
                    edit selected data : {{ selectedRequest }}
                  </div>
  
                  <div class="mt-4 p-4 d-flex justify-content-center mb-3">
                    <button
                      class="px-6 py-2 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300 d-flex gap-3 py-3"
                      style="background-color: #264642; color: white"
                    >
                      <span>{{ $t("edit") }}</span>
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </template>
  
  <script setup>
  import {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/vue";
  const { t, locale } = useI18n();
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  const requests = ref(null);
  
  const { $api } = useNuxtApp();
  const loading = ref(false);
  const query = route.query;
  // dialog
  const editDialogIsOpen = ref(false);
  const deleteDialogIsOpen = ref(false);
  let selectedRequest = ref(null);
  function closeEditModal() {
    editDialogIsOpen.value = false;
  }
  function closeDeleteModal() {
    deleteDialogIsOpen.value = false;
  }
  function openEditModal() {
    editDialogIsOpen.value = true;
  }
  function openDeleteModal() {
    deleteDialogIsOpen.value = true;
  }
  const selectRequest = (request) => {
    selectedRequest.value = request;
  };
  const { $toastMessage } = useNuxtApp();
  const showToast = (message, type) => {
    $toastMessage(message, type); // Use type 'success', 'error', 'info', etc.
  };
  
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
    await fetchRequests(updatedQuery);
  
    // Ensure the scroll happens after the data and DOM update
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  };
  
  const fetchRequests = (page) => {
    loading.value = true;
    $api
      .get(`request-real-estates`, {
        params: page,
      })
      .then((res) => {
        requests.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  };
  function deleteRequest() {
    $api
      .delete(`/request-real-estates/${selectedRequest.value.id}`)
      .then((res) => {
        showToast(res?.data?.message, "success");
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          showToast(err?.response?.data?.message, "danger");
        }
      })
      .finally(() => {
        closeDeleteModal();
        fetchRequests(page);
        window.scrollTo({
          x: 0,
          y: 0,
          behavior: "smooth",
        });
      });
  }
  onMounted(async () => {
    await fetchRequests(query);
  });
  </script>
  
  <style lang="scss" scoped>
  thead tr th {
    text-align: start;
  }
  </style>
  