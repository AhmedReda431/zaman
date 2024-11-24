<template>
  <div class="download-our-app-holder w-full h-full">
    <div class="container-holder">
      <section class="container mx-auto mx-8 px-4">
        <div
          class="d-flex justify-space-between align-items-center flex-sm-column"
        >
          <div class="intro py-24">
            <h2 class="title">
              {{ $t("zaman application") }}
            </h2>
            <h4 class="description w-50 text-white mt-5">
              {{ $t("app description") }}
            </h4>
            <div class="applications-hoder d-flex gap-5 mt-5">
              <div class="application">
                <NuxtLink to="/">
                  <img
                    src="~/assets/img/home/app-store-17122018.png"
                    alt="app-img"
                    class="w-100"
                  />
                </NuxtLink>
              </div>
              <div class="application">
                <NuxtLink to="/">
                  <img
                    src="~/assets/img/home/apple-android-store-icons.png"
                    alt="app-img"
                    class="w-100"
                  />
                </NuxtLink>
              </div>
              <div class="application">
                <NuxtLink to="/">
                  <img
                    src="~/assets/img/home/ExTweChWYAAeGfy.png"
                    alt="app-img"
                    class="w-100"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="mobile-ing-holder">
            <img
              src="~/assets/img/contact_mobile.png"
              alt="application-mobile"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.download-our-app-holder {
  background: url("~/assets/img/contact_back.jpg") no-repeat center center;
  background-size: cover;
  margin-top: 8%;
  .container-holder {
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: #26464273;
    .mobile-ing-holder {
      margin-top: -5%;
      @media (max-width: 767px) {
        margin-top: 0;
      }
    }
    .title {
      color: #fff;
      font-size: 40px;
    }
  }
}
.description {
  font-size: 22px;
  margin-bottom: 35px;
}
</style>
<script>
export default {
  methods: {
    getSettingData() {
      this.$api
        .get("/settings")
        .then((res) => {
          this.settingData = res?.data?.data;
          email: "fddf@gmail.com";
          fb_link: "https://youtube.com/";
          id: 1;
          inst_link: "https://youtube.com/";
          linkedin_link: "https://youtube.com/";
          phone: "https://youtube.com/";
          tw_link: "https://youtube.com/";
          whatsapp: "https://youtube.com/";
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            showAlert(err.response.data.message, "danger");
          }
        });
    },
  },
  data() {
    return {
      settingData: null,
    };
  },
  mounted() {
    // this.getSettingData();
  },
};
</script>
