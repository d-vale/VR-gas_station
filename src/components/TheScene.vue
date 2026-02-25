<script setup>
import { ref } from "vue";
import "../aframe/clickable.js";
import "../aframe/outline.js";

import TheCameraRig from "./TheCameraRig.vue";
import TheGasStation from "./TheGasStation.vue";
import TheRedCar from "./TheRedCar.vue";

const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene outline="enabled: false">
    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item id="gas-station"  src="assets/small_red_gas_station/scene.gltf"></a-asset-item>
      <a-asset-item id="pompe95"      src="assets/pompe95.glb"></a-asset-item>
      <a-asset-item id="pompe95plus"  src="assets/pompe95+.glb"></a-asset-item>
      <a-asset-item id="pompeDisel"   src="assets/pompeDisel.glb"></a-asset-item>
      <a-asset-item id="pompeLPG"     src="assets/pompeLPG.glb"></a-asset-item>
      <a-asset-item id="car"          src="assets/generic_car.glb"></a-asset-item>
    </a-assets>

    <!-- Ciel nocturne étoilé -->
    <a-sky color="#050510"></a-sky>
    <!-- Lumière ambiante très faible, teinte nuit bleue -->
    <a-entity light="type: ambient; intensity: 0.1; color: #2244aa"></a-entity>

    <!-- Lumière de lune : douce et froide -->
    <a-entity
      light="type: directional; intensity: 0.25; color: #aabbdd"
      position="-5 15 3"
    ></a-entity>

    <TheCameraRig :assetsLoaded="allAssetsLoaded" />
    <TheGasStation :assetsLoaded="allAssetsLoaded" />
    <TheRedCar :assetsLoaded="allAssetsLoaded" />
  </a-scene>
</template>
