<script setup>
import { ref } from "vue";
const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene>
    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item
        id="gas-station"
        src="assets/small_red_gas_station/scene.gltf"
      ></a-asset-item>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <!-- Ciel et lumières -->
      <a-sky color="#87CEEB"></a-sky>
      <a-entity light="type: ambient; intensity: 0.8"></a-entity>
      <a-entity
        light="type: directional; intensity: 1"
        position="1 2 1"
      ></a-entity>

      <!-- Station-service -->
      <a-entity
        gltf-model="#gas-station"
        position="0 0 -5"
        scale="1 1 1"
      ></a-entity>
    </template>
  </a-scene>
</template>
