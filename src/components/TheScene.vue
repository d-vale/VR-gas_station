<script setup>
import { ref } from "vue";
import "../aframe/clickable.js";

import TheCameraRig from "./TheCameraRig.vue";
import TheGasStation from "./TheGasStation.vue";
import TheRedCar from "./TheRedCar.vue";
</script>

<template>
  <a-scene>
    <!-- Ciel nocturne étoilé -->
    <a-sky color="#050510"></a-sky>
    <!-- Lumière ambiante très faible, teinte nuit bleue -->
    <a-entity light="type: ambient; intensity: 0.1; color: #2244aa"></a-entity>

    <!-- Lumière de lune : douce et froide -->
    <a-entity
      light="type: directional; intensity: 0.25; color: #aabbdd"
      position="-5 15 3"
    ></a-entity>

    <TheCameraRig />
    <TheGasStation />
    <TheRedCar />
  </a-scene>
</template>
