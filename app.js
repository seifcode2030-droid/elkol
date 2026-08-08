/* =========================================
   CHEM LAB PRO - COMPLETE APPLICATION
   Futuristic Chemistry Laboratory
   ========================================= */

'use strict';

/* =========================================
   STATE
   ========================================= */

const state = {
    database: null,
    beakerA: [],
    beakerB: [],
    currentBeaker: null,
    currentReaction: null,
    selectedTool: null,
    catalystLevel: 0,
    temperature: 25,
    electricityOn: false,
    isReacting: false,
    activeEffects: new Set(),
};

/* =========================================
   DOM REFERENCES
   ========================================= */

const $ = (id) => document.getElementById(id);

const els = {
    beakerA: $('beakerA'),
    beakerB: $('beakerB'),
    resultBeaker: $('resultBeaker'),
    contentA: $('contentA'),
    contentB: $('contentB'),
    resultContent: $('resultContent'),
    mixBtn: $('mixBtn'),
    resetBtn: $('resetBtn'),
    cleanBtn: $('cleanBtn'),
    noteBtn: $('noteBtn'),
    eduBtn: $('eduBtn'),
    notesModal: $('notesModal'),
    notesArea: $('notesArea'),
    closeNotes: $('closeNotes'),
    clearNotes: $('clearNotes'),
    eduModal: $('eduModal'),
    eduContent: $('eduContent'),
    closeEdu: $('closeEdu'),
    materialPicker: $('materialPicker'),
    pickerMaterials: $('pickerMaterials'),
    pickerSearch: $('pickerSearch'),
    closePicker: $('closePicker'),
    materialInfoModal: $('materialInfoModal'),
    materialInfoContent: $('materialInfoContent'),
    materialInfoTitle: $('materialInfoTitle'),
    closeMaterialInfo: $('closeMaterialInfo'),
    materialsContainer: $('materialsContainer'),
    materialSearch: $('materialSearch'),
    equationText: $('equationText'),
    reactionType: $('reactionType'),
    resultName: $('resultName'),
    resultFormula: $('resultFormula'),
    energyInfo: $('energyInfo'),
    speedFill: $('speedFill'),
    speedValue: $('speedValue'),
    yieldValue: $('yieldValue'),
    reactionDescription: $('reactionDescription'),
    reactionStatus: $('reactionStatus'),
    tempValue: $('tempValue'),
    electricValue: $('electricValue'),
    catalystValue: $('catalystValue'),
    tempStatus: $('tempStatus'),
    electricStatus: $('electricStatus'),
    catalystStatus: $('catalystStatus'),
    loadingScreen: $('loadingScreen'),
    toastContainer: $('toastContainer'),
    bgCanvas: $('bgCanvas'),
};

/* =========================================
   STATE LABELS
   ========================================= */

const STATE_LABELS = {
    solid: 'صلب',
    liquid: 'سائل',
    gas: 'غاز',
};

const TYPE_LABELS = {
    element: 'عنصر',
    acid: 'حمض',
    base: 'قاعدة',
    salt: 'ملح',
    liquid: 'سائل',
    gas: 'غاز',
    compound: 'مركب',
};

/* =========================================
   PRECIPITATE COLOR MAP
   ========================================= */

const PRECIPITATE_COLORS = {
    'أبيض': '#f0f0f0',
    'أصفر': '#ffd700',
    'أزرق فاتح': '#87ceeb',
    'أحمر بني': '#a0522d',
    'فضي لامع': '#c0c0c0',
    'رمادي': '#808080',
    'بني': '#8b4513',
};

/* =========================================
   SOUND ENGINE (Web Audio API)
   ========================================= */

const SoundEngine = {
    ctx: null,
    enabled: true,

    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            this.enabled = false;
        }
    },

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    tone(freq, duration, type = 'sine', volume = 0.3, delay = 0) {
        if (!this.ctx || !this.enabled) return;
        const t = this.ctx.currentTime + delay;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(volume, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + duration + 0.05);
    },

    noise(duration, volume = 0.2, filterFreq = 1000) {
        if (!this.ctx || !this.enabled) return;
        const t = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
        }
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = filterFreq;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        source.start(t);
    },

    bubble() {
        this.tone(300 + Math.random() * 200, 0.08, 'sine', 0.15);
        this.tone(500 + Math.random() * 300, 0.06, 'triangle', 0.1, 0.05);
    },

    heat() {
        this.noise(0.8, 0.15, 800);
        this.tone(200, 0.5, 'sawtooth', 0.08);
    },

    electric() {
        this.tone(1200, 0.1, 'square', 0.2);
        this.tone(800, 0.15, 'square', 0.15, 0.1);
        this.tone(1500, 0.08, 'square', 0.2, 0.2);
        this.noise(0.3, 0.1, 3000);
    },

    reaction() {
        this.tone(400, 0.3, 'sine', 0.25);
        this.tone(600, 0.3, 'sine', 0.2, 0.15);
        this.tone(800, 0.4, 'sine', 0.15, 0.3);
        this.noise(0.5, 0.1, 1500);
    },

    explosion() {
        this.noise(0.8, 0.4, 500);
        this.tone(100, 0.6, 'sawtooth', 0.3);
        this.tone(60, 0.8, 'square', 0.2, 0.1);
    },

    pop() {
        this.tone(800, 0.05, 'triangle', 0.2);
    },

    click() {
        this.tone(600, 0.05, 'sine', 0.1);
    },

    success() {
        this.tone(523, 0.15, 'sine', 0.2);
        this.tone(659, 0.15, 'sine', 0.2, 0.12);
        this.tone(784, 0.3, 'sine', 0.2, 0.24);
    },

    error() {
        this.tone(300, 0.2, 'sawtooth', 0.15);
        this.tone(200, 0.3, 'sawtooth', 0.15, 0.15);
    },
};

