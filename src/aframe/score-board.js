const FUEL_PRICES = { '95': 80, '95+': 95, 'Diesel': 70, 'LPG': 60 };

AFRAME.registerComponent('score-board', {
  schema: {
    timerDuration: { type: 'number', default: 30000 }
  },

  init: function () {
    this.money      = 0;
    this.carCount   = 0;
    this.timerActive = false;
    this.timeLeft   = 0;
    this.currentFuel = null;

    this._buildPanel();

    // ── Listeners ──────────────────────────────────────────────────────────
    this._onFuelType = (e) => {
      this.currentFuel = e.detail.fuelType;
      this._setStatus('');
    };
    this._onCarAtPump = () => {
      this.timerActive = true;
      this.timeLeft    = this.data.timerDuration;
    };
    this._onFuelFull = () => {
      if (!this.timerActive) return;
      this.timerActive = false;
      const price = FUEL_PRICES[this.currentFuel] ?? 0;
      this.money    += price;
      this.carCount += 1;
      this._updateMoney();
      this._updateCarCount();
      this._setStatus(`+CHF ${price} !`);
    };

    this.el.sceneEl.addEventListener('car-fuel-type', this._onFuelType);
    this.el.sceneEl.addEventListener('car-at-pump',   this._onCarAtPump);
    this.el.sceneEl.addEventListener('fuel-full',     this._onFuelFull);
  },

  tick: function (time, delta) {
    if (!this.timerActive) return;

    this.timeLeft -= delta;
    if (this.timeLeft <= 0) {
      this.timeLeft    = 0;
      this.timerActive = false;
      this._updateTimer(0);
      this._setStatus('Raté !');
      this.el.sceneEl.emit('car-timeout');
      return;
    }
    this._updateTimer(this.timeLeft / this.data.timerDuration);
  },

  // ── Panel builder ─────────────────────────────────────────────────────────
  _buildPanel: function () {
    const el = this.el;

    // Background
    const bg = document.createElement('a-plane');
    bg.setAttribute('width',    '2.2');
    bg.setAttribute('height',   '1.2');
    bg.setAttribute('color',    '#000000');
    bg.setAttribute('material', 'shader: flat; opacity: 0.8; transparent: true');
    el.appendChild(bg);

    // Title
    const title = document.createElement('a-text');
    title.setAttribute('value',    'STATION SERVICE');
    title.setAttribute('align',    'center');
    title.setAttribute('color',    '#ffdd00');
    title.setAttribute('width',    '4');
    title.setAttribute('position', '0 0.48 0.001');
    el.appendChild(title);

    // Separator
    const sep = document.createElement('a-plane');
    sep.setAttribute('width',    '2.0');
    sep.setAttribute('height',   '0.01');
    sep.setAttribute('color',    '#555555');
    sep.setAttribute('material', 'shader: flat');
    sep.setAttribute('position', '0 0.36 0.001');
    el.appendChild(sep);

    // Money row
    const moneyLabel = document.createElement('a-text');
    moneyLabel.setAttribute('value',    'Argent:');
    moneyLabel.setAttribute('align',    'left');
    moneyLabel.setAttribute('color',    '#ffffff');
    moneyLabel.setAttribute('width',    '3');
    moneyLabel.setAttribute('position', '-0.9 0.22 0.001');
    el.appendChild(moneyLabel);

    this.moneyValue = document.createElement('a-text');
    this.moneyValue.setAttribute('value',    'CHF 0');
    this.moneyValue.setAttribute('align',    'right');
    this.moneyValue.setAttribute('color',    '#44ff88');
    this.moneyValue.setAttribute('width',    '3');
    this.moneyValue.setAttribute('position', '0.9 0.22 0.001');
    el.appendChild(this.moneyValue);

    // Cars row
    const carsLabel = document.createElement('a-text');
    carsLabel.setAttribute('value',    'Voitures:');
    carsLabel.setAttribute('align',    'left');
    carsLabel.setAttribute('color',    '#ffffff');
    carsLabel.setAttribute('width',    '3');
    carsLabel.setAttribute('position', '-0.9 0.05 0.001');
    el.appendChild(carsLabel);

    this.carsValue = document.createElement('a-text');
    this.carsValue.setAttribute('value',    '0');
    this.carsValue.setAttribute('align',    'right');
    this.carsValue.setAttribute('color',    '#ffffff');
    this.carsValue.setAttribute('width',    '3');
    this.carsValue.setAttribute('position', '0.9 0.05 0.001');
    el.appendChild(this.carsValue);

    // Timer label — ligne au-dessus de la barre
    const timerLabel = document.createElement('a-text');
    timerLabel.setAttribute('value',    'Temps:');
    timerLabel.setAttribute('align',    'left');
    timerLabel.setAttribute('color',    '#ffffff');
    timerLabel.setAttribute('width',    '3');
    timerLabel.setAttribute('position', '-0.9 -0.10 0.001');
    el.appendChild(timerLabel);

    // Timer bar background — une ligne plus bas
    const timerBg = document.createElement('a-plane');
    timerBg.setAttribute('width',    '2.0');
    timerBg.setAttribute('height',   '0.10');
    timerBg.setAttribute('color',    '#333333');
    timerBg.setAttribute('material', 'shader: flat');
    timerBg.setAttribute('position', '0 -0.26 0.001');
    el.appendChild(timerBg);

    // Timer fill container — pivot au bord gauche
    const timerFillContainer = document.createElement('a-entity');
    timerFillContainer.setAttribute('position', '-1.0 -0.26 0.002');
    el.appendChild(timerFillContainer);
    this.timerFillContainer = timerFillContainer;

    // Timer fill bar
    this.timerFill = document.createElement('a-plane');
    this.timerFill.setAttribute('width',    '2.0');
    this.timerFill.setAttribute('height',   '0.10');
    this.timerFill.setAttribute('color',    '#22cc55');
    this.timerFill.setAttribute('material', 'shader: flat');
    this.timerFill.setAttribute('position', '1.0 0 0');
    timerFillContainer.appendChild(this.timerFill);

    // Status text
    this.statusText = document.createElement('a-text');
    this.statusText.setAttribute('value',    '');
    this.statusText.setAttribute('align',    'center');
    this.statusText.setAttribute('color',    '#ffffff');
    this.statusText.setAttribute('width',    '4');
    this.statusText.setAttribute('position', '0 -0.48 0.001');
    el.appendChild(this.statusText);
  },

  // ── Helpers ───────────────────────────────────────────────────────────────
  _updateMoney: function () {
    this.moneyValue.setAttribute('value', `CHF ${this.money}`);
  },

  _updateCarCount: function () {
    this.carsValue.setAttribute('value', String(this.carCount));
  },

  _updateTimer: function (ratio) {
    if (!this.timerFillContainer) return;
    this.timerFillContainer.object3D.scale.x = Math.max(0, Math.min(1, ratio));

    // Color: green → yellow → red
    let r, g, b = 0;
    if (ratio >= 0.5) {
      // green (0,255,0) → yellow (255,255,0)
      const t = (1 - ratio) * 2; // 0 at ratio=1, 1 at ratio=0.5
      r = Math.round(t * 255);
      g = 255;
    } else {
      // yellow (255,255,0) → red (255,0,0)
      const t = ratio * 2; // 1 at ratio=0.5, 0 at ratio=0
      r = 255;
      g = Math.round(t * 255);
    }
    const hex = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + '00';
    this.timerFill.setAttribute('color', hex);
  },

  _setStatus: function (msg) {
    if (!this.statusText) return;
    this.statusText.setAttribute('value', msg);
    const isGood = msg.startsWith('+');
    this.statusText.setAttribute('color', isGood ? '#44ff88' : '#ff4444');
  },

  remove: function () {
    this.el.sceneEl.removeEventListener('car-fuel-type', this._onFuelType);
    this.el.sceneEl.removeEventListener('car-at-pump',   this._onCarAtPump);
    this.el.sceneEl.removeEventListener('fuel-full',     this._onFuelFull);
  }
});
