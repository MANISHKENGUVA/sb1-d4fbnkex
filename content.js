function analyzeVuePage() {
  const components = [];
  let hasVuex = false;

  // Find Vue 2 root instance
  const rootElements = document.querySelectorAll('*');
  const vueRootElement = Array.from(rootElements).find(el => el.__vue__);
  
  if (!vueRootElement) return { components: [], hasVuex: false };

  function inspectVueInstance(instance) {
    // Get component name
    const name = instance.$options.name || instance.$options._componentTag;
    if (name) {
      components.push(name);
    }

    // Check for Vuex
    if (instance.$store) {
      hasVuex = true;
    }

    // Inspect child components
    if (instance.$children && instance.$children.length) {
      instance.$children.forEach(child => inspectVueInstance(child));
    }
  }

  // Start inspection from root Vue instance
  const rootVue = vueRootElement.__vue__;
  inspectVueInstance(rootVue);

  return {
    components: Array.from(new Set(components)), // Remove duplicates
    hasVuex
  };
}