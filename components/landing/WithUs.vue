<template>
  <div class="download-our-app-holder w-full h-full">
    <div class="container-holder">
      <section class="container mx-auto mx-8 px-4">
        <div class="d-flex justify-space-between align-items-center flex-sm-column">
          <div class="intro p-24">
            <h2 class="title">
              {{ $t("zaman application") }}
            </h2>
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
  .container-holder{
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: #26464273;
    .mobile-ing-holder{
      margin-top: -5%;
      @media(max-width:767px){
        margin-top: 0;
      }
    }
    .title{
      color: #fff;
      font-size: 35px;
    }
  }
}
</style>
