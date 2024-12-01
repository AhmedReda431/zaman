<template>
  <div class="component-holder">
    <div class="mb-8 bg-white p-4 shadow-sm m-h-400 px-24 m-5 py-16">
      <div class="search-input-holder">
        <form action="">
          <input
            type="search"
            name="search"
            id="search"
            v-model="searchText"
            :placeholder="$t('search about')"
            @keyup="delayedSearch"
            class="mt-1 block rounded-2xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm search-input"
          />
        </form>
      </div>
      <div class="notifications-list mt-16">
        <div
          class="notification d-flex align-items-center justify-content-between mb-3" v-for="(x , index) in 10" :key="index"
        >
          <div class="notification-data">
            <div class="d-flex align-items-center gap-2">
              <div class="notification-img">
                <img src="~/assets/Icons/email.svg" alt="notification-img" />
              </div>
              <div class="notification-title-time">
                <h3 class="font-weight-bold">notification title - {{index + 1}}</h3>
                <p>notification time - {{index + 1}}</p>
              </div>
            </div>
          </div>
          <div class="delete-notification cursor-pointer" @click="removeNotification(index)">
            <div class="svg-holder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
  name: "ResponsiveSection",
  setup() {
    definePageMeta({
      description: "Your real-state has been created successfully",
      layout: "default",
    });
  },
  methods:{
    removeNotification(index){
      alert(`clicked to remove notification -${index + 1}`)
    },
    delayedSearch(){
      setTimeout(() => {
        alert(`searched about ${this.searchText}`)
      }, 2500);
    }
  }
};
</script>

<style scoped lang="scss">
.search-input {
  min-width: 350px;
}
.notification {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.delete-notification {
  .svg-holder {
    background: red;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
