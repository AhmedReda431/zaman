<template>
  <div class="relative min-h-screen bg-gray-100 m-12">
    <!-- Image with Overlay Text -->
    <div class="relative h-64 md:h-96 w-full rounded-lg">
      <img
        src="~/assets/img/contact/contact-back.jpg"
        alt="House Image"
        class="object-cover w-full h-full rounded-lg br-15"
      />
      <!-- Overlay Text -->
      <div
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-left p-8 br-15"
      >
        <div class="text-center">
          <h2 class="text-white text-4xl font-bold">{{ $t("contact-us") }}</h2>
          <p class="text-white text-lg mt-2">
            {{ $t("Fill in your information now") }}
          </p>
        </div>
      </div>
    </div>

    <!-- Conditional rendering based on form submission -->
    <div
      class="inset-0 top-48 md:top-60 flex justify-end md:ml-16 contact-form pb-8"
    >
      <!-- النموذج أقرب إلى اليسار -->
      <div
        v-if="!isSubmitted"
        class="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3"
      >
        <!-- تصغير العرض هنا -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="flex flex-col">
            <label for="name" class=" mb-2">{{$t('full name')}}</label>
            <input
              type="text"
              id="name"
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              v-model="form.full_name"
            />
          </div>
          <div class="flex flex-col">
            <label for="phone" class=" mb-2">{{$t('mobile number')}}</label>
            <input
              type="text"
              id="phone"
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              v-model="form.phone"
            />
          </div>
          <div class="flex flex-col">
            <label for="email" class=" mb-2">{{$t('email')}}</label>
            <input
              type="email"
              id="email"
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              v-model="form.email"
            />
          </div>
          <div class="flex flex-col">
            <label for="message" class=" mb-2">{{$t('notes')}}</label>
            <textarea
              id="message"
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              v-model="form.notes"
              rows="4"
            ></textarea>
          </div>
          <div class="">
            <button
              type="submit"
              class="px-6 py-2 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300"
              style="background-color: #264642; color: white"
            >
              {{ $t('submit') }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success message after form submission -->
      <div
        v-else
        class="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 border-2 text-center"
      >
        <!-- نفس التعديل هنا -->
        <img
          src="https://picsum.photos/800/400"
          alt="Success Image"
          class="mx-auto mb-4"
        />
        <h3 class="text-green-600 text-2xl font-bold">تم إرسال الطلب بنجاح!</h3>
        <p class="text-gray-600 mt-2">
          يسعدنا تواصلك مع شركة زمن وسوف نقوم بالرد فى اسرع وقت
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSubmitted: false, // حالة تتبع إذا تم إرسال النموذج
      form:{
        full_name:null,
        email:null,
        phone:null,
        notes:null,
      }
    };
  },
  methods: {
    handleSubmit() {
      // عند إرسال النموذج، نغير حالة isSubmitted إلى true
      // this.isSubmitted = true;
    },
  },
};
</script>

<style scoped lang="scss">
/* Add custom styles if needed */
.contact-form {
  z-index: 99;
  display: flex;
  position: sticky;
  margin-top: -5%;
  margin-inline: 3%;
}
.back-img{
  border-radius: 15px;
}
</style>
