<script setup>
import { ref } from "vue";
import "../aframe/clickable.js";

import TheCameraRig from "./TheCameraRig.vue";
import TheGasStation from "./TheGasStation.vue";
</script>

<template>
  <a-scene>
    <TheCameraRig />  
    <TheGasStation />
  </a-scene>
</template>
