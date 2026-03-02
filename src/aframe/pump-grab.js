AFRAME.registerComponent('pump-grab', {
  schema: {
    handPump:   { type: 'selector' },
    vrHandPump: { type: 'selector' },
    radius:     { type: 'number', default: 0.5 },
  },

  init: function () {
    this.onClick = this.onClick.bind(this);
    this.el.addEventListener('click', this.onClick);

    this.isInVR = false;
    this.handRightInRange = false;
    this.handLeftInRange  = false;

    this._posHand = new THREE.Vector3();
    this._posEl   = new THREE.Vector3();
    this._box     = new THREE.Box3();

    this._onEnterVR = () => { this.isInVR = true; };
    this._onExitVR  = () => { this.isInVR = false; this.handRightInRange = false; this.handLeftInRange = false; };
    this.el.sceneEl.addEventListener('enter-vr', this._onEnterVR);
    this.el.sceneEl.addEventListener('exit-vr',  this._onExitVR);

    this._handRightEl    = document.querySelector('#hand-right');
    this._handLeftEl     = document.querySelector('#hand-left');
    this._colliderRight  = document.querySelector('#hand-right-collider');
    this._colliderLeft   = document.querySelector('#hand-left-collider');

    this._onTriggerRight = () => this.onTrigger('right');
    this._onTriggerLeft  = () => this.onTrigger('left');

    if (this._handRightEl) this._handRightEl.addEventListener('triggerdown', this._onTriggerRight);
    if (this._handLeftEl)  this._handLeftEl.addEventListener('triggerdown',  this._onTriggerLeft);

    this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);
  },

  tick: function () {
    if (!this.isInVR) return;

    // Les entités pompe ont toutes position="0 0 -5" mais le mesh GLB est
    // décalé en interne. On utilise le centre du bounding box world-space
    // pour obtenir la vraie position visuelle de la pompe.
    this._box.setFromObject(this.el.object3D);
    if (this._box.isEmpty()) {
      this.el.object3D.getWorldPosition(this._posEl);
    } else {
      this._box.getCenter(this._posEl);
    }

    if (this._colliderRight) {
      this._colliderRight.object3D.getWorldPosition(this._posHand);
      this.handRightInRange = this._posHand.distanceTo(this._posEl) < this.data.radius;
    }

    if (this._colliderLeft) {
      this._colliderLeft.object3D.getWorldPosition(this._posHand);
      this.handLeftInRange = this._posHand.distanceTo(this._posEl) < this.data.radius;
    }
  },

  onClick: function () {
    if (this.isInVR) return;   // le laser VR ne doit pas saisir les pompes
    // Desktop / non-VR click handling
    const handPump = this.data.handPump;
    if (!handPump) return;

    // Put back: pump is already held, return it to the station
    if (handPump.getAttribute('visible') === true) {
      handPump.setAttribute('visible', false);
      this.el.setAttribute('visible', true);
      this.el.setAttribute('outline-on-event', '');
      return;
    }

    // Block if a different pump is already held
    const heldPumps = document.querySelectorAll('[id^="hand-pompe"]');
    for (const p of heldPumps) {
      if (p.getAttribute('visible') === true) return;
    }

    // Pick up
    this.el.setAttribute('visible', false);
    this.el.removeAttribute('outline-on-event');
    handPump.setAttribute('visible', true);
    this._playSound('metal');
  },

  onTrigger: function (hand) {
    if (!this.isInVR) return;

    const inRange = hand === 'right' ? this.handRightInRange : this.handLeftInRange;
    if (!inRange) return;

    const vrHandPump = this.data.vrHandPump;
    if (!vrHandPump) return;

    // Put back: VR pump is held, return it to the station
    if (vrHandPump.getAttribute('visible') === true) {
      vrHandPump.setAttribute('visible', false);
      this.el.setAttribute('visible', true);
      this.el.setAttribute('outline-on-event', '');
      return;
    }

    // Block if any pump (desktop or VR) is already held
    const heldDesktop = document.querySelectorAll('[id^="hand-pompe"]');
    for (const p of heldDesktop) {
      if (p.getAttribute('visible') === true) return;
    }
    const heldVR = document.querySelectorAll('[id^="vr-hand-pompe"]');
    for (const p of heldVR) {
      if (p.getAttribute('visible') === true) return;
    }

    // Pick up in VR hand
    this.el.setAttribute('visible', false);
    this.el.removeAttribute('outline-on-event');
    vrHandPump.setAttribute('visible', true);
    this._playSound('metal');
  },

  _playSound: function (name) {
    const el = this.el.sceneEl.querySelector('#snd-' + name);
    if (!el || !el.components.sound) return;
    el.components.sound.playSound();
  },

  remove: function () {
    this.el.removeEventListener('click', this.onClick);
    this.el.sceneEl.removeEventListener('enter-vr', this._onEnterVR);
    this.el.sceneEl.removeEventListener('exit-vr',  this._onExitVR);
    if (this._handRightEl) this._handRightEl.removeEventListener('triggerdown', this._onTriggerRight);
    if (this._handLeftEl)  this._handLeftEl.removeEventListener('triggerdown',  this._onTriggerLeft);
  }
});