/* =========================================
   TOAST SYSTEM
   ========================================= */

function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    els.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('out');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

/* =========================================
   BACKGROUND CANVAS
   ========================================= */

const BgParticles = {
    particles: [],
    init() {
        const canvas = els.bgCanvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const count = Math.min(80, Math.floor(window.innerWidth / 20));
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                color: ['#00e5ff', '#a855f7', '#00ff88'][Math.floor(Math.random() * 3)],
                alpha: Math.random() * 0.5 + 0.1,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();

                // Connection lines
                this.particles.forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = 0.05 * (1 - dist / 100);
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            ctx.globalAlpha = 1;
            requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    },
};

/* =========================================
   DATABASE LOADING
   ========================================= */

async function loadDatabase() {
    try {
        const response = await fetch('reactions.json');
        if (!response.ok) throw new Error('HTTP ' + response.status);
        state.database = await response.json();
        console.log('✅ Database loaded:', state.database.items.length, 'materials,', state.database.reactions.length, 'reactions');
        return true;
    } catch (error) {
        console.error('❌ Failed to load reactions.json:', error);
        showToast('فشل تحميل قاعدة البيانات!', 'error', 5000);
        return false;
    }
}

/* =========================================
   MATERIALS PANEL
   ========================================= */

let currentFilter = 'all';
let currentSearch = '';

function getFilteredMaterials() {
    if (!state.database) return [];
    let items = state.database.items;

    if (currentFilter !== 'all') {
        items = items.filter(m => m.type === currentFilter);
    }

    if (currentSearch) {
        const q = currentSearch.toLowerCase();
        items = items.filter(m =>
            m.name.toLowerCase().includes(q) ||
            m.formula.toLowerCase().includes(q)
        );
    }

    return items;
}

function renderMaterials() {
    const container = els.materialsContainer;
    if (!container) return;
    container.innerHTML = '';

    const items = getFilteredMaterials();

    if (items.length === 0) {
        container.innerHTML = '<div class="content-empty" style="text-align:center;padding:20px;">لا توجد مواد مطابقة</div>';
        return;
    }

    items.forEach(material => {
        const card = document.createElement('div');
        card.className = 'material-card';
        card.style.setProperty('--material-color', material.color || '#00e5ff');

        const isDanger = material.toxicity >= 3 || material.corrosive || material.flammable;
        if (isDanger) card.classList.add('danger');

        card.innerHTML = `
            <div class="material-color-dot" style="background:${material.color || '#00e5ff'};"></div>
            <div class="material-card-info">
                <div class="material-card-name">${material.name}</div>
                <div class="material-card-formula">${material.formula}</div>
            </div>
            <span class="material-card-state">${STATE_LABELS[material.state] || material.state}</span>
        `;

        card.addEventListener('click', () => {
            SoundEngine.click();
            showMaterialInfo(material);
        });

        container.appendChild(card);
    });
}

/* =========================================
   MATERIAL INFO MODAL
   ========================================= */

function showMaterialInfo(material) {
    els.materialInfoTitle.textContent = material.name;
    els.materialInfoContent.style.setProperty('--material-color', material.color || '#00e5ff');

    const safetyBadges = [];
    if (material.toxicity >= 3) safetyBadges.push('<span class="safety-badge danger">☠️ سام</span>');
    if (material.corrosive) safetyBadges.push('<span class="safety-badge danger">⚠️ مسبب للتآكل</span>');
    if (material.flammable) safetyBadges.push('<span class="safety-badge warning">🔥 قابل للاشتعال</span>');
    if (material.radioactive) safetyBadges.push('<span class="safety-badge danger">☢️ مشع</span>');
    if (safetyBadges.length === 0) safetyBadges.push('<span class="safety-badge safe">✅ آمن نسبيًا</span>');

    const toxicityLabel = ['غير سام', 'سام قليلًا', 'سام', 'سام جدًا', 'شديد السمية'][material.toxicity] || 'غير معروف';

    els.materialInfoContent.innerHTML = `
        <div class="material-info-hero">
            <div class="material-info-color" style="background:${material.color || '#00e5ff'};"></div>
            <div>
                <h3>${material.name}</h3>
                <div class="formula">${material.formula}</div>
                <div style="margin-top:6px;">${safetyBadges.join('')}</div>
            </div>
        </div>

        <div class="material-info-grid">
            <div class="material-info-item">
                <span class="label">الحالة</span>
                <span class="value">${STATE_LABELS[material.state] || material.state}</span>
            </div>
            <div class="material-info-item">
                <span class="label">النوع</span>
                <span class="value">${TYPE_LABELS[material.type] || material.type}</span>
            </div>
            <div class="material-info-item">
                <span class="label">الكثافة</span>
                <span class="value">${material.density ? material.density + ' جم/سم³' : '—'}</span>
            </div>
            <div class="material-info-item">
                <span class="label">السمية</span>
                <span class="value">${toxicityLabel}</span>
            </div>
            <div class="material-info-item">
                <span class="label">نقطة الانصهار</span>
                <span class="value">${material.meltingPoint != null ? material.meltingPoint + '°C' : '—'}</span>
            </div>
            <div class="material-info-item">
                <span class="label">نقطة الغليان</span>
                <span class="value">${material.boilingPoint != null ? material.boilingPoint + '°C' : '—'}</span>
            </div>
        </div>

        <div class="material-info-desc">
            <strong>📖 الوصف:</strong><br>
            ${material.description || 'لا يوجد وصف متاح.'}
        </div>
    `;

    els.materialInfoModal.classList.add('active');
}

