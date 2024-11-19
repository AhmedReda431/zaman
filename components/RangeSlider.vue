<template>
  <div class="multi-range">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model="lowerValue"
      @input="onLowerInput"
    />
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model="upperValue"
      @input="onUpperInput"
    />
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

// Props to allow customization
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 10000 },
  step: { type: Number, default: 10 },
  initialLower: { type: Number, default: 0 },
  initialUpper: { type: Number, default: 10000 },
  gap: { type: Number, default: 4 }, // Minimum gap between sliders
});

// Emits for communication
const emit = defineEmits(["update:lowerValue", "update:upperValue"]);

// Reactive values for the sliders
const lowerValue = ref(props.initialLower);
const upperValue = ref(props.initialUpper);

// Handle lower slider input
const onLowerInput = () => {
  if (lowerValue.value > upperValue.value - props.gap) {
    lowerValue.value = upperValue.value - props.gap;
  }
  emit("update:lowerValue", lowerValue.value);
};

// Handle upper slider input
const onUpperInput = () => {
  if (upperValue.value < lowerValue.value + props.gap) {
    upperValue.value = lowerValue.value + props.gap;
  }
  emit("update:upperValue", upperValue.value);
};

// Watch for value changes to emit to the parent
watch(lowerValue, (newValue) => {
  emit("update:lowerValue", newValue);
});

watch(upperValue, (newValue) => {
  emit("update:upperValue", newValue);
});
</script>

<style scoped lang="scss">
input[type="range"] {
  box-sizing: border-box;
  appearance: none;
  width: 400px;
  margin: 0;
  padding: 0 2px;
  /* Add some L/R padding to ensure box shadow of handle is shown */
  overflow: hidden;
  border: 0;
  border-radius: 1px;
  outline: none;
  background: linear-gradient(grey, $main-color) no-repeat center;
  /* Use a linear gradient to generate only the 2px height background */
  background-size: 100% 2px;
  pointer-events: none;

  &:active,
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    height: 28px;
    width: 28px;
    border-radius: 28px;
    background-color: #fff;
    position: relative;
    margin: 5px 0;
    /* Add some margin to ensure box shadow is shown */
    cursor: pointer;
    appearance: none;
    pointer-events: all;
    box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);
    &::before {
      content: " ";
      display: block;
      position: absolute;
      top: 13px;
      left: 100%;
      width: 2000px;
      height: 2px;
    }
  }
}

.multi-range {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;

  input[type="range"] {
    position: absolute;

    &:nth-child(1) {
      &::-webkit-slider-thumb::before {
        background-color: red;
      }
    }

    &:nth-child(2) {
      background: none;

      &::-webkit-slider-thumb::before {
        background-color: grey;
      }
    }
  }
}
.multi-range input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  width: 100%;
  pointer-events: none;
}

.multi-range input[type="range"]::-webkit-slider-thumb {
  pointer-events: auto;
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: orange;
  cursor: pointer;
}

.multi-range input[type="range"]::-moz-range-thumb {
  pointer-events: auto;
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: orange;
  cursor: pointer;
}
</style>
