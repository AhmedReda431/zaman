<template>
    <div class="location-viewer">
      <!-- <h2>View Location</h2> -->
      <!-- <label for="location" class="mt-5 block text-sm font-medium text-gray-700">{{$t('building location')}}</label> -->
      <textarea
        id="location"
        v-model="locationInput"
        @input="updateEmbedContent"
        :placeholder="$t('Paste your location URL or iframe embed code here')"
        rows="5"
        required
      ></textarea>
  
      <div v-if="embedUrl" class="iframe-container">
        <iframe
          v-if="!isEmbedCode"
          :src="embedUrl"
          frameborder="0"
          allowfullscreen
          loading="lazy"
        ></iframe>
        <div v-else v-html="embedUrl"></div>
      </div>
  
      <p v-else-if="locationInput && !embedUrl" class="error">
        Could not generate a valid embed content. Please use a Google Maps URL or valid iframe code.
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Reactive state variables
  const locationInput = ref('');
  const embedUrl = ref('');
  const isEmbedCode = ref(false);
  
  // Function to check if input is an iframe embed code
  const isIframeEmbedCode = (input) => {
    return input.startsWith('<iframe') && input.includes('src="') && input.endsWith('</iframe>');
  };
  
  // Function to generate Google Maps embed link or process iframe
  const generateEmbedContent = (input) => {
    if (isIframeEmbedCode(input)) {
      isEmbedCode.value = true;
      return input; // Return the raw iframe embed code
    }
  
    try {
      const urlObj = new URL(input);
      if (urlObj.hostname.includes('google.com') || urlObj.hostname.includes('goo.gl')) {
        isEmbedCode.value = false;
        // Generate embed URL from the original Google Maps URL
        const embedBase = 'https://www.google.com/maps/embed?';
        const queryParams = urlObj.searchParams.toString();
        return `${embedBase}${queryParams}`;
      }
      return '';
    } catch (e) {
      return '';
    }
  };
  
  // Function to handle input event and update embed content
  const updateEmbedContent = () => {
    embedUrl.value = generateEmbedContent(locationInput.value);
  };
  </script>
  
  <style scoped>
  .location-viewer {
    border-radius: 8px;
  }
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
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
  