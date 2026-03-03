const PUMP_ID_TO_TYPE = {
  'hand-pompe95':        '95',
  'hand-pompe95plus':    '95+',
  'hand-pompeDisel':     'Diesel',
  'hand-pompeLPG':       'LPG',
  'vr-hand-pompe95':     '95',
  'vr-hand-pompe95plus': '95+',
  'vr-hand-pompeDisel':  'Diesel',
  'vr-hand-pompeLPG':    'LPG',
};

AFRAME.registerComponent('car-refuel', {
  schema: {
    gauge:  { type: 'selector' },
    rate:   { type: 'number', default: 0.2 }, // fraction par seconde (5s pour remplir)
    radius: { type: 'number', default: 2.0 }  // distance max main ↔ voiture en VR
  },

  init: function () {
    this.filling = false;
    this._fuelFullEmitted = false;
    this.requiredFuelType = null;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.isInVR = false;
    this._posHand = new THREE.Vector3();
    this._posCar  = new THREE.Vector3();

    this._onFuelType = (e) => {
      this.requiredFuelType = e.detail.fuelType;
      this._fuelFullEmitted = false;
      if (this.data.gauge) {
        this.data.gauge.setAttribute('fuel-gauge', 'level', 0);
      }
    };
    this.el.sceneEl.addEventListener('car-fuel-type', this._onFuelType);

    this.el.addEventListener('mousedown', this.onMouseDown);
    // Sur la scène pour capturer le relâchement même si le curseur dérive hors de la voiture
    this.el.sceneEl.addEventListener('mouseup', this.onMouseUp);

    this._onCarTimeout = () => {
      this.filling = false;
      this._fuelFullEmitted = true;
      this._stopSound('pump');
    };
    this.el.sceneEl.addEventListener('car-timeout', this._onCarTimeout);

    this._onEnterVR = () => { this.isInVR = true; };
    this._onExitVR  = () => {
      this.isInVR = false;
      this.filling = false;
      this._stopSound('pump');
    };
    this.el.sceneEl.addEventListener('enter-vr', this._onEnterVR);
    this.el.sceneEl.addEventListener('exit-vr',  this._onExitVR);

    // Références VR
    this._handRightEl   = document.querySelector('#hand-right');
    this._colliderRight = document.querySelector('#hand-right-collider');

    this._onTriggerDown = () => {
      if (!this.isInVR) return;

      // Trouver la pompe VR tenue en main
      const vrPumps = document.querySelectorAll('[id^="vr-hand-pompe"]');
      let activePump = null;
      for (const p of vrPumps) {
        if (p.getAttribute('visible') === true) { activePump = p; break; }
      }
      if (!activePump) return;

      // Position de la main VR (collider = sphère attachée au contrôleur)
      const collider = this._colliderRight || this._handRightEl;
      if (!collider) return;
      collider.object3D.getWorldPosition(this._posHand);

      // Position de la voiture via la hitbox (ou l'entité elle-même en fallback)
      const hitbox = document.querySelector('#car-hitbox');
      if (hitbox) {
        hitbox.object3D.getWorldPosition(this._posCar);
      } else {
        this.el.object3D.getWorldPosition(this._posCar);
      }

      if (this._posHand.distanceTo(this._posCar) > this.data.radius) return;

      const heldType = PUMP_ID_TO_TYPE[activePump.id] || null;
      if (heldType === this.requiredFuelType) {
        this.filling = true;
        this._playSound('pump');
      } else {
        this._playSound('error');
      }
    };

    this._onTriggerUp = () => {
      if (!this.isInVR) return;
      this.filling = false;
      this._stopSound('pump');
    };

    if (this._handRightEl) {
      this._handRightEl.addEventListener('triggerdown', this._onTriggerDown);
      this._handRightEl.addEventListener('triggerup',   this._onTriggerUp);
    }
  },

  onMouseDown: function () {
    if (this.isInVR) return;
    const heldType = this._heldPumpType();
    if (heldType === null) return;

    if (heldType === this.requiredFuelType) {
      this.filling = true;
      this._playSound('pump');
    } else {
      this._playSound('error');
    }
  },

  onMouseUp: function () {
    if (this.isInVR) return;
    this.filling = false;
    this._stopSound('pump');
  },

  tick: function (time, delta) {
    if (!this.filling) return;

    const gauge = this.data.gauge;
    if (!gauge) return;

    const currentLevel = gauge.getAttribute('fuel-gauge').level;
    if (currentLevel >= 1) {
      this.filling = false;
      this._stopSound('pump');
      if (!this._fuelFullEmitted) {
        this._fuelFullEmitted = true;
        this.el.sceneEl.emit('fuel-full');
      }
      return;
    }

    const increment = this.data.rate * (delta / 1000);
    gauge.setAttribute('fuel-gauge', 'level', Math.min(1, currentLevel + increment));
  },

  _heldPumpType: function () {
    const allPumps = [
      ...document.querySelectorAll('[id^="hand-pompe"]'),
      ...document.querySelectorAll('[id^="vr-hand-pompe"]'),
    ];
    for (const p of allPumps) {
      if (p.getAttribute('visible') === true) {
        return PUMP_ID_TO_TYPE[p.id] || null;
      }
    }
    return null;
  },

  _playSound: function (name) {
    const el = this.el.sceneEl.querySelector('#snd-' + name);
    if (!el || !el.components.sound) return;
    el.components.sound.playSound();
  },

  _stopSound: function (name) {
    const el = this.el.sceneEl.querySelector('#snd-' + name);
    if (!el || !el.components.sound) return;
    el.components.sound.stopSound();
  },

  remove: function () {
    this.el.removeEventListener('mousedown', this.onMouseDown);
    this.el.sceneEl.removeEventListener('mouseup', this.onMouseUp);
    this.el.sceneEl.removeEventListener('car-fuel-type', this._onFuelType);
    this.el.sceneEl.removeEventListener('car-timeout', this._onCarTimeout);
    this.el.sceneEl.removeEventListener('enter-vr', this._onEnterVR);
    this.el.sceneEl.removeEventListener('exit-vr',  this._onExitVR);
    if (this._handRightEl) {
      this._handRightEl.removeEventListener('triggerdown', this._onTriggerDown);
      this._handRightEl.removeEventListener('triggerup',   this._onTriggerUp);
    }
  }
});
