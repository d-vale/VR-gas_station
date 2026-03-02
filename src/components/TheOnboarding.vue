<script setup>
  import { ref } from 'vue';

  defineProps({
    loaded: Boolean,
  });

  const showOnboarding = ref(true);

  function enterScene() {
    showOnboarding.value = false;
    if (AFRAME.utils.device.checkHeadsetConnected() && !AFRAME.utils.device.isMobile()) {
      document.querySelector('a-scene').enterVR();
    }
    document.querySelector('a-scene').emit('enter-scene');
  }
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">
    <div>
      <h1>Gas station VR</h1>
      <p class="description">Bienvenue à la station-service ! Des voitures arrivent, à toi de faire le plein avant qu'elles repartent.</p>
      <p v-if="!loaded">Chargement...</p>
      <button v-if="loaded" @click="enterScene()">Entrer dans la scène</button>

      <div class="licences">
        <section id="jeu">
          <h4>Comment jouer</h4>
          <ul>
            <li>Une voiture arrive avec un type de carburant requis affiché au-dessus du véhicule</li>
            <li>Attrape la bonne pompe et approche-la de la voiture pour faire le plein</li>
            <li>Tu as 30 secondes avant que la voiture reparte sans payer</li>
            <li>Chaque plein réussi te rapporte des CHF selon le prix du carburant</li>
          </ul>
        </section>

        <section id="controles">
          <h4>Modes de contrôle</h4>
          <ul>
            <li>Desktop – WASD/Flèches pour bouger + Drag souris pour regarder</li>
            <li>Mobile – 1 doigt = avancer, 2 doigts = reculer + Gaze cursor</li>
            <li>VR/AR – Déplacement + Téléportation (gâchette gauche) + Laser (main droite)</li>
          </ul>
        </section>

        <section id="credits">
          <h4>Source code</h4>
          <blockquote><a href="https://github.com/d-vale/VR-gas_station">Github repo</a></blockquote>
        </section>

        <dl>
          <dt><i>Librairies incluses</i></dt>
          <dt><a href="https://github.com/c-frame/aframe-extras" target="_blank">aframe-extras</a></dt>
          <dd><a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a></dd>

          <dt><a href="https://github.com/c-frame/physx" target="_blank">aframe-physx</a></dt>
          <dd><a href="https://github.com/c-frame/physx/blob/master/LICENSE" target="_blank">MIT License</a></dd>

          <dt><a href="https://github.com/jure/aframe-blink-controls/" target="_blank">aframe-blink-controls</a></dt>
          <dd><a href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE" target="_blank">MIT License</a></dd>

          <dt><a href="https://github.com/diarmidmackenzie/aframe-multi-camera/" target="_blank">aframe-multi-camera</a></dt>
          <dd><a href="https://github.com/diarmidmackenzie/aframe-multi-camera/blob/main/LICENSE" target="_blank">MIT License</a></dd>

          <dt><a href="https://github.com/AdaRoseCannon/aframe-xr-boilerplate" target="_blank">simple-navmesh-constraint</a></dt>
          <dd>By Ada Rose Cannon under MIT License</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h1 { font-size: 1.5rem }
  .description {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #aaa;
  }
  a {
    color: #eee;
    text-decoration: none;
  }
  .licences {
    margin: 2rem 0;
    padding-bottom: 1rem;
    font-size: 1rem;
    text-align: left;
  }
  .licences dt {
    padding-top: 0.75rem;
    font-size: 0.9rem;
    font-weight: bold;
  }
  .licences dd {
    margin-left: 0;
    font-size: 0.8rem;
  }
  .licences li {
    font-size: 1rem;
    text-align: left;
  }

  #onboarding {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #333;
    color: #ccc;
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    font-family: monospace;
    z-index: 10000;
    overflow: auto;
  }
  #onboarding > * {
    margin: 0 auto;
    max-width: 50rem;
    width: calc(100vw - 10rem);
    text-align: center;
    border-radius: 0.3rem;
    padding: 1rem;
    font-size: 1.3rem;
  }
  #onboarding button {
    font-size: 1.3rem;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    background-color: white;
    color: black;
    border: none;
    cursor: pointer;
  }
</style>