/* =========================================
   MATERIAL PICKER
   ========================================= */

function openMaterialPicker(beakerId) {
    state.currentBeaker = beakerId;
    els.pickerSearch.value = '';
    renderPickerMaterials();
    els.materialPicker.classList.add('active');
}

function renderPickerMaterials() {
    if (!state.database) return;
    const container = els.pickerMaterials;
    container.innerHTML = '';

    const q = els.pickerSearch.value.toLowerCase();
    const items = state.database.items.filter(m =>
        !q || m.name.toLowerCase().includes(q) || m.formula.toLowerCase().includes(q)
    );

    items.forEach(material => {
        const item = document.createElement('div');
        item.className = 'picker-item';
        item.innerHTML = `
            <strong>${material.name}</strong>
            <span class="picker-formula">${material.formula}</span>
            <span class="picker-state">${STATE_LABELS[material.state] || material.state}</span>
        `;

        item.addEventListener('click', () => {
            SoundEngine.pop();
            addMaterialToBeaker(state.currentBeaker, material);
            els.materialPicker.classList.remove('active');
        });

        container.appendChild(item);
    });
}

/* =========================================
   BEAKER MANAGEMENT
   ========================================= */

function addMaterialToBeaker(beakerId, material) {
    const beaker = beakerId === 'A' ? state.beakerA : state.beakerB;

    if (beaker.length >= 5) {
        showToast('البيكر ممتلئ! أقصى عدد 5 مواد', 'warning');
        return;
    }

    beaker.push(material);
    updateBeakerVisual(beakerId);
    SoundEngine.bubble();

    // Show liquid fill animation
    const beakerEl = beakerId === 'A' ? els.beakerA : els.beakerB;
    const liquid = beakerEl.querySelector('.liquid');
    const height = Math.min(80, beaker.length * 15);
    liquid.style.height = height + '%';

    // Set liquid color based on materials
    updateLiquidColor(liquid, beaker);

    // Add bubbles when adding material
    createBubbles(beakerEl, 10);
}

function removeMaterialFromBeaker(beakerId, index) {
    const beaker = beakerId === 'A' ? state.beakerA : state.beakerB;
    beaker.splice(index, 1);
    updateBeakerVisual(beakerId);
}

function updateBeakerVisual(beakerId) {
    const beaker = beakerId === 'A' ? state.beakerA : state.beakerB;
    const contentEl = beakerId === 'A' ? els.contentA : els.contentB;
    const beakerEl = beakerId === 'A' ? els.beakerA : els.beakerB;
    const liquid = beakerEl.querySelector('.liquid');
    const label = beakerEl.querySelector('.empty-hint');

    if (beaker.length === 0) {
        contentEl.innerHTML = '<span class="content-empty">فارغ</span>';
        liquid.style.height = '0%';
        label.textContent = 'اضغط لإضافة مادة';
        return;
    }

    contentEl.innerHTML = beaker.map((m, i) =>
        `<span class="material-chip" title="اضغط للحذف" data-beaker="${beakerId}" data-index="${i}">${m.name}</span>`
    ).join('');

    label.textContent = beaker.map(m => m.formula).join(' + ');

    // Click to remove material
    contentEl.querySelectorAll('.material-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.stopPropagation();
            const bId = chip.dataset.beaker;
            const idx = parseInt(chip.dataset.index);
            removeMaterialFromBeaker(bId, idx);
            SoundEngine.pop();
        });
    });

    updateLiquidColor(liquid, beaker);
}

function updateLiquidColor(liquid, materials) {
    if (materials.length === 0) {
        liquid.style.background = 'linear-gradient(180deg, rgba(0, 229, 255, 0.7), rgba(0, 150, 200, 0.9))';
        return;
    }

    // Blend colors of all materials
    const colors = materials.map(m => m.color || '#00e5ff');
    if (colors.length === 1) {
        liquid.style.background = `linear-gradient(180deg, ${lightenColor(colors[0], 0.3)}, ${colors[0]})`;
    } else {
        const gradient = colors.map((c, i) =>
            `${c} ${(i / (colors.length - 1)) * 100}%`
        ).join(', ');
        liquid.style.background = `linear-gradient(180deg, ${gradient})`;
    }
}

