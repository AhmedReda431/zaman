<script setup>
import { toRefs } from "vue";
import { useField } from "vee-validate";
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from "@headlessui/vue";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
const { t } = useI18n();
const roles = [
  {
    key: 1,
    label: t("Researcher"),
  },
  {
    key: 2,
    label: t("owner"),
  },
  {
    key: 3,
    label: t("mediator"),
  },
  {
    key: 4,
    label: t("developer"),
  },
];

const props = defineProps({
  modelValue: {
    type: null,
  },
  name: String,
  value: {
    type: String,
  },
});

// we are using toRefs to create reactive references to `name` and `value` props
// this is important because vee-validte needs to know if any of these props change
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const { name } = toRefs(props);
const { checked, handleChange, value } = useField(name, undefined, {
  type: "radio",
  checkedValue: 1,
  initialValue: 1,
  label: "Role",
  syncVModel: true,
});
</script>

<template>
  <RadioGroup v-model="value">
    <div class="mt-4 grid grid-cols-4 gap-y-6 gap-4 radios-holder">
      <RadioGroupOption
        as="template"
        v-for="role in roles"
        :key="role.key"
        :value="role.key"
        v-slot="{ active, checked }"
      >
        <div
          :class="[
            active ? 'border-secondary text-white' : 'border-gray-300',
            'w-full relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
          ]"
        >
          <span class="flex flex-1 justify-center">
            <span class="flex flex-col">
              <RadioGroupLabel
                as="span"
                :class="[checked ? 'text-white' : 'text-gray-900']"
                class="block text-sm font-medium text-center z-40 capitalize"
                >{{ role.label }}
              </RadioGroupLabel>
            </span>
          </span>
          <!-- <CheckCircleIcon :class="[!checked ? 'invisible' : '', 'h-5 w-5 text-zaman']" aria-hidden="true" /> -->
          <span
            :class="[
              checked ? 'bg-secondary text-white' : 'border-transparent',
              'pointer-events-none absolute -inset-px rounded-lg',
            ]"
            aria-hidden="true"
          />
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
<style lang="scss" scoped>
.radios-holder {
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
