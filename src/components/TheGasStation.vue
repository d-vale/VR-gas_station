<script setup>
import { ref } from "vue";
import "@/aframe/hide-nodes.js";
const allAssetsLoaded = ref(false);
</script>

<template>
  <a-assets @loaded="allAssetsLoaded = true">
    <a-asset-item
      id="gas-station"
      src="assets/small_red_gas_station/scene.gltf"
    ></a-asset-item>
  </a-assets>

  <template v-if="allAssetsLoaded">
    <a-entity data-role="nav-mesh">
      <a-entity>
        <!-- Station-service -->
        <a-entity
          gltf-model="#gas-station"
          position="0 0 -5"
          scale="1 1 1"
          hide-nodes="names: Cube030_Material022_0002, Cube030_disel_0"
        ></a-entity>

        <!-- Lumière centrale sous l'auvent -->
        <a-entity
          light="type: point; intensity: 2; distance: 12; color: #ffeeaa"
          position="0 3.5 -5"
        ></a-entity>

        <!-- Lumières latérales de l'auvent -->
        <a-entity
          light="type: point; intensity: 1.5; distance: 8; color: #ffeeaa"
          position="-3 3 -5"
        ></a-entity>
        <a-entity
          light="type: point; intensity: 1.5; distance: 8; color: #ffeeaa"
          position="3 3 -5"
        ></a-entity>

        <!-- Lumières sur les pompes -->
        <a-entity
          light="type: point; intensity: 1; distance: 5; color: #ffddaa"
          position="-1.5 1.5 -3"
        ></a-entity>
        <a-entity
          light="type: point; intensity: 1; distance: 5; color: #ffddaa"
          position="1.5 1.5 -3"
        ></a-entity>

        <!-- Néon rouge enseigne -->
        <a-entity
          light="type: point; intensity: 1.2; distance: 10; color: #ff2222"
          position="0 4.5 -5"
        ></a-entity>
      </a-entity>
    </a-entity>
  </template>
</template>
