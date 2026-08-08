window.storageManager = {
  key: 'quantum-lab-pro-state',

  save(state) {
    localStorage.setItem(this.key, JSON.stringify(state));
    return true;
  },

  load() {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : null;
  },

  clear() {
    localStorage.removeItem(this.key);
  }
};
