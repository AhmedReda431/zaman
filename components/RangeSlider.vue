<template>
  <div class="content">
    <div ref="slider" class="slider">
      <!-- Left Thumb -->
      <div
        class="slider-thumb-left"
        :style="{ left: leftThumbPosition + 'px' }"
        @mousedown="startDrag('left', $event)"
        @touchstart="startDrag('left', $event)"
      >
        <span></span>
      </div>

      <!-- Right Thumb -->
      <div
        class="slider-thumb-right"
        :style="{ left: rightThumbPosition + 'px' }"
        @mousedown="startDrag('right', $event)"
        @touchstart="startDrag('right', $event)"
      >
        <span></span>
      </div>

      <!-- Range Line -->
      <div class="slider-line">
        <span
          :style="{
            left: leftThumbPosition + 'px',
            width: rangeWidth + 'px',
          }"
        ></span>
      </div>
    </div>
    <!-- <div id="result">Min: {{ minValue }} Max: {{ maxValue }}</div> -->
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  initialMin: { type: Number, default: 20 },
  initialMax: { type: Number, default: 80 },
});

const emit = defineEmits(["update:minValue", "update:maxValue"]);

const slider = ref(null);

const state = reactive({
  sliderWidth: 0,
  thumbWidth: 36, // Default width of the thumb
  isDragging: false,
  draggingThumb: null,
  minValue: props.initialMin,
  maxValue: props.initialMax,
});

// Computed positions for the thumbs
const leftThumbPosition = computed(() =>
  ((state.minValue - props.min) / (props.max - props.min)) *
  (state.sliderWidth - state.thumbWidth)
);
const rightThumbPosition = computed(() =>
  ((state.maxValue - props.min) / (props.max - props.min)) *
  (state.sliderWidth - state.thumbWidth)
);
const rangeWidth = computed(() =>
  Math.max(rightThumbPosition.value - leftThumbPosition.value, 0)
);

// Normalize value based on position
const normalizeValue = (position) => {
  const ratio = position / (state.sliderWidth - state.thumbWidth);
  const value = props.min + ratio * (props.max - props.min);
  return Math.round(value / props.step) * props.step;
};

const startDrag = (thumb, event) => {
  state.isDragging = true;
  state.draggingThumb = thumb;

  const clientX = event.touches ? event.touches[0].clientX : event.clientX;

  const onMove = (moveEvent) => {
    const moveX = moveEvent.touches
      ? moveEvent.touches[0].clientX
      : moveEvent.clientX;

    if (!slider.value) return;

    const rect = slider.value.getBoundingClientRect();
    const offsetX = Math.min(
      Math.max(moveX - rect.left, 0),
      state.sliderWidth - state.thumbWidth
    );

    const newValue = normalizeValue(offsetX);

    if (thumb === "left") {
      if (newValue < state.maxValue - props.step) {
        state.minValue = newValue;
      }
    } else if (thumb === "right") {
      if (newValue > state.minValue + props.step) {
        state.maxValue = newValue;
      }
    }
  };

  const stopDrag = () => {
    state.isDragging = false;
    state.draggingThumb = null;

    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", stopDrag);

    emit("update:minValue", state.minValue);
    emit("update:maxValue", state.maxValue);
  };

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchmove", onMove);
  window.addEventListener("touchend", stopDrag);
};

onMounted(() => {
  if (slider.value) {
    const rect = slider.value.getBoundingClientRect();
    state.sliderWidth = rect.width;
  }
});

// Watchers to sync props
watch(
  () => props.initialMin,
  (newValue) => {
    state.minValue = newValue;
  }
);
watch(
  () => props.initialMax,
  (newValue) => {
    state.maxValue = newValue;
  }
);
</script>

<style scoped>
.content {
  width: 305px;
  display: flex;
  justify-content: flex-start;
}

.slider {
  position: relative;
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.slider-line span {
  position: absolute;
  height: 4px;
  background-color: orange;
  border-radius: 4px;
}

.slider-thumb-left,
.slider-thumb-right {
  position: absolute;
  height: 25px;
  width: 25px;
  top: 0;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 2;
}

.slider-thumb-left span,
.slider-thumb-right span {
  display: block;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border: 1px solid #a4a4a4;
  border-radius: 50%;
}
</style>
