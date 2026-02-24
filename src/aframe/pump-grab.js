AFRAME.registerComponent('pump-grab', {
  schema: {
    handPump: { type: 'selector' }
  },

  init: function () {
    this.onClick = this.onClick.bind(this);
    this.el.addEventListener('click', this.onClick);
  },

  onClick: function () {
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
  },

  remove: function () {
    this.el.removeEventListener('click', this.onClick);
  }
});
