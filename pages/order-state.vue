<script setup>
import { ref, computed } from 'vue';
import * as Yup from 'yup';

definePageMeta({
  title: 'Login',
  description: 'Login page description',
  layout: 'auth',
});
const { t } = useI18n();
const { showAlert } = useAlert();
const { login, loading, error } = useLogin();

const loginType = ref('email');

const usernameRules = computed(() => {
  return loginType.value === 'email'
    ? Yup.string().matches(/^[\w\.-]+@[a-zA-Z\d\.-]+\.(com|net|org|edu|gov|mil|info|biz|co.uk|io)$/, t('validation.email.notValid')).required(t('validation.email.required'))
    : Yup.string().matches(/^\+966-\d{2}-\d{7}$/, t('validation.phone.notValid')).required(t('validation.phone.required'));
});
const usernamePlaceholder = computed(() => {
  return loginType.value === 'email' ? '\u202Aexample@gmail.com' : '\u202A+966-XX-XXXXXXX';
});
const usernameLabel = computed(() => {
  return loginType.value === 'email' ? t('common.email') : t('common.phone');
});

const formSchema = ref({
  fields: [
    {
      label: usernameLabel,
      name: 'username',
      as: 'input',
      placeholder: usernamePlaceholder,
      rules: usernameRules,
    },
    {
      label: t('common.password'),
      name: 'password',
      as: 'input',
      type: 'password',
      placeholder: '******',
      rules: Yup.string().min(6, t('validation.password.minLength')).required(t('validation.password.required')),
    },
  ],
});

const handleLogin = async (data) => {
  await login(data.username, data.password);

};


</script>

<template>
  <section class="h-full">
    <div class="flex min-h-full flex-1">
      <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <NuxtLink to="/">
              <IconsLogo class="h-14 w-auto " alt="zaman" />
            </NuxtLink>
            <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">{{
              $t('requistBuilding')
            }}</h2>
          </div>

          <div class="mt-10">
            <div>
              form
            </div>

          </div>
        </div>
      </div>
      <div class="relative hidden w-0 flex-1 lg:block">
        <img class="absolute inset-0 h-full w-full object-cover" src="@/assets/img/login.png" alt="" />
      </div>
    </div>
  </section>
</template>
