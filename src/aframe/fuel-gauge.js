AFRAME.registerComponent('fuel-gauge', {
  schema: {
    level: { type: 'number', default: 0 }
  },

  init: function () {
    // Background plane
    const bg = document.createElement('a-plane');
    bg.setAttribute('width', '1.0');
    bg.setAttribute('height', '0.15');
    bg.setAttribute('color', '#000000');
    bg.setAttribute('material', 'shader: flat; opacity: 0.85; transparent: true');
    this.el.appendChild(bg);

    // Fill container — pivot at left edge
    const fillContainer = document.createElement('a-entity');
    fillContainer.setAttribute('position', '-0.45 0 0.002');
    this.el.appendChild(fillContainer);
    this.fillContainer = fillContainer;

    // Fill bar inside the container
    const fill = document.createElement('a-plane');
    fill.setAttribute('width', '0.9');
    fill.setAttribute('height', '0.10');
    fill.setAttribute('color', '#22cc55');
    fill.setAttribute('material', 'shader: flat');
    fill.setAttribute('position', '0.45 0 0');
    fillContainer.appendChild(fill);

    // Label
    const label = document.createElement('a-text');
    label.setAttribute('value', 'Carburant');
    label.setAttribute('align', 'center');
    label.setAttribute('position', '0 0.135 0.001');
    label.setAttribute('color', '#ffffff');
    label.setAttribute('width', '2');
    this.el.appendChild(label);

    this._applyLevel(this.data.level);
  },

  update: function (oldData) {
    if (oldData.level !== this.data.level) {
      this._applyLevel(this.data.level);
    }
  },

  _applyLevel: function (level) {
    if (!this.fillContainer) return;
    this.fillContainer.object3D.scale.x = Math.max(0, Math.min(1, level));
  }
});
