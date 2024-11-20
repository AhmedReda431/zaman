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
            <label for="name" class="mb-2">{{ $t("full name") }}</label>
            <input
              type="text"
              id="name"
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              v-model="form.full_name"
              required
            />
          </div>
          <div class="flex flex-col">
            <label for="phone" class="mb-2">{{ $t("mobile number") }}</label>
            <input
              type="text"
              id="phone"
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              v-model="form.phone"
              required
            />
          </div>
          <div class="flex flex-col">
            <label for="email" class="mb-2">{{ $t("email") }}</label>
            <input
              type="email"
              id="email"
              class="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
              v-model="form.email"
              required
            />
          </div>
          <div class="flex flex-col">
            <label for="message" class="mb-2">{{ $t("notes") }}</label>
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
              {{ $t("submit") }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success message after form submission -->
      <div
        v-else-if="isSubmitted && responseMessage"
        class="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 border-2 text-center"
      >
        <!-- نفس التعديل هنا -->
        <!-- <img
          src="https://picsum.photos/800/400"
          alt="Success Image"
          class="mx-auto mb-4"
        /> -->
        
        <div class="success-message-holder">
        <div class="main-container">
          <div class="check-container">
            <div class="check-background">
              <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="check-shadow"></div>
          </div>
        </div>
      </div>
        <!-- <h3 class="text-green-600 text-2xl font-bold">
          {{responseMessage}}
        </h3> -->
        <h3 class="text-green-600 text-2xl font-bold">{{$t('Request sent successfully!')}}</h3>
        <p class="text-gray-600 mt-2">
          {{$t('We are happy to communicate with Zaman Company and we will respond as soon as possible')}}
        </p>
      </div>
      <div class='error' v-if="isSubmitted && errorMessage">
        {{errorMessage}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSubmitted: false, // حالة تتبع إذا تم إرسال النموذج
      form: {
        full_name: null,
        email: null,
        phone: null,
        notes: null,
      },
      responseMessage:null,
      errorMessage:null,
    };
  },
  methods: {
    handleSubmit() {
      // عند إرسال النموذج، نغير حالة isSubmitted إلى true
      // this.isSubmitted = true;
      this.$api
        .post("/contact-us")
        .then((res) => {
          this.responseMessage = res?.data?.message ? res.data.message : null
          this.isSubmitted = true;
        })
        .catch((err) => {
          if(err?.response?.data?.message){
            this.errorMessage = err.response.data.message
          }
        });
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
.back-img {
  border-radius: 15px;
}
.success-message-holder{
  // HTML font size can define checkbox size
html,
body {
	font-size: 24px;
}

// Sample container
.main-container {
	width: 100%;
	height: 200px;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
}

// Main CSS
.check-container {
	width: 6.25rem;
	height: 7.5rem;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: space-between;

	.check-background {
		width: 100%;
		height: calc(100% - 1.25rem);
		background: linear-gradient(to bottom right, #5de593, #41d67c);
		box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
		transform: scale(0.84);
		border-radius: 50%;
		animation: animateContainer 0.75s ease-out forwards 0.75s;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;

		svg {
			width: 65%;
			transform: translateY(0.25rem);
			stroke-dasharray: 80;
			stroke-dashoffset: 80;
			animation: animateCheck 0.35s forwards 1.25s ease-out;
		}
	}

	.check-shadow {
		bottom: calc(-15% - 5px);
		left: 0;
		border-radius: 50%;
		background: radial-gradient(closest-side, rgba(73, 218, 131, 1), transparent);
		animation: animateShadow 0.75s ease-out forwards 0.75s;
	}
}

@keyframes animateContainer {
	0% {
		opacity: 0;
		transform: scale(0);
		box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
	}
	25% {
		opacity: 1;
		transform: scale(0.9);
		box-shadow: 0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
	}
	43.75% {
		transform: scale(1.15);
		box-shadow: 0px 0px 0px 43.334px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 65px rgba(255, 255, 255, 0.25) inset;
	}
	62.5% {
		transform: scale(1);
		box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 21.667px rgba(255, 255, 255, 0.25) inset;
	}
	81.25% {
		box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
	}
	100% {
		opacity: 1;
		box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset,
			0px 0px 0px 0px rgba(255, 255, 255, 0.25) inset;
	}
}

@keyframes animateCheck {
	from {
		stroke-dashoffset: 80;
	}
	to {
		stroke-dashoffset: 0;
	}
}

@keyframes animateShadow {
	0% {
		opacity: 0;
		width: 100%;
		height: 15%;
	}
	25% {
		opacity: 0.25;
	}
	43.75% {
		width: 40%;
		height: 7%;
		opacity: 0.35;
	}
	100% {
		width: 85%;
		height: 15%;
		opacity: 0.25;
	}
}

}
</style>
