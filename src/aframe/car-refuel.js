AFRAME.registerComponent('car-refuel', {
  schema: {
    gauge: { type: 'selector' },
    rate: { type: 'number', default: 0.2 } // fraction par seconde (5s pour remplir)
  },

  init: function () {
    this.filling = false;
    this._fuelFullEmitted = false;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.el.addEventListener('mousedown', this.onMouseDown);
    // Sur la scène pour capturer le relâchement même si le curseur dérive hors de la voiture
    this.el.sceneEl.addEventListener('mouseup', this.onMouseUp);
  },

  onMouseDown: function () {
    if (!this._isPumpHeld()) return;
    this.filling = true;
  },

  onMouseUp: function () {
    this.filling = false;
  },

  tick: function (time, delta) {
    if (!this.filling) return;

    const gauge = this.data.gauge;
    if (!gauge) return;

    const currentLevel = gauge.getAttribute('fuel-gauge').level;
    if (currentLevel >= 1) {
      this.filling = false;
      if (!this._fuelFullEmitted) {
        this._fuelFullEmitted = true;
        this.el.sceneEl.emit('fuel-full');
      }
      return;
    }

    const increment = this.data.rate * (delta / 1000);
    gauge.setAttribute('fuel-gauge', 'level', Math.min(1, currentLevel + increment));
  },

  _isPumpHeld: function () {
    const heldPumps = document.querySelectorAll('[id^="hand-pompe"]');
    for (const p of heldPumps) {
      if (p.getAttribute('visible') === true) return true;
    }
    return false;
  },

  remove: function () {
    this.el.removeEventListener('mousedown', this.onMouseDown);
    this.el.sceneEl.removeEventListener('mouseup', this.onMouseUp);
  }
});
