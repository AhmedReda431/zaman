<template>
  <div class="location-viewer">
    <textarea
      id="location"
      v-model="locationInput"
      @input="updateEmbedContent"
      :placeholder="$t('Paste your iframe embed code here')"
      rows="7"
      required
    ></textarea>

    <div v-if="embedUrl" class="iframe-container">
      <div v-html="embedUrl"></div>
    </div>

    <p v-else-if="locationInput && !embedUrl" class="error">
      Could not generate a valid iframe embed code. Please use a valid iframe
      code.
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineEmits } from "vue";

// Define an emit event
const emit = defineEmits(["updateLocation"]);

// Reactive state variables
const locationInput = ref("");
const embedUrl = ref("");

// Function to check if input is a valid iframe embed code
const isIframeEmbedCode = (input) => {
  // Check for valid iframe structure
  return (
    input.startsWith("<iframe") &&
    input.includes('src="') &&
    input.includes("</iframe>")
  );
};

// Function to handle input event and update iframe content
const updateEmbedContent = () => {
  if (isIframeEmbedCode(locationInput.value)) {
    embedUrl.value = locationInput.value;
    emit("updateLocation", locationInput.value); // Emit the iframe embed code
  } else {
    embedUrl.value = ""; // Clear the embed URL if invalid
    emit("updateLocation", ""); // Emit empty string to indicate invalid input
  }
};

// Watch for changes in locationInput to handle deletions
watch(locationInput, (newValue) => {
  if (!newValue.trim()) {
    embedUrl.value = ""; // Clear embed content
    emit("updateLocation", ""); // Emit empty string to indicate deletion
  }
});
</script>

<style scoped>
.location-viewer {
  border-radius: 8px;
}
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}
.iframe-container {
  margin-top: 20px;
  width: 100%;
  height: 400px;
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