function lightenColor(hex, amount) {
    try {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, (num >> 16) + 255 * amount);
        const g = Math.min(255, ((num >> 8) & 0xff) + 255 * amount);
        const b = Math.min(255, (num & 0xff) + 255 * amount);
        return `rgb(${r}, ${g}, ${b})`;
    } catch (e) {
        return hex;
    }
}

/* =========================================
   TOOLS SYSTEM
   ========================================= */

function applyTool(tool) {
    SoundEngine.click();

    switch (tool) {
        case 'heat':
            state.temperature = Math.min(400, state.temperature + 30);
            updateStatus();
            els.tempStatus.classList.add('active');
            els.beakerA.classList.add('heat-mode');
            els.beakerB.classList.add('heat-mode');
            createSteam(els.beakerA, 30);
            createSteam(els.beakerB, 30);
            SoundEngine.heat();
            showToast(`🔥 تم التسخين إلى ${state.temperature}°C`, 'warning');
            setTimeout(() => {
                els.beakerA.classList.remove('heat-mode');
                els.beakerB.classList.remove('heat-mode');
            }, 3000);
            break;

        case 'cold':
            state.temperature = Math.max(-50, state.temperature - 20);
            updateStatus();
            els.tempStatus.classList.add('active');
            els.beakerA.classList.add('cold-mode');
            els.beakerB.classList.add('cold-mode');
            showToast(`❄️ تم التبريد إلى ${state.temperature}°C`, 'info');
            setTimeout(() => {
                els.beakerA.classList.remove('cold-mode');
                els.beakerB.classList.remove('cold-mode');
            }, 3000);
            break;

        case 'electric':
            state.electricityOn = !state.electricityOn;
            updateStatus();
            if (state.electricityOn) {
                els.electricStatus.classList.add('active');
                els.beakerA.classList.add('electric-mode');
                els.beakerB.classList.add('electric-mode');
                createSparks(els.beakerA, 15);
                createSparks(els.beakerB, 15);
                SoundEngine.electric();
                showToast('⚡ تم تشغيل الكهرباء', 'warning');
            } else {
                els.electricStatus.classList.remove('active');
                els.beakerA.classList.remove('electric-mode');
                els.beakerB.classList.remove('electric-mode');
                showToast('⚡ تم إيقاف الكهرباء', 'info');
            }
            break;

        case 'catalyst':
            state.catalystLevel = Math.min(5, state.catalystLevel + 1);
            updateStatus();
            els.catalystStatus.classList.add('active');
            SoundEngine.success();
            showToast(`🧫 تمت إضافة محفز (المستوى: ${state.catalystLevel})`, 'success');
            setTimeout(() => els.catalystStatus.classList.remove('active'), 2000);
            break;
    }
}

function updateStatus() {
    els.tempValue.textContent = state.temperature + '°C';
    els.electricValue.textContent = state.electricityOn ? 'مفعّلة' : 'متوقفة';
    els.catalystValue.textContent = state.catalystLevel;

    els.tempStatus.classList.toggle('active', state.temperature !== 25);
    els.electricStatus.classList.toggle('active', state.electricityOn);
    els.catalystStatus.classList.toggle('active', state.catalystLevel > 0);
}

/* =========================================
   REACTION ENGINE
   ========================================= */

function findReaction(materials) {
    if (!state.database || !state.database.reactions) return null;

    const sorted = [...materials].sort().join(',');

    for (const reaction of state.database.reactions) {
        const reactants = [...reaction.reactants].sort().join(',');
        if (reactants === sorted) {
            return reaction;
        }
    }
    return null;
}

function checkReactionConditions(reaction) {
    // Check heat requirement
    if (reaction.requiredHeat && state.temperature < 60) {
        showToast('🔥 هذا التفاعل يحتاج تسخين!', 'error');
        SoundEngine.error();
        return false;
    }

    // Check electricity requirement
    if (reaction.requiredElectricity && !state.electricityOn) {
        showToast('⚡ هذا التفاعل يحتاج كهرباء!', 'error');
        SoundEngine.error();
        return false;
    }

    // Check catalyst requirement
    if (reaction.requiredCatalyst && state.catalystLevel === 0) {
        showToast('🧫 هذا التفاعل يحتاج محفزًا!', 'error');
        SoundEngine.error();
        return false;
    }

    return true;
}

