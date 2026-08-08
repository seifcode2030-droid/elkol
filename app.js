const appState = {
  protons: 0,
  neutrons: 0,
  electrons: 0,
  selectedElement: null,
  gravity: 9.8,
  magneticStrength: 55,
  currentBond: 'ionic',
  currentMolecule: 'H2O',
  stats: {
    atoms: 0,
    molecules: 0,
    reactions: 0,
    explosions: 0,
    energy: 0
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function updateAtomCounts() {
  $('#protonCount').textContent = appState.protons;
  $('#neutronCount').textContent = appState.neutrons;
  $('#electronCount').textContent = appState.electrons;
  document.getElementById('systemStatus').textContent = getStabilitySummary();
  refreshStability();
  renderAtom();
}

function getElementFromAtom() {
  const atomicNumber = appState.protons;
  return getElementByAtomicNumber(atomicNumber) || null;
}

function getStabilitySummary() {
  const ratio = appState.neutrons / Math.max(appState.protons, 1);
  const total = appState.protons + appState.neutrons;
  if (total === 0) return 'الذرة غير منشأة';
  if (ratio >= 1.1 && ratio <= 1.5 && appState.electrons <= appState.protons + 1) return 'النظام مستقر';
  if (ratio > 1.6 || appState.electrons > appState.protons + 2) return 'الذرة غير مستقرة';
  return 'التوازن متوسط';
}

function refreshStability() {
  const total = appState.protons + appState.neutrons;
  const stability = total === 0 ? 0 : Math.min(100, Math.max(0, 100 - Math.abs(appState.neutrons - appState.protons) * 15 - Math.abs(appState.electrons - appState.protons) * 12));
  const bar = $('#stabilityBar');
  bar.style.width = `${stability}%`;
  const label = $('#stabilityLabel');
  if (stability >= 70) {
    bar.style.background = 'linear-gradient(90deg, var(--green), #7ef0b4)';
    label.textContent = 'مستقر';
    label.style.color = 'var(--green)';
  } else if (stability >= 40) {
    bar.style.background = 'linear-gradient(90deg, var(--yellow), #ffe8a3)';
    label.textContent = 'متوازن';
    label.style.color = 'var(--yellow)';
  } else {
    bar.style.background = 'linear-gradient(90deg, var(--red), #ff9d9d)';
    label.textContent = 'غير مستقر';
    label.style.color = 'var(--red)';
  }
  if (stability < 30 && total > 0) {
    triggerNuclearExplosion();
  }
}

function renderAtom() {
  const orbitLayer = $('#orbitLayer');
  orbitLayer.innerHTML = '';
  const radiusSet = [90, 130, 170, 210];
  const maxElectrons = Math.max(1, appState.electrons);
  const orbitCount = Math.min(4, Math.ceil(Math.sqrt(maxElectrons)));

  for (let i = 0; i < orbitCount; i++) {
    const ring = document.createElement('div');
    ring.className = 'orbit-ring';
    ring.style.setProperty('--orbit-size', `${radiusSet[i]}px`);
    ring.style.setProperty('--spin-speed', `${8 + i * 3}s`);
    orbitLayer.appendChild(ring);

    const electronCount = Math.min(12, Math.max(1, Math.ceil(appState.electrons / (i + 1))));
    for (let j = 0; j < electronCount; j++) {
      const electron = document.createElement('div');
      electron.className = 'electron';
      const angle = (360 / electronCount) * j + i * 45;
      const radius = radiusSet[i] / 2;
      electron.style.setProperty('--angle', `${angle}deg`);
      electron.style.setProperty('--radius', `${radius}px`);
      electron.style.setProperty('--electron-color', i % 2 === 0 ? '#5ae5ff' : '#9e7cff');
      electron.style.animation = `orbitSpin ${7 + i * 2}s linear infinite`;
      electron.style.animationDelay = `${j * 0.2}s`;
      orbitLayer.appendChild(electron);
    }
  }

  const element = getElementFromAtom();
  if (element) {
    appState.selectedElement = element;
    updateSelectedElementPanel(element);
    $('#selectedElementName').textContent = element.name;
    $('#selectedElementSymbol').textContent = element.symbol;
    $('#selectedAtomicNumber').textContent = element.atomicNumber;
    $('#selectedAtomicMass').textContent = element.mass.toFixed(2);
    $('#selectedCategory').textContent = element.category;
    $('#selectedState').textContent = element.state;
    $('#selectedElectronegativity').textContent = element.electronegativity || '—';
    $('#selectedElementDetails').innerHTML = `
      <div class="feature"><span>الاسم</span><strong>${element.name}</strong></div>
      <div class="feature"><span>الرمز</span><strong>${element.symbol}</strong></div>
      <div class="feature"><span>العدد الذري</span><strong>${element.atomicNumber}</strong></div>
      <div class="feature"><span>الكتلة الذرية</span><strong>${element.mass}</strong></div>
      <div class="feature"><span>الفئة</span><strong>${element.category}</strong></div>
      <div class="feature"><span>الحالة</span><strong>${element.state}</strong></div>
      <div class="feature"><span>السالبية</span><strong>${element.electronegativity}</strong></div>
    `;
  } else {
    $('#selectedElementName').textContent = '---';
    $('#selectedElementSymbol').textContent = '--';
    $('#selectedAtomicNumber').textContent = '0';
    $('#selectedAtomicMass').textContent = '0';
    $('#selectedCategory').textContent = '-';
    $('#selectedState').textContent = '-';
    $('#selectedElectronegativity').textContent = '-';
    $('#selectedElementDetails').innerHTML = '<p>اختر عنصرًا من الجدول الدوري لعرض بياناته.</p>';
  }
}

function renderPeriodicTable() {
  const table = $('#periodicTable');
  table.innerHTML = '';
  const fragment = document.createDocumentFragment();
  ELEMENTS.forEach((element) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'element-card';
    if (appState.selectedElement && appState.selectedElement.atomicNumber === element.atomicNumber) {
      button.classList.add('selected');
    }
    button.innerHTML = `<span class="num">${element.atomicNumber}</span><span class="symbol">${element.symbol}</span><span class="name">${element.name.split(' ')[0]}</span>`;
    button.title = element.name;
    button.addEventListener('click', () => {
      appState.selectedElement = element;
      appState.protons = element.atomicNumber;
      appState.electrons = element.atomicNumber;
      appState.neutrons = Math.max(0, Math.round(element.mass) - element.atomicNumber);
      updateAtomCounts();
      renderPeriodicTable();
      highlightSelection();
      if (appState.stats.atoms === 0) unlockAchievement('first-atom');
      appState.stats.atoms += 1;
      updateStats();
    });
    fragment.appendChild(button);
  });
  table.appendChild(fragment);
}

function highlightSelection() {
  const cards = $$('.element-card');
  cards.forEach((card) => {
    const isSelected = appState.selectedElement && Number(card.querySelector('.num').textContent) === appState.selectedElement.atomicNumber;
    card.classList.toggle('selected', isSelected);
  });
}

function updateSelectedElementPanel(element) {
  $('#selectedElementDetails').innerHTML = `
    <div class="feature"><span>الاسم</span><strong>${element.name}</strong></div>
    <div class="feature"><span>الرمز</span><strong>${element.symbol}</strong></div>
    <div class="feature"><span>العدد الذري</span><strong>${element.atomicNumber}</strong></div>
    <div class="feature"><span>الكتلة الذرية</span><strong>${element.mass}</strong></div>
    <div class="feature"><span>الفئة</span><strong>${element.category}</strong></div>
    <div class="feature"><span>الحالة</span><strong>${element.state}</strong></div>
    <div class="feature"><span>السالبية</span><strong>${element.electronegativity}</strong></div>
    <div class="feature"><span>عدد الروابط</span><strong>${element.bonds}</strong></div>
  `;
}

function triggerNuclearExplosion() {
  const atomViewport = $('#atomViewport');
  const shockwave = $('#shockwave');
  const cloud = $('#mushroomCloud');
  if (!atomViewport || !shockwave || !cloud) return;

  document.body.classList.add('nuclear-shake');
  shockwave.classList.remove('active');
  void shockwave.offsetWidth;
  shockwave.classList.add('active');

  cloud.classList.remove('active');
  void cloud.offsetWidth;
  cloud.classList.add('active');

  soundSystem.playExplosion();
  appState.stats.explosions += 1;
  appState.stats.energy += 2500 + appState.protons * 30 + appState.neutrons * 25;
  updateStats();
  unlockAchievement('first-explosion');
  setTimeout(() => document.body.classList.remove('nuclear-shake'), 700);
}

function updateStats() {
  $('#statsAtoms').textContent = appState.stats.atoms;
  $('#statsMolecules').textContent = appState.stats.molecules;
  $('#statsReactions').textContent = appState.stats.reactions;
  $('#statsExplosions').textContent = appState.stats.explosions;
  $('#statsEnergy').textContent = `${appState.stats.energy} J`;
}

function unlockAchievement(id) {
  achievementSystem.unlock(id);
  achievementSystem.render($('#achievementsList'));
}

function renderAchievements() {
  achievementSystem.render($('#achievementsList'));
}

function updatePhysicsUI() {
  const gravity = Number($('#gravityRange').value);
  appState.gravity = gravity;
  $('#gravityValue').textContent = `${gravity.toFixed(1)} m/s²`;
  const orbiter = $('.gravity-orbiter') || document.createElement('div');
  orbiter.className = 'gravity-orbiter';
  orbiter.style.left = `${50 + Math.sin((gravity / 25) * Math.PI) * 18}%`;
  orbiter.style.top = `${20 + (gravity / 25) * 60}%`;
  $('#gravityVisualization').appendChild(orbiter);

  const kinetic = physicsUtils.calculateKineticEnergy(2, gravity / 3);
  const potential = physicsUtils.calculatePotentialEnergy(2, gravity, 8);
  const thermal = physicsUtils.calculateThermalEnergy(3, 0.6, gravity / 2);

  $('#kineticEnergy').textContent = `${kinetic.toFixed(1)} J`;
  $('#potentialEnergy').textContent = `${potential.toFixed(1)} J`;
  $('#thermalEnergy').textContent = `${thermal.toFixed(1)} J`;

  const magneticStrength = Number($('#magnetRange').value);
  appState.magneticStrength = magneticStrength;
  $('#magnetValue').textContent = `${magneticStrength}%`;
  const field = $('#magneticField');
  field.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const line = document.createElement('div');
    line.className = 'field-line';
    line.style.setProperty('--angle', `${i * 18}deg`);
    line.style.opacity = 0.25 + i * 0.06;
    field.appendChild(line);
  }

  if (Number($('#gravityRange').value) > 15) {
    unlockAchievement('physics-master');
  }
}

