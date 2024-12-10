<template>
  <div class="component-holder">
    <div class="mb-8 shadow-sm m-h-400 px-24 my-2 py-2">
      <div class="notifications-list mt-16">
        <div
          class="notification d-flex align-items-center justify-content-between mb-3 bg-white flex-sm-column gap-5"
        >
          <div class="notification-data">
            <div class="d-flex align-items-center gap-2">
              <div class="notification-img">
                <img
                  class="inline-block h-20 w-20 rounded-full"
                  style="object-fit: cover"
                  :src="user?.profileImage || defaultAvatar"
                  alt="User avatar"
                />
              </div>
              <div class="notification-title-time mx-2">
                <!-- <p class="user-title text-secondary">
                  {{ user }}
                </p> -->
                <h3 class="font-bold user-name" v-if="user?.name">
                  {{ user.name }}
                </h3>
                <p class="user-email" v-if="user?.email">
                  {{ user.email }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="delete-notification cursor-pointer"
            @click="editProfile(index)"
          >
            <nuxt-link :to="{path:'/profile/profile-update'}"
              class="d-flex text-white align-items-center gap-2 bg-main text-white no-border rounded shadow px-5 py-2"
            >
              <span class="text-white">
                {{ $t("edit profile") }}
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="#fff"
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
              </span>
            </nuxt-link>
          </div>
        </div>
        <div class="user-controls bg-white my-10 p-3 rounded py-24 px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-16 justify-center">
            <!-- <nuxt-link
              :to="{ path: '/' }"
              class="box text-white d-flex justify-content-center align-items-center flex-column p-5 rounded"
            >
              <div class="icon-holder">
                <img
                  src="~/assets/img/profile/control_panel.svg"
                  alt="control panel"
                />
              </div>
              <div class="text-holder">
                <h1 class="title font-bold">
                  {{ $t("control panel") }}
                </h1>
              </div>
            </nuxt-link> -->
            <nuxt-link
              :to="{ path: '/profile/requests' }"
              class="box text-white d-flex justify-content-center align-items-center flex-column p-5 rounded"
            >
              <div class="icon-holder">
                <img src="~/assets/img/profile/orders.svg" alt="My requests" />
              </div>
              <div class="text-holder">
                <h1 class="title font-bold">
                  {{ $t("My requests") }}
                </h1>
              </div>
            </nuxt-link>
            <!-- <nuxt-link
              :to="{ path: '/profile/financial-requests' }"
              class="box text-white d-flex justify-content-center align-items-center flex-column p-5 rounded"
            >
              <div class="icon-holder">
                <img
                  src="~/assets/img/profile/financial_supply.svg"
                  alt="Financing requests"
                />
              </div>
              <div class="text-holder">
                <h1 class="title font-bold">
                  {{ $t("Financing requests") }}
                </h1>
              </div>
            </nuxt-link> -->
            <nuxt-link
              :to="{ path: '/profile/inspection-requests' }"
              class="box text-white d-flex justify-content-center align-items-center flex-column p-5 rounded"
            >
              <div class="icon-holder">
                <img
                  src="~/assets/img/profile/look_orders.svg"
                  alt="Inspection requests"
                />
              </div>
              <div class="text-holder">
                <h1 class="title font-bold">
                  {{ $t("Inspection requests") }}
                </h1>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = computed(() => useAuthStore().user);
import defaultAvatar from "@/assets/img/green.png";
definePageMeta({
  name: "user-profile",
  title: "user-Profile",
  description: "Manage your account settings and personal information.",
  middleware: "auth",
});
const editProfile = () => {
  console.log("clicked");
};
</script>

<style scoped lang="scss">
.search-input {
  min-width: 350px;
}
.notification {
  padding: 15px;
  border-radius: 10px;
}
@media (max-width: 767px) {
  .p-24,
  .px-24 {
    padding: 15px !important;
  }
}
.box {
  background-color: #768c88;
  color: #fff;
  border-radius: 20px !important;
  padding-block: 50px !important;
  .icon-holder {
    img {
      width: 100%;
      height: 85px;
    }
  }
  .title {
    color: #fff !important;
    font-size: 20px;
    margin-top: 20px;
    text-transform: capitalize;
  }
}
</style>
