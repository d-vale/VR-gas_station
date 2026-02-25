AFRAME.registerComponent('look-at', {
  schema: {
    target: {type: 'selector', default: '[camera]'},
    enabled: {type: 'boolean', default: true},
    yOnly: {type: 'boolean', default: false},
  },
  init: function () {
    this.targetWorldPos = new THREE.Vector3();
    this.myWorldPos = new THREE.Vector3();
    this.originalRotation = [this.el.object3D.rotation.x, this.el.object3D.rotation.y, this.el.object3D.rotation.z];
  },
  update: function () {
    if (this.data.enabled) return;
    this.el.object3D.rotation.x = this.originalRotation[0];
    this.el.object3D.rotation.y = this.originalRotation[1];
    this.el.object3D.rotation.z = this.originalRotation[2];
  },
  tick: function () {
    if (!this.data.enabled) return;
    const camera = this.el.sceneEl.camera;
    if (!camera) return;
    camera.getWorldPosition(this.targetWorldPos);
    this.el.object3D.getWorldPosition(this.myWorldPos);
    if (this.data.yOnly) {
      // Rotation Y uniquement : le panel reste vertical
      const dx = this.targetWorldPos.x - this.myWorldPos.x;
      const dz = this.targetWorldPos.z - this.myWorldPos.z;
      this.el.object3D.rotation.set(0, Math.atan2(dx, dz), 0);
    } else {
      this.el.object3D.lookAt(this.targetWorldPos);
    }
  }
});