function updateMoleculeScene() {
  const scene = $('#moleculeScene');
  const template = chemistryUtils.moleculeTemplates[appState.currentMolecule];
  if (!template || !scene) return;

  scene.innerHTML = '';
  const object = document.createElement('div');
  object.className = 'molecule-object';

  template.atoms.forEach((atom) => {
    const element = document.createElement('div');
    element.className = 'molecule-atom';
    element.textContent = atom.symbol;
    element.style.background = `radial-gradient(circle at 30% 30%, white, ${atom.color} 55%, rgba(9,16,27,0.8) 100%)`;
    element.style.left = `${atom.x}px`;
    element.style.top = `${atom.y}px`;
    object.appendChild(element);
  });

  template.bonds.forEach((bond) => {
    const from = template.atoms[bond.from];
    const to = template.atoms[bond.to];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const line = document.createElement('div');
    line.className = 'molecule-bond';
    line.style.width = `${length}px`;
    line.style.left = `${from.x + 20}px`;
    line.style.top = `${from.y + 20}px`;
    line.style.transform = `rotate(${angle}deg)`;
    object.appendChild(line);
  });

  scene.appendChild(object);
}

function renderExperimentLog(text) {
  $('#experimentLog').innerHTML = text;
}

function bindEvents() {
  document.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'inc-protons') appState.protons = Math.min(118, appState.protons + 1);
      if (action === 'dec-protons') appState.protons = Math.max(0, appState.protons - 1);
      if (action === 'inc-neutrons') appState.neutrons += 1;
      if (action === 'dec-neutrons') appState.neutrons = Math.max(0, appState.neutrons - 1);
      if (action === 'inc-electrons') appState.electrons += 1;
      if (action === 'dec-electrons') appState.electrons = Math.max(0, appState.electrons - 1);
      if (appState.protons > 0 && appState.electrons === 0) appState.electrons = appState.protons;
      if (appState.protons > 0 && appState.electrons > appState.protons + 3) appState.electrons = appState.protons;
      if (appState.protons > 0) appState.selectedElement = getElementByAtomicNumber(appState.protons) || null;
      updateAtomCounts();
      if (appState.protons > 0) {
        unlockAchievement('first-atom');
      }
    });
  });

  $('#autoDistributeBtn').addEventListener('click', () => {
    if (!appState.protons) return;
    appState.electrons = appState.protons;
    updateAtomCounts();
    renderPeriodicTable();
  });

  $('#resetAtomBtn').addEventListener('click', () => {
    appState.protons = 0;
    appState.neutrons = 0;
    appState.electrons = 0;
    appState.selectedElement = null;
    updateAtomCounts();
  });

  $('.tab-btn') && $$('.tab-btn').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.tab-btn').forEach((t) => t.classList.toggle('active', t === tab));
      $$('.tab-panel').forEach((panel) => panel.classList.toggle('active', panel.id === tab.dataset.target));
    });
  });

  $('#themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('theme-light');
    document.body.classList.toggle('theme-dark');
    $('#themeToggle').textContent = document.body.classList.contains('theme-light') ? '🌙' : '☀️';
  });

  $('#elementSearch').addEventListener('input', (event) => {
    const value = event.target.value.trim().toLowerCase();
    const filtered = ELEMENTS.filter((element) => element.name.toLowerCase().includes(value) || element.symbol.toLowerCase().includes(value));
    const table = $('#periodicTable');
    table.innerHTML = '';
    filtered.slice(0, 36).forEach((element) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'element-card';
      if (appState.selectedElement && appState.selectedElement.atomicNumber === element.atomicNumber) button.classList.add('selected');
      button.innerHTML = `<span class="num">${element.atomicNumber}</span><span class="symbol">${element.symbol}</span><span class="name">${element.name.split(' ')[0]}</span>`;
      button.addEventListener('click', () => {
        appState.selectedElement = element;
        appState.protons = element.atomicNumber;
        appState.electrons = element.atomicNumber;
        appState.neutrons = Math.max(0, Math.round(element.mass) - element.atomicNumber);
        updateAtomCounts();
        renderPeriodicTable();
      });
      table.appendChild(button);
    });
  });

  $('#gravityRange').addEventListener('input', updatePhysicsUI);
  $('#magnetRange').addEventListener('input', updatePhysicsUI);
  $('#calculateElectricityBtn').addEventListener('click', () => {
    const voltage = Number($('#voltageInput').value || 0);
    const resistance = Number($('#resistanceInput').value || 0);
    const current = Number($('#currentInput').value || 0);
    const result = physicsUtils.calculateElectricity(voltage, resistance, current);
    $('#electricityResult').textContent = `الشحنة: ${result.charge.toFixed(2)} C | الجهد: ${result.voltage.toFixed(2)} V | التيار: ${result.current.toFixed(2)} A`;
  });

  document.querySelectorAll('.bond-btn').forEach((button) => {
    button.addEventListener('click', () => {
      appState.currentBond = button.dataset.bond;
      document.querySelectorAll('.bond-btn').forEach((btn) => btn.classList.toggle('active', btn === button));
      $('#bondInfo').textContent = chemistryUtils.bondTypes[appState.currentBond] || 'نوع ربط جديد.';
    });
  });

  document.querySelectorAll('.molecule-btn').forEach((button) => {
    button.addEventListener('click', () => {
      appState.currentMolecule = button.dataset.molecule;
      document.querySelectorAll('.molecule-btn').forEach((btn) => btn.classList.toggle('active', btn === button));
      updateMoleculeScene();
      unlockAchievement('first-molecule');
      appState.stats.molecules += 1;
      updateStats();
    });
  });

  $('#runReactionBtn').addEventListener('click', () => {
    const selected = $('#reactionSelect').value;
    appState.stats.reactions += 1;
    updateStats();
    unlockAchievement('first-reaction');
    if (appState.stats.reactions >= 3) unlockAchievement('chemistry-master');
    soundSystem.playReaction();
    $('#reactionResult').textContent = chemistryUtils.getReactionText(selected);
  });

  document.querySelectorAll('.experiment-card').forEach((card) => {
    card.addEventListener('click', () => {
      const experiment = card.dataset.experiment;
      const message = chemistryUtils.getReactionText(experiment);
      renderExperimentLog(`تجربة ${card.textContent.replace(/\s+/g, ' ')}<br>${message}`);
      soundSystem.playReaction();
      appState.stats.reactions += 1;
      updateStats();
      unlockAchievement('first-reaction');
    });
  });

  $('#askAiBtn').addEventListener('click', () => handleAiPrompt());
  $('#aiInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleAiPrompt();
  });

  document.querySelectorAll('.ai-preset').forEach((button) => {
    button.addEventListener('click', () => {
      $('#aiInput').value = button.dataset.prompt;
      handleAiPrompt();
    });
  });

  $('#saveStateBtn').addEventListener('click', () => {
    const state = {
      atom: { protons: appState.protons, neutrons: appState.neutrons, electrons: appState.electrons },
      stats: appState.stats,
      gravity: appState.gravity,
      currentMolecule: appState.currentMolecule
    };
    storageManager.save(state);
    $('#storageStatus').textContent = 'تم حفظ الحالة بنجاح في LocalStorage.';
  });

  $('#loadStateBtn').addEventListener('click', () => {
    const state = storageManager.load();
    if (!state) {
      $('#storageStatus').textContent = 'لا توجد بيانات محفوظة لتحميلها.';
      return;
    }
    appState.protons = state.atom?.protons || 0;
    appState.neutrons = state.atom?.neutrons || 0;
    appState.electrons = state.atom?.electrons || 0;
    appState.stats = state.stats || appState.stats;
    appState.gravity = state.gravity || 9.8;
    appState.currentMolecule = state.currentMolecule || 'H2O';
    $('#gravityRange').value = appState.gravity;
    updateAtomCounts();
    updatePhysicsUI();
    updateMoleculeScene();
    $('#storageStatus').textContent = 'تم تحميل الحالة بنجاح.';
  });

  $('#clearStateBtn').addEventListener('click', () => {
    storageManager.clear();
    $('#storageStatus').textContent = 'تم محو التخزين المحلي بنجاح.';
  });
}

