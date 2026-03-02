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
    gauge: { type: 'selector' },
    rate: { type: 'number', default: 0.2 } // fraction par seconde (5s pour remplir)
  },

  init: function () {
    this.filling = false;
    this._fuelFullEmitted = false;
    this.requiredFuelType = null;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

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
  },

  onMouseDown: function () {
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
  }
});