function runReaction() {
    if (state.isReacting) return;

    if (state.beakerA.length === 0 || state.beakerB.length === 0) {
        showToast('⚠️ ضع مواد في البيكرين أولاً!', 'warning');
        SoundEngine.error();
        return;
    }

    const materials = [
        ...state.beakerA.map(m => m.formula),
        ...state.beakerB.map(m => m.formula),
    ];

    const reaction = findReaction(materials);

    if (!reaction) {
        showToast('❌ لا يوجد تفاعل معروف لهذه المواد', 'error');
        els.reactionStatus.textContent = 'لا يوجد تفاعل';
        els.reactionStatus.className = 'info-status error';
        els.equationText.textContent = 'لا يوجد تفاعل معروف';
        els.reactionType.textContent = '—';
        els.resultName.textContent = 'لا يوجد';
        els.resultFormula.textContent = '—';
        els.energyInfo.textContent = '—';
        els.speedFill.style.width = '0%';
        els.speedValue.textContent = '—';
        els.yieldValue.textContent = '—';
        els.reactionDescription.textContent = 'جرّب مواد أخرى أو تحقق من صحة التركيبة.';
        SoundEngine.error();
        return;
    }

    if (!checkReactionConditions(reaction)) {
        return;
    }

    state.isReacting = true;
    state.currentReaction = reaction;
    els.mixBtn.disabled = true;

    // Play reaction sound
    if (reaction.explosive) {
        SoundEngine.explosion();
    } else if (reaction.soundEffect === 'فرقعة' || reaction.soundEffect === 'فرقعة قوية') {
        SoundEngine.explosion();
    } else if (reaction.soundEffect === 'فقاعات' || reaction.soundEffect === 'فوران') {
        SoundEngine.reaction();
        setTimeout(() => SoundEngine.bubble(), 200);
        setTimeout(() => SoundEngine.bubble(), 500);
    } else {
        SoundEngine.reaction();
    }

    // Reaction sequence
    setTimeout(() => {
        // Apply effects to source beakers
        applyReactionEffects(reaction);

        // Show reaction info
        showReactionInfo(reaction);

        // Transfer to result beaker
        setTimeout(() => {
            showResultBeaker(reaction);

            // Clear source beakers
            setTimeout(() => {
                state.beakerA = [];
                state.beakerB = [];
                updateBeakerVisual('A');
                updateBeakerVisual('B');
                state.isReacting = false;
                els.mixBtn.disabled = false;
            }, 1500);
        }, 1500);
    }, 300);
}

/* =========================================
   REACTION INFO DISPLAY
   ========================================= */

function showReactionInfo(reaction) {
    els.equationText.textContent = reaction.equation || '—';
    els.reactionType.textContent = reaction.type || '—';

    if (reaction.products && reaction.products.length > 0) {
        els.resultName.textContent = reaction.products.map(p => p.name).join(' + ');
        els.resultFormula.textContent = reaction.products.map(p => p.formula).join(' + ');
    } else {
        els.resultName.textContent = 'لا يوجد';
        els.resultFormula.textContent = '—';
    }

    // Energy info
    if (reaction.energyReleased > 0) {
        els.energyInfo.textContent = `طارد للحرارة (${reaction.energyReleased} كيلوجول)`;
    } else if (reaction.energyAbsorbed > 0) {
        els.energyInfo.textContent = `ماص للحرارة (${reaction.energyAbsorbed} كيلوجول)`;
    } else {
        els.energyInfo.textContent = 'متعادل حراريًا';
    }

    // Speed
    let speed = reaction.reactionSpeed || 50;
    if (state.catalystLevel > 0 && reaction.reactionSpeedWithCatalyst) {
        speed = reaction.reactionSpeedWithCatalyst;
    }
    els.speedFill.style.width = speed + '%';
    els.speedValue.textContent = speed + '%';

    // Yield
    els.yieldValue.textContent = (reaction.yield || 0) + '%';

    // Description
    els.reactionDescription.textContent = reaction.description || '';

    // Status
    els.reactionStatus.textContent = '✅ تم التفاعل';
    els.reactionStatus.className = 'info-status success';

    // Educational notes
    if (reaction.educationalNotes) {
        setTimeout(() => {
            showToast('🎓 ' + reaction.educationalNotes, 'info', 5000);
        }, 2000);
    }
}

/* =========================================
   VISUAL EFFECTS
   ========================================= */

function applyReactionEffects(reaction) {
    const beakers = [els.beakerA, els.beakerB];

    beakers.forEach(beaker => {
        // Shake
        beaker.classList.add('shake');
        setTimeout(() => beaker.classList.remove('shake'), 1000);

        // Color change
        const liquid = beaker.querySelector('.liquid');
        if (reaction.colorAfter) {
            liquid.style.background = `linear-gradient(180deg, ${lightenColor(reaction.colorAfter, 0.3)}, ${reaction.colorAfter})`;
        }

        // Foam
        if (reaction.foamLevel > 0) {
            createFoam(beaker, reaction.foamLevel);
        }

        // Bubbles
        if (reaction.bubbleLevel > 0) {
            createBubbles(beaker, reaction.bubbleLevel);
        }

        // Steam
        if (reaction.steamLevel > 0 || reaction.requiredHeat) {
            createSteam(beaker, reaction.steamLevel || 30);
        }

        // Sparks
        if (reaction.sparkEffect) {
            createSparks(beaker, 20);
        }

        // Light effect
        if (reaction.lightEffect) {
            createFlash();
        }

        // Smoke
        if (reaction.smokeEffect) {
            createSmoke(beaker);
        }

        // Precipitate
        if (reaction.precipitate) {
            const color = PRECIPITATE_COLORS[reaction.precipitateColor] || '#ffffff';
            createPrecipitate(beaker, color);
        }

        // Gas release
        if (reaction.gasProduced) {
            createGasBubbles(beaker, reaction.gasAmount || 20);
        }
    });
}

