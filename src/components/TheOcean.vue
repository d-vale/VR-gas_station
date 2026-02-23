<script setup>
import "../aframe/duplicate";
import "../aframe/floor";
</script>

<template>
  <a-entity>
    <a-ocean
      depth="100"
      width="100"
      amplitude="0"
      amplitude-variance="0.1"
      opacity="1"
      density="50"
    ></a-ocean>
    <a-box floor></a-box>
    <a-plane
      data-role="nav-mesh"
      color="transparent"
      position="4.757 0 4.763"
      height="10"
      width="10"
      rotation="-90 0 0"
    ></a-plane>

    <a-entity light="type: ambient; color: #969696"></a-entity>
    <a-entity
      light="type: point; intensity: 15; color: white"
      position="-80 12 -50"
    ></a-entity>
  </a-entity>
</template>
