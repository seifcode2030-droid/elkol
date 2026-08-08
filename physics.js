window.physicsUtils = {
  getGravityVisualPosition(value) {
    const normalized = Math.min(1, Math.max(0, value / 25));
    return { y: 20 + normalized * 60, x: 50 + Math.sin(normalized * Math.PI) * 18 };
  },

  calculateKineticEnergy(mass, velocity) {
    return 0.5 * mass * velocity * velocity;
  },

  calculatePotentialEnergy(mass, gravity, height) {
    return mass * gravity * height;
  },

  calculateThermalEnergy(mass, specificHeat, temperatureDelta) {
    return mass * specificHeat * temperatureDelta;
  },

  calculateElectricity(voltage, resistance, current) {
    const effectiveCurrent = Number(current) || (Number(voltage) / Number(resistance || 1));
    const effectiveVoltage = Number(voltage) || (Number(current) * Number(resistance || 1));
    const effectiveResistance = Number(resistance) || (Number(voltage) / Number(current || 1));
    const charge = effectiveCurrent * 10;
    return {
      voltage: effectiveVoltage,
      current: effectiveCurrent,
      resistance: effectiveResistance,
      charge
    };
  },

  getMagneticStrength(value) {
    return Number(value) / 100;
  }
};