function createBubbles(beaker, amount) {
    const container = beaker.querySelector('.bubbles');
    if (!container) return;
    container.innerHTML = '';
    container.style.opacity = '1';

    const count = Math.min(30, Math.max(5, Math.floor(amount / 3)));

    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 12 + 4;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = (Math.random() * 90 + 5) + '%';
        bubble.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        bubble.style.animationDelay = (Math.random() * 2) + 's';
        container.appendChild(bubble);
    }

    setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => container.innerHTML = '', 500);
    }, 5000);
}

function createFoam(beaker, amount) {
    const foam = beaker.querySelector('.foam');
    if (!foam) return;
    const height = Math.min(80, amount * 1.5);
    foam.style.height = height + 'px';
    setTimeout(() => foam.style.height = '0px', 5000);
}

function createSteam(beaker, amount) {
    const container = beaker.querySelector('.steam');
    if (!container) return;
    container.innerHTML = '';
    container.style.opacity = '1';

    const count = Math.min(15, Math.max(3, Math.floor(amount / 5)));

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'steam-particle';
        particle.style.left = (Math.random() * 80 + 10) + '%';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        particle.style.animationDelay = (Math.random() * 2) + 's';
        container.appendChild(particle);
    }

    setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => container.innerHTML = '', 500);
    }, 5000);
}

function createSparks(beaker, count) {
    const container = beaker.querySelector('.sparks');
    if (!container) return;
    container.innerHTML = '';
    container.style.opacity = '1';

    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = (Math.random() * 80 + 10) + '%';
        spark.style.top = (Math.random() * 60 + 20) + '%';
        const dx = (Math.random() - 0.5) * 100;
        const dy = (Math.random() - 0.5) * 100;
        spark.style.setProperty('--dx', dx + 'px');
        spark.style.setProperty('--dy', dy + 'px');
        spark.style.animationDelay = (Math.random() * 0.3) + 's';
        container.appendChild(spark);
    }

    setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => container.innerHTML = '', 500);
    }, 2000);
}

function createSmoke(beaker) {
    const container = beaker.querySelector('.steam');
    if (!container) return;
    container.innerHTML = '';
    container.style.opacity = '1';

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'steam-particle';
        particle.style.left = (Math.random() * 60 + 20) + '%';
        particle.style.width = '30px';
        particle.style.height = '30px';
        particle.style.background = 'radial-gradient(circle, rgba(128,128,128,0.5), transparent)';
        particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
        particle.style.animationDelay = (Math.random() * 2) + 's';
        container.appendChild(particle);
    }

    setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => container.innerHTML = '', 500);
    }, 6000);
}

function createGasBubbles(beaker, amount) {
    const container = beaker.querySelector('.bubbles');
    if (!container) return;
    container.innerHTML = '';
    container.style.opacity = '1';

    const count = Math.min(25, Math.max(5, Math.floor(amount / 2)));

    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 8 + 3;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = (Math.random() * 90 + 5) + '%';
        bubble.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
        bubble.style.animationDelay = (Math.random() * 1.5) + 's';
        container.appendChild(bubble);
    }

    setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => container.innerHTML = '', 500);
    }, 4000);
}

function createPrecipitate(beaker, color) {
    const layer = beaker.querySelector('.precipitate-layer');
    if (!layer) return;
    layer.style.background = color;
    layer.style.height = '25%';
    setTimeout(() => layer.style.height = '0%', 7000);
}

function createFlash() {
    const flash = document.createElement('div');
    flash.className = 'reaction-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 800);
}

function shakeBeaker(beaker) {
    beaker.classList.add('shake');
    setTimeout(() => beaker.classList.remove('shake'), 1000);
}

/* =========================================
   RESULT BEAKER
   ========================================= */

