AFRAME.registerComponent('hide-nodes', {
  schema: { names: { type: 'string' } },
  init() {
    this.el.addEventListener('model-loaded', () => {
      const model = this.el.getObject3D('mesh');
      if (!model) return;

      this.data.names.split(',').forEach(name => {
        const node = model.getObjectByName(name.trim());
        if (node) node.visible = false;
      });
    });
  }
});
