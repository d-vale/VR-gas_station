<script setup>
import "@/aframe/clickable.js";
import "@/aframe/pump-grab.js";
defineProps({ assetsLoaded: Boolean });
</script>

<template>
  <template v-if="assetsLoaded">
    <a-entity data-role="nav-mesh">
      <a-entity>
        <!-- Station-service -->
        <a-entity
          id="gas-station-model"
          gltf-model="#gas-station"
          position="0 0 -5"
          scale="1 1 1"
        ></a-entity>

        <!-- Pompes -->
        <a-entity id="scene-pompe95"     outline-on-event clickable gltf-model="#pompe95"     pump-grab="handPump: #hand-pompe95"     visible="true"  position="0 0 -5" scale="1 1 1"></a-entity>
        <a-entity id="scene-pompe95plus" outline-on-event clickable gltf-model="#pompe95plus"  pump-grab="handPump: #hand-pompe95plus" visible="true"  position="0 0 -5" scale="1 1 1"></a-entity>
        <a-entity id="scene-pompeDisel"  outline-on-event clickable gltf-model="#pompeDisel"   pump-grab="handPump: #hand-pompeDisel"  visible="true"  position="0 0 -5" scale="1 1 1"></a-entity>
        <a-entity id="scene-pompeLPG"    outline-on-event clickable gltf-model="#pompeLPG"     pump-grab="handPump: #hand-pompeLPG"    visible="true"  position="0 0 -5" scale="1 1 1"></a-entity>

        <!-- Lumière 1 : avant-gauche -->
        <a-entity
          light="type: point; intensity: 2; distance: 10; decay: 0.7; color: #ffe4b5"
          position="0.528 4.5 -0.85"
        ></a-entity>

        <!-- Lumière 2 : avant-centre-gauche -->
        <a-entity
          light="type: point; intensity: 2; distance: 10; decay: 1; color: #ffe4b5"
          position="8.131 4.5 -1.0"
        ></a-entity>

        <!-- Lumière 3 : avant-centre-droit -->
        <a-entity
          light="type: point; intensity: 2; distance: 10; decay: 1; color: #ffe4b5"
          position="10.881 4.5 -1.0"
        ></a-entity>

        <!-- Lumière 4 : arrière-centre-droit -->
        <a-entity
          light="type: point; intensity: 2; distance: 10; decay: 1; color: #ffe4b5"
          position="10.881 4.5 -8.911"
        ></a-entity>

        <!-- Lumière 5 : arrière-centre-gauche -->
        <a-entity
          light="type: point; intensity: 2; distance: 10; decay: 1; color: #ffe4b5"
          position="7.979 4.5 -8.911"
        ></a-entity>

        <!-- Lumière 6 : arrière-gauche -->
        <a-entity
          light="type: point; intensity: 2; distance: 10; decay: 0.9; color: #ffe4b5"
          position="0.564 4.5 -9.0"
        ></a-entity>

        <!-- Lumière 7 : arrière-droit -->
        <a-entity
          light="type: point; intensity: 2; distance: 10; decay: 1; color: #ffe4b5"
          position="18.31 4.5 -9.0"
        ></a-entity>

        <!-- Lumière 8 : avant-droit -->
        <a-entity
          light="type: point; intensity: 2; distance: 10; decay: 1; color: #ffe4b5"
          position="18.31 4.5 -1.3"
        ></a-entity>

        <!-- Néon rouge contour canopée — côté avant -->
        <a-entity
          light="type: point; intensity: 3; distance: 8; decay: 0.5; color: #ff2200"
          position="9.155 5.8 6.92"
        ></a-entity>

        <!-- Néon rouge contour canopée — côté arrière -->
        <a-entity
          light="type: point; intensity: 3; distance: 8; decay: 0.5; color: #ff2200"
          position="9.155 5.8 -17.835"
        ></a-entity>

        <!-- Néon rouge contour canopée — côté gauche -->
        <a-entity
          light="type: point; intensity: 3; distance: 8; decay: 0.5; color: #ff2200"
          position="-3.26 5.8 -5.0"
        ></a-entity>

        <!-- Néon rouge contour canopée — côté droit -->
        <a-entity
          light="type: point; intensity: 3; distance: 8; decay: 0.5; color: #ff2200"
          position="22.981 5.8 -5.0"
        ></a-entity>

        <!-- Lumière intérieure du magasin -->
        <a-entity
          light="type: point; intensity: 2; distance: 15; decay: 0.03; color: #f0f4ff; castShadow: true"
          position="-6.559 2.5 -4.710"
        ></a-entity>
      </a-entity>
    </a-entity>
  </template>
</template>
