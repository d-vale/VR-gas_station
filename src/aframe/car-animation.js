function smoothstep(t) { return t * t * (3 - 2 * t); }

// ─── Arrivée ───────────────────────────────────────────────────────────────

AFRAME.registerComponent('car-drive', {
  schema: {
    phase1Duration: { type: 'number', default: 4000 },
    phase2Duration: { type: 'number', default: 1500 },
    phase3Duration: { type: 'number', default: 3000 },
    delay:          { type: 'number', default: 15000 },
    autostart:      { type: 'boolean', default: false },
  },

  init: function () {
    this.state    = 'idle';
    this.progress = 0;
    this.timer    = null;

    this.PHASE1_START = new THREE.Vector3(22.028, 0, -21.387);
    this.PHASE1_END   = new THREE.Vector3(2,      0, -21.387);
    this.PHASE3_END   = new THREE.Vector3(2,      0,  -1.82);

    this.el.object3D.visible = false;

    this.onEnterScene = this.onEnterScene.bind(this);
    this.el.sceneEl.addEventListener('enter-scene', this.onEnterScene);

    if (this.data.autostart) {
      if (this.el.sceneEl.hasLoaded) {
        this._scheduleStart();
      } else {
        this._onLoaded = () => this._scheduleStart();
        this.el.sceneEl.addEventListener('loaded', this._onLoaded);
      }
    }
  },

  onEnterScene: function () { this._scheduleStart(); },

  _scheduleStart: function () {
    if (this.state !== 'idle' || this.timer !== null) return;
    this.timer = setTimeout(() => this._beginPhase1(), this.data.delay);
  },

  _beginPhase1: function () {
    this.state = 'phase1'; this.progress = 0;
    this.el.object3D.position.copy(this.PHASE1_START);
    this.el.object3D.rotation.set(0, 0, 0);
    this.el.object3D.visible = true;
  },
  _beginPhase2: function () {
    this.state = 'phase2'; this.progress = 0;
    this.el.object3D.position.copy(this.PHASE1_END);
    this.el.object3D.rotation.set(0, 0, 0);
  },
  _beginPhase3: function () {
    this.state = 'phase3'; this.progress = 0;
    this.el.object3D.rotation.set(0, Math.PI / 2, 0);
  },

  tick: function (time, delta) {
    if (this.state === 'idle' || this.state === 'done') return;
    const obj = this.el.object3D;

    if (this.state === 'phase1') {
      this.progress += delta / this.data.phase1Duration;
      const t = smoothstep(Math.min(1, this.progress));
      obj.position.lerpVectors(this.PHASE1_START, this.PHASE1_END, t);
      if (this.progress >= 1) this._beginPhase2();
      return;
    }
    if (this.state === 'phase2') {
      this.progress += delta / this.data.phase2Duration;
      const t = smoothstep(Math.min(1, this.progress));
      obj.rotation.y = THREE.MathUtils.lerp(0, Math.PI / 2, t);
      if (this.progress >= 1) this._beginPhase3();
      return;
    }
    if (this.state === 'phase3') {
      this.progress += delta / this.data.phase3Duration;
      const t = smoothstep(Math.min(1, this.progress));
      obj.position.lerpVectors(this.PHASE1_END, this.PHASE3_END, t);
      if (this.progress >= 1) {
        this.state = 'done';
        obj.position.copy(this.PHASE3_END);
        obj.rotation.set(0, Math.PI / 2, 0);
      }
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener('enter-scene', this.onEnterScene);
    if (this._onLoaded) this.el.sceneEl.removeEventListener('loaded', this._onLoaded);
    if (this.timer !== null) { clearTimeout(this.timer); this.timer = null; }
  }
});

// ─── Départ ─────────────────────────────────────────────────────────────────

AFRAME.registerComponent('car-depart', {
  schema: {
    phase1Duration: { type: 'number', default: 3000 },
    phase2Duration: { type: 'number', default: 1500 },
    phase3Duration: { type: 'number', default: 4000 },
    gauge:          { type: 'selector' },
  },

  init: function () {
    this.state    = 'idle';
    this.progress = 0;

    this.PHASE1_START = new THREE.Vector3(2,      0, -1.82);
    this.PHASE1_END   = new THREE.Vector3(2.010,  0, 10.277);
    this.PHASE3_END   = new THREE.Vector3(21.688, 0, 10.277);

    this.onFuelFull = this.onFuelFull.bind(this);
    this.el.sceneEl.addEventListener('fuel-full', this.onFuelFull);
  },

  onFuelFull: function () {
    if (this.state !== 'idle') return;
    if (this.data.gauge) this.data.gauge.setAttribute('visible', false);
    this._beginPhase1();
  },

  _beginPhase1: function () {
    this.state = 'phase1'; this.progress = 0;
    this.el.object3D.position.copy(this.PHASE1_START);
    this.el.object3D.rotation.set(0, Math.PI / 2, 0);
  },
  _beginPhase2: function () {
    this.state = 'phase2'; this.progress = 0;
    this.el.object3D.position.copy(this.PHASE1_END);
    this.el.object3D.rotation.set(0, Math.PI / 2, 0);
  },
  _beginPhase3: function () {
    this.state = 'phase3'; this.progress = 0;
    this.el.object3D.rotation.set(0, Math.PI, 0);
  },

  tick: function (time, delta) {
    if (this.state === 'idle' || this.state === 'done') return;
    const obj = this.el.object3D;

    if (this.state === 'phase1') {
      this.progress += delta / this.data.phase1Duration;
      const t = smoothstep(Math.min(1, this.progress));
      obj.position.lerpVectors(this.PHASE1_START, this.PHASE1_END, t);
      if (this.progress >= 1) this._beginPhase2();
      return;
    }
    if (this.state === 'phase2') {
      this.progress += delta / this.data.phase2Duration;
      const t = smoothstep(Math.min(1, this.progress));
      obj.rotation.y = THREE.MathUtils.lerp(Math.PI / 2, Math.PI, t);
      if (this.progress >= 1) this._beginPhase3();
      return;
    }
    if (this.state === 'phase3') {
      this.progress += delta / this.data.phase3Duration;
      const t = smoothstep(Math.min(1, this.progress));
      obj.position.lerpVectors(this.PHASE1_END, this.PHASE3_END, t);
      if (this.progress >= 1) {
        this.state = 'done';
        obj.position.copy(this.PHASE3_END);
        obj.rotation.set(0, Math.PI, 0);
        this.el.object3D.visible = false;
      }
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener('fuel-full', this.onFuelFull);
  }
});
