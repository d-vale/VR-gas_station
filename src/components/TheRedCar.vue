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

    <!-- Phare avant droit  -->
    <a-entity
      light="type: point; intensity: 0.8; distance: 3; color: #ddeeff"
      position="1.342 0.811 0.331"
      rotation="0 -180 0"
    ></a-entity>
    <!-- Lueur Phare avant droit -->
    <a-entity
      light="type: spot; intensity: 3; distance: 15; angle: 25; penumbra: 0.3; color: #ffffff"
      position="1.337 0.793 -1.219"
      rotation="0 180.000 0"
    ></a-entity>

    <!-- Phare avant gauche  -->
    <a-entity
      light="type: point; intensity: 0.8; distance: 3; color: #ddeeff"
      position="2.650 0.811 0.331"
      rotation="0 -180 0"
    ></a-entity>
    <!-- Lueur Phare avant gauche -->
    <a-entity
      light="type: spot; intensity: 3; distance: 15; angle: 25; penumbra: 0.3; color: #ffffff"
      position="2.593 0.793 -1.219"
      rotation="0 180.000 0"
    ></a-entity>

    <!-- Phare arrière droit -->
    <a-entity
      light="type: point; intensity: 0.8; distance: 3; color: #ff2200"
      position="1.365 0.978 -3.731"
      rotation="0 0 0"
    ></a-entity>
    <!-- Lueur Phare arrière droit -->
    <a-entity
      light="type: spot; intensity: 3; distance: 15; angle: 25; penumbra: 0.3; color: #ff2200"
      position="1.337 0.793 -2.421"
      rotation="0 0 0"
    ></a-entity>

    <!-- Phare arrière gauche -->
    <a-entity
      light="type: point; intensity: 0.8; distance: 3; color: #ff2200"
      position="2.690 1.010 -3.748"
      rotation="0 0 0"
    ></a-entity>
    <!-- Lueur Phare arrière gauche -->
    <a-entity
      light="type: spot; intensity: 3; distance: 15; angle: 25; penumbra: 0.3; color: #ff2200"
      position="2.593 0.793 -2.421"
      rotation="0 0 0"
    ></a-entity>

  </template>
</template>
