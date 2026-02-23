import { randomHsl } from '../utils/color';

function getRandomHeight(max, min) {
  return Math.random() * (max - min) + min;
};

AFRAME.registerComponent('floor', {
  schema: {
    position: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
    width: { type: 'number', default: '10' },
    depth: { type: 'number', default: '10' },
    gap: { type: 'number', default: '0.05' },
  },

  init: function () {
    const el = this.el;
    const width = this.data.width;
    const depth = this.data.depth;
    const gap = this.data.gap;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < depth; j++) {
        const box = document.createElement('a-box');
        if (j % 2 == 0 && i % 2 == 0 || j % 2 == 1 && i % 2 == 1) {
          box.setAttribute('color', "#ff08e6");
        } else {
          box.setAttribute('color', "#ffb0f7");
        }
        box.setAttribute('position', `${i * (1 + gap)} ${getRandomHeight(0.4, 0.2)} ${j * (1 + gap)}`);
        el.appendChild(box);
      }
    }
  },

  remove: function () {

  }

});