function showResultBeaker(reaction) {
    const liquid = els.resultBeaker.querySelector('.liquid');
    const label = els.resultBeaker.querySelector('.empty-hint');
    const foam = els.resultBeaker.querySelector('.foam');
    const bubbles = els.resultBeaker.querySelector('.bubbles');
    const steam = els.resultBeaker.querySelector('.steam');
    const sparks = els.resultBeaker.querySelector('.sparks');
    const precip = els.resultBeaker.querySelector('.precipitate-layer');

    // Reset
    liquid.style.height = '0%';
    foam.style.height = '0px';
    bubbles.innerHTML = '';
    steam.innerHTML = '';
    sparks.innerHTML = '';
    precip.style.height = '0%';

    // Fill
    setTimeout(() => {
        liquid.style.height = '75%';
        const color = reaction.colorAfter || '#00ff88';
        liquid.style.background = `linear-gradient(180deg, ${lightenColor(color, 0.3)}, ${color})`;

        // Label
        if (reaction.products && reaction.products.length > 0) {
            label.textContent = reaction.products.map(p => p.formula).join(' + ');
        } else {
            label.textContent = 'ناتج';
        }

        // Content
        if (reaction.products && reaction.products.length > 0) {
            els.resultContent.innerHTML = reaction.products.map(p => `
                <div style="margin:4px 0;">
                    <strong>${p.name}</strong>
                    <div class="info-formula">${p.formula}</div>
                </div>
            `).join('');
        }

        // Effects on result
        if (reaction.foamLevel > 0) createFoam(els.resultBeaker, reaction.foamLevel);
        if (reaction.bubbleLevel > 0) createBubbles(els.resultBeaker, reaction.bubbleLevel);
        if (reaction.steamLevel > 0) createSteam(els.resultBeaker, reaction.steamLevel);
        if (reaction.sparkEffect) createSparks(els.resultBeaker, 15);
        if (reaction.precipitate) {
            const color = PRECIPITATE_COLORS[reaction.precipitateColor] || '#ffffff';
            createPrecipitate(els.resultBeaker, color);
        }
        if (reaction.gasProduced) createGasBubbles(els.resultBeaker, reaction.gasAmount || 20);

        shakeBeaker(els.resultBeaker);
        SoundEngine.success();
    }, 200);
}

/* =========================================
   RESET
   ========================================= */

function resetLab() {
    state.beakerA = [];
    state.beakerB = [];
    state.currentReaction = null;
    state.catalystLevel = 0;
    state.temperature = 25;
    state.electricityOn = false;
    state.isReacting = false;

    // Reset visuals
    updateBeakerVisual('A');
    updateBeakerVisual('B');

    // Reset result
    const resultLiquid = els.resultBeaker.querySelector('.liquid');
    resultLiquid.style.height = '0%';
    els.resultContent.innerHTML = '<span class="content-empty">فارغ</span>';
    els.resultBeaker.querySelector('.empty-hint').textContent = 'لا يوجد ناتج';

    // Reset info
    els.equationText.textContent = 'لا يوجد تفاعل بعد';
    els.reactionType.textContent = '—';
    els.resultName.textContent = 'لا يوجد';
    els.resultFormula.textContent = '—';
    els.energyInfo.textContent = '—';
    els.speedFill.style.width = '0%';
    els.speedValue.textContent = '—';
    els.yieldValue.textContent = '—';
    els.reactionDescription.textContent = 'أضف المواد إلى البيكرين ثم اضغط "تشغيل التفاعل"';
    els.reactionStatus.textContent = 'بانتظار التجربة';
    els.reactionStatus.className = 'info-status';

    // Clear all effects
    document.querySelectorAll('.beaker').forEach(beaker => {
        beaker.classList.remove('heat-mode', 'cold-mode', 'electric-mode', 'shake');
        beaker.querySelectorAll('.bubbles, .steam, .sparks').forEach(el => {
            el.innerHTML = '';
            el.style.opacity = '0';
        });
        beaker.querySelectorAll('.foam, .precipitate-layer').forEach(el => {
            el.style.height = '0px';
        });
    });

    // Reset liquids
    document.querySelectorAll('.liquid').forEach(liquid => {
        liquid.style.background = 'linear-gradient(180deg, rgba(0, 229, 255, 0.7), rgba(0, 150, 200, 0.9))';
    });

    updateStatus();
    SoundEngine.click();
    showToast('♻️ تم إعادة ضبط المختبر', 'info');
}

/* =========================================
   NOTES SYSTEM
   ========================================= */

function initNotes() {
    const saved = localStorage.getItem('chem_lab_notes');
    if (saved) {
        els.notesArea.value = saved;
    }

    els.notesArea.addEventListener('input', () => {
        localStorage.setItem('chem_lab_notes', els.notesArea.value);
    });

    els.clearNotes.addEventListener('click', () => {
        els.notesArea.value = '';
        localStorage.removeItem('chem_lab_notes');
        SoundEngine.click();
        showToast('🗑️ تم مسح الملاحظات', 'info');
    });
}

/* =========================================
   EDUCATIONAL MODE
   ========================================= */

