<script setup>
import "@/aframe/clickable.js";
import "@/aframe/look-at.js";
import "@/aframe/fuel-gauge.js";
import "@/aframe/car-refuel.js";
import "@/aframe/car-animation.js";

defineProps({ assetsLoaded: Boolean });
</script>

<template>
  <template v-if="assetsLoaded">
    <!-- Wrapper : déplacer cet entity déplace la voiture ET toutes ses lumières -->
    <a-entity position="22.028 0 -21.387" rotation="0 0 0" car-drive car-depart="gauge: #car-fuel-gauge">

      <!-- Modèle de la voiture -->
      <a-entity
        gltf-model="#car"
        scale="0.01 0.01 0.01"
        clickable
        car-refuel="gauge: #car-fuel-gauge"
      ></a-entity>

      <!-- Jauge de carburant -->
      <a-entity
        id="car-fuel-gauge"
        fuel-gauge="level: 0"
        look-at
        position="0.305 1.8 0"
      ></a-entity>

      <!-- Phare avant droit -->
      <a-entity
        light="type: point; intensity: 0.8; distance: 3; color: #ddeeff"
        position="-2.151 0.811 -0.658"
      ></a-entity>
      <!-- Lueur Phare avant droit -->
      <a-entity
        light="type: spot; intensity: 3; distance: 15; angle: 25; penumbra: 0.3; color: #ffffff"
        position="-0.601 0.793 -0.663"
        rotation="0 90 0"
      ></a-entity>

      <!-- Phare avant gauche -->
      <a-entity
        light="type: point; intensity: 0.8; distance: 3; color: #ddeeff"
        position="-2.151 0.811 0.650"
      ></a-entity>
      <!-- Lueur Phare avant gauche -->
      <a-entity
        light="type: spot; intensity: 3; distance: 15; angle: 25; penumbra: 0.3; color: #ffffff"
        position="-0.601 0.793 0.593"
        rotation="0 90 0"
      ></a-entity>

      <!-- Phare arrière droit -->
      <a-entity
        light="type: point; intensity: 0.8; distance: 3; color: #ff2200"
        position="1.911 0.978 -0.635"
      ></a-entity>
      <!-- Lueur Phare arrière droit -->
      <a-entity
        light="type: spot; intensity: 3; distance: 15; angle: 25; penumbra: 0.3; color: #ff2200"
        position="0.601 0.793 -0.663"
        rotation="0 -90 0"
      ></a-entity>

      <!-- Phare arrière gauche -->
      <a-entity
        light="type: point; intensity: 0.8; distance: 3; color: #ff2200"
        position="1.928 1.010 0.690"
      ></a-entity>
      <!-- Lueur Phare arrière gauche -->
      <a-entity
        light="type: spot; intensity: 3; distance: 15; angle: 25; penumbra: 0.3; color: #ff2200"
        position="0.601 0.793 0.593"
        rotation="0 -90 0"
      ></a-entity>

    </a-entity>
  </template>
</template>
