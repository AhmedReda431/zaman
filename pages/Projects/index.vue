<template>
  <div class="page-holder">
    <div class="bg-white p-4 m-h-400 px-10">
      <div class="d-flex justify-content-between my-8 flex-sm-column">
        <h1 class="title">
          {{ $t("out projects") }}
        </h1>
        <p class="description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis
          eligendi accusamus recusandae vitae excepturi ab. Non reiciendis
          quisquam excepturi quaerat nulla, fuga dicta, ullam animi, dolore
          tenetur voluptatibus explicabo deserunt.
        </p>
      </div>
      <ProjectsComponent />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