function showEducationalInfo() {
    const reaction = state.currentReaction;

    if (!reaction) {
        els.eduContent.innerHTML = `
            <div class="edu-welcome">
                <h3>🎓 الوضع التعليمي</h3>
                <p>قم بتشغيل تفاعل لعرض الشرح التعليمي التفصيلي، أو اضغط على أي مادة في قاعدة المواد لعرض خصائصها.</p>
            </div>
        `;
    } else {
        const safetyWarnings = [];
        if (reaction.explosive) safetyWarnings.push('⚠️ هذا التفاعل انفجاري! يجب توخي الحذر الشديد.');
        if (reaction.flammable) safetyWarnings.push('🔥 هذا التفاعل ينتج مواد قابلة للاشتعال.');
        if (reaction.gasProduced) safetyWarnings.push('💨 يتصاعد غاز: ' + (reaction.gasType || 'غير محدد'));
        if (reaction.odorLevel >= 4) safetyWarnings.push('👃 رائحة نفاذة جدًا - استخدم غطاء الدخان.');
        if (reaction.requiredHeat && reaction.temperature > 200) safetyWarnings.push('🌡️ يتطلب حرارة عالية جدًا.');

        els.eduContent.innerHTML = `
            <div class="edu-section">
                <h4>📖 شرح التفاعل</h4>
                <p>${reaction.description || 'لا يوجد شرح متاح.'}</p>
            </div>

            <div class="edu-section">
                <h4>⚗️ المعادلة الكيميائية</h4>
                <p style="font-family:var(--font-tech);direction:ltr;text-align:center;color:var(--neon-blue);font-size:1rem;">
                    ${reaction.equation || '—'}
                </p>
            </div>

            <div class="edu-section">
                <h4>🔬 نوع التفاعل</h4>
                <p>${reaction.type || '—'}</p>
            </div>

            <div class="edu-section">
                <h4>📊 بيانات التفاعل</h4>
                <p>
                    • درجة الحرارة المطلوبة: ${reaction.temperature || 25}°C<br>
                    • سرعة التفاعل: ${reaction.reactionSpeed || 0}%${state.catalystLevel > 0 && reaction.reactionSpeedWithCatalyst ? ` (مع المحفز: ${reaction.reactionSpeedWithCatalyst}%)` : ''}<br>
                    • العائد: ${reaction.yield || 0}%<br>
                    • طاقة التنشيط: ${reaction.activationEnergy || 0} كيلوجول<br>
                    ${reaction.energyReleased > 0 ? `• الطاقة المنطلقة: ${reaction.energyReleased} كيلوجول` : ''}
                    ${reaction.energyAbsorbed > 0 ? `• الطاقة الممتصة: ${reaction.energyAbsorbed} كيلوجول` : ''}
                </p>
            </div>

            ${safetyWarnings.length > 0 ? `
            <div class="edu-section edu-safety">
                <h4>⚠️ تحذيرات السلامة</h4>
                <p>${safetyWarnings.join('<br>')}</p>
            </div>
            ` : ''}

            ${reaction.educationalNotes ? `
            <div class="edu-section">
                <h4>🎯 معلومة تعليمية</h4>
                <p>${reaction.educationalNotes}</p>
            </div>
            ` : ''}
        `;
    }

    els.eduModal.classList.add('active');
}

/* =========================================
   EVENT LISTENERS
   ========================================= */

function setupEventListeners() {
    // Beaker clicks
    els.beakerA.addEventListener('click', () => {
        SoundEngine.click();
        openMaterialPicker('A');
    });

    els.beakerB.addEventListener('click', () => {
        SoundEngine.click();
        openMaterialPicker('B');
    });

    // Mix button
    els.mixBtn.addEventListener('click', () => {
        SoundEngine.click();
        runReaction();
    });

    // Reset
    els.resetBtn.addEventListener('click', resetLab);

    // Clean
    els.cleanBtn.addEventListener('click', () => {
        resetLab();
        showToast('🧽 تم تنظيف المختبر', 'success');
    });

    // Notes
    els.noteBtn.addEventListener('click', () => {
        SoundEngine.click();
        els.notesModal.classList.add('active');
    });

    els.closeNotes.addEventListener('click', () => {
        els.notesModal.classList.remove('active');
    });

    // Educational
    els.eduBtn.addEventListener('click', () => {
        SoundEngine.click();
        showEducationalInfo();
    });

    els.closeEdu.addEventListener('click', () => {
        els.eduModal.classList.remove('active');
    });

    // Picker
    els.closePicker.addEventListener('click', () => {
        els.materialPicker.classList.remove('active');
    });

    els.pickerSearch.addEventListener('input', renderPickerMaterials);

    // Material info
    els.closeMaterialInfo.addEventListener('click', () => {
        els.materialInfoModal.classList.remove('active');
    });

    // Material search
    els.materialSearch.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderMaterials();
    });

    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderMaterials();
            SoundEngine.click();
        });
    });

    // Tools
    document.querySelectorAll('.tool-btn[data-tool]').forEach(btn => {
        btn.addEventListener('click', () => {
            const tool = btn.dataset.tool;
            applyTool(tool);
        });
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        }
    });

    // Audio context resume on first interaction
    document.addEventListener('click', () => SoundEngine.resume(), { once: true });
}

/* =========================================
   INITIALIZATION
   ========================================= */

async function init() {
    // Initialize background particles
    BgParticles.init();

    // Initialize sound engine
    SoundEngine.init();

    // Load database
    const loaded = await loadDatabase();

    if (loaded) {
        renderMaterials();
        setupEventListeners();
        initNotes();
        updateStatus();

        // Hide loading screen
        setTimeout(() => {
            els.loadingScreen.classList.add('hidden');
            showToast('🧪 مرحبًا بك في مختبر الكيمياء!', 'success', 4000);
        }, 800);
    } else {
        els.loadingScreen.classList.add('hidden');
        showToast('⚠️ تعذر تحميل قاعدة البيانات. تأكد من وجود reactions.json', 'error', 6000);
    }
}

// Start
document.addEventListener('DOMContentLoaded', init);

/* =========================================
   END
   ========================================= */

console.log('🧪 CHEM LAB PRO READY');