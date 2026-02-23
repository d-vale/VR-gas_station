<script setup>
import { ref } from "vue";
const allAssetsLoaded = ref(false);
</script>

<template>
  <a-assets @loaded="allAssetsLoaded = true">
    <a-asset-item id="car" src="assets/generic_car.glb"></a-asset-item>
  </a-assets>

  <template v-if="allAssetsLoaded">
    <a-entity
      gltf-model="#car"
      position="2 0 -1.82"
      scale="0.01 0.01 0.01"
      rotation="0 90 0"
    ></a-entity>
  </template>
</template>