function handleAiPrompt() {
  const input = $('#aiInput');
  const prompt = input.value.trim();
  const chat = $('#aiChat');
  if (!prompt) return;

  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = prompt;
  chat.appendChild(userBubble);

  let answer = 'هذا سؤال علمي مثير. أستطيع شرح العنصر أو التفاعل أو استقرار الذرة.';
  const item = getElementByAtomicNumber(appState.protons);

  if (/عنصر|element|ذرة/i.test(prompt)) {
    answer = item
      ? `العنصر الحالي هو ${item.name} (${item.symbol})، ويمتلك عددًا ذريًا ${item.atomicNumber}. وهو من فئة ${item.category}، ويبلغ الكتلة الذرية ${item.mass}.`
      : 'لا توجد ذرة منشأة حاليًا. أضف بروتونات أو اختر عنصرًا من الجدول الدوري.';
  } else if (/تفاعل|رد فعل|reaction/i.test(prompt)) {
    answer = chemistryUtils.getReactionText(appState.currentMolecule || 'H2O');
  } else if (/استقرار|غير مستقرة|stable|unstable/i.test(prompt)) {
    const total = appState.protons + appState.neutrons;
    answer = total === 0
      ? 'الذرة غير منشأة ولذلك لا يمكن تقييم الاستقرار.'
      : `استقرار الذرة يعتمد على نسبة النيوترونات إلى البروتونات، والنسبة الحالية هي ${(appState.neutrons / Math.max(appState.protons, 1)).toFixed(2)}. إذا كانت النسبة أعلى من المدى المفضل فإنها تصبح غير مستقرة.`;
  }

  const aiBubble = document.createElement('div');
  aiBubble.className = 'chat-bubble ai';
  aiBubble.textContent = answer;
  chat.appendChild(aiBubble);
  chat.scrollTop = chat.scrollHeight;
  input.value = '';
}

function initializeApp() {
  renderPeriodicTable();
  updateAtomCounts();
  updatePhysicsUI();
  updateMoleculeScene();
  renderAchievements();
  bindEvents();
  $('#selectedElementName').textContent = '---';
  $('#selectedElementSymbol').textContent = '--';
  $('#gravityRange').value = appState.gravity;
  $('#magnetRange').value = appState.magneticStrength;
  $('#reactionSelect').value = 'H2O';
  $('#aiChat').innerHTML = '<div class="chat-bubble ai">مرحبًا بك في مختبر Quantum Lab Pro. اسألني عن أي عنصر، تفاعل أو استقرار نووي.</div>';
}

window.addEventListener('DOMContentLoaded', initializeApp);
