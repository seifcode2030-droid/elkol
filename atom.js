/* =========================================
   GLOBAL DATA
========================================= */

const atomData = {
    protons: 1,
    neutrons: 0,
    electrons: 1,
    temperature: 25,
    selectedElement: "H",
    stability: 100,
    radiation: 0
};

const maxElectronsPerShell = [2, 8, 18, 32, 32, 18, 8];

const periodicTable = [
    { symbol: "H", name: "Hydrogen", state: "Gas", category: "Nonmetal", electro: 2.20, bonds: 1 },
    { symbol: "He", name: "Helium", state: "Gas", category: "Noble Gas", electro: 0, bonds: 0 },
    { symbol: "Li", name: "Lithium", state: "Solid", category: "Alkali Metal", electro: 0.98, bonds: 1 },
    { symbol: "Be", name: "Beryllium", state: "Solid", category: "Alkaline Earth", electro: 1.57, bonds: 2 },
    { symbol: "B", name: "Boron", state: "Solid", category: "Metalloid", electro: 2.04, bonds: 3 },
    { symbol: "C", name: "Carbon", state: "Solid", category: "Nonmetal", electro: 2.55, bonds: 4 },
    { symbol: "N", name: "Nitrogen", state: "Gas", category: "Nonmetal", electro: 3.04, bonds: 3 },
    { symbol: "O", name: "Oxygen", state: "Gas", category: "Nonmetal", electro: 3.44, bonds: 2 },
    { symbol: "F", name: "Fluorine", state: "Gas", category: "Halogen", electro: 3.98, bonds: 1 },
    { symbol: "Ne", name: "Neon", state: "Gas", category: "Noble Gas", electro: 0, bonds: 0 },
    { symbol: "Na", name: "Sodium", state: "Solid", category: "Alkali Metal", electro: 0.93, bonds: 1 },
    { symbol: "Mg", name: "Magnesium", state: "Solid", category: "Alkaline Earth", electro: 1.31, bonds: 2 },
    { symbol: "Al", name: "Aluminium", state: "Solid", category: "Metal", electro: 1.61, bonds: 3 },
    { symbol: "Si", name: "Silicon", state: "Solid", category: "Metalloid", electro: 1.90, bonds: 4 },
    { symbol: "P", name: "Phosphorus", state: "Solid", category: "Nonmetal", electro: 2.19, bonds: 3 },
    { symbol: "S", name: "Sulfur", state: "Solid", category: "Nonmetal", electro: 2.58, bonds: 2 },
    { symbol: "Cl", name: "Chlorine", state: "Gas", category: "Halogen", electro: 3.16, bonds: 1 },
    { symbol: "Ar", name: "Argon", state: "Gas", category: "Noble Gas", electro: 0, bonds: 0 },
    { symbol: "K", name: "Potassium", state: "Solid", category: "Alkali Metal", electro: 0.82, bonds: 1 },
    { symbol: "Ca", name: "Calcium", state: "Solid", category: "Alkaline Earth", electro: 1.00, bonds: 2 }
];

/* =========================================
   DOM
========================================= */

const protonCount = document.getElementById("protonCount");
const neutronCount = document.getElementById("neutronCount");
const electronCount = document.getElementById("electronCount");

const protonsLayer = document.getElementById("protons");
const neutronsLayer = document.getElementById("neutrons");
const electronsLayer = document.getElementById("electrons");

const temperatureText = document.getElementById("temperature");

const elementName = document.getElementById("elementName");
const elementSymbol = document.getElementById("elementSymbol");
const atomicNumber = document.getElementById("atomicNumber");
const atomicMass = document.getElementById("atomicMass");
const chargeValue = document.getElementById("chargeValue");

const stateValue = document.getElementById("stateValue");
const categoryValue = document.getElementById("categoryValue");
const electroValue = document.getElementById("electroValue");
const bondValue = document.getElementById("bondValue");

const shellInfo = document.getElementById("shellInfo");

const elementSelect = document.getElementById("elementSelect");

/* =========================================
   CREATE PERIODIC TABLE
========================================= */

function buildElementSelector() {

    elementSelect.innerHTML =
        `<option value="">اختر عنصر</option>`;

    periodicTable.forEach(el => {

        const option =
            document.createElement("option");

        option.value = el.symbol;
        option.textContent =
            `${el.symbol} - ${el.name}`;

        elementSelect.appendChild(option);
    });
}

/* =========================================
   PARTICLES CONTROL
========================================= */

function addProton() {
    atomData.protons++;
    updateAtom();
}

function removeProton() {

    if (atomData.protons > 1) {
        atomData.protons--;
        updateAtom();
    }
}

function addNeutron() {
    atomData.neutrons++;
    updateAtom();
}

function removeNeutron() {

    if (atomData.neutrons > 0) {
        atomData.neutrons--;
        updateAtom();
    }
}

function addElectron() {
    atomData.electrons++;
    updateAtom();
}

function removeElectron() {

    if (atomData.electrons > 0) {
        atomData.electrons--;
        updateAtom();
    }
}

/* =========================================
   TEMPERATURE
========================================= */

function heatUp() {
    atomData.temperature += 25;
    updateAtom();
}

function coolDown() {
    atomData.temperature -= 25;
    updateAtom();
}

/* =========================================
   SELECT ELEMENT
========================================= */

function loadSelectedElement() {

    const symbol = elementSelect.value;

    const element =
        periodicTable.find(
            e => e.symbol === symbol
        );

    if (!element) return;

    const atomicNum =
        periodicTable.indexOf(element) + 1;

    atomData.selectedElement = symbol;

    atomData.protons = atomicNum;
    atomData.electrons = atomicNum;

    updateAtom();
}

/* =========================================
   UPDATE ATOM
========================================= */

function updateAtom() {

    updateCounters();

    renderNucleus();

    renderElectrons();

    updateInfo();

    calculateStability();

    updateEventLog("تم تحديث الذرة");
}

/* =========================================
   COUNTERS
========================================= */

function updateCounters() {

    protonCount.textContent =
        atomData.protons;

    neutronCount.textContent =
        atomData.neutrons;

    electronCount.textContent =
        atomData.electrons;

    temperatureText.textContent =
        atomData.temperature + "°C";
}

/* =========================================
   NUCLEUS
========================================= */

function renderNucleus() {

    protonsLayer.innerHTML = "";
    neutronsLayer.innerHTML = "";

    const total =
        atomData.protons +
        atomData.neutrons;

    const radius = 40;

    let index = 0;

    for (let i = 0; i < atomData.protons; i++) {

        const proton =
            document.createElement("div");

        proton.className = "proton";

        const angle =
            (360 / Math.max(total, 1))
            * index;

        const x =
            Math.cos(angle * Math.PI / 180)
            * radius;

        const y =
            Math.sin(angle * Math.PI / 180)
            * radius;

        proton.style.left =
            `calc(50% + ${x}px)`;

        proton.style.top =
            `calc(50% + ${y}px)`;

        protonsLayer.appendChild(proton);

        index++;
    }

    for (let i = 0; i < atomData.neutrons; i++) {

        const neutron =
            document.createElement("div");

        neutron.className = "neutron";

        const angle =
            (360 / Math.max(total, 1))
            * index;

        const x =
            Math.cos(angle * Math.PI / 180)
            * radius;

        const y =
            Math.sin(angle * Math.PI / 180)
            * radius;

        neutron.style.left =
            `calc(50% + ${x}px)`;

        neutron.style.top =
            `calc(50% + ${y}px)`;

        neutronsLayer.appendChild(neutron);

        index++;
    }
}

/* =========================================
   ELECTRONS
========================================= */

function renderElectrons() {

    electronsLayer.innerHTML = "";

    let remaining =
        atomData.electrons;

    const shellRadius =
        [60, 95, 135, 175, 220, 270, 320];

    for (let shell = 0;
        shell < maxElectronsPerShell.length;
        shell++) {

        let count =
            Math.min(
                remaining,
                maxElectronsPerShell[shell]
            );

        remaining -= count;

        if (count <= 0) continue;

        for (let i = 0; i < count; i++) {

            const electron =
                document.createElement("div");

            electron.className =
                "electron";

            const angle =
                (360 / count) * i;

            const x =
                Math.cos(angle * Math.PI / 180)
                * shellRadius[shell];

            const y =
                Math.sin(angle * Math.PI / 180)
                * shellRadius[shell];

            electron.style.left =
                `calc(50% + ${x}px - 7px)`;

            electron.style.top =
                `calc(50% + ${y}px - 7px)`;

            electronsLayer.appendChild(
                electron
            );
        }
    }
}

/* =========================================
   SHELL DISTRIBUTION
========================================= */

function calculateShells() {

    let remaining =
        atomData.electrons;

    let result = [];

    for (let i = 0;
        i < maxElectronsPerShell.length;
        i++) {

        let value =
            Math.min(
                remaining,
                maxElectronsPerShell[i]
            );

        if (value > 0) {

            result.push(value);

            remaining -= value;
        }

        if (remaining <= 0)
            break;
    }

    return result;
}

/* =========================================
   CREATE PERIODIC TABLE
========================================= */

function createPeriodicTable() {

    if (!periodicTableContainer) return;

    periodicTableContainer.innerHTML = "";

    periodicTable.forEach((element, index) => {

        const btn =
            document.createElement("button");

        btn.className =
            "element-btn";

        btn.innerHTML =
            `
        <span class="symbol">
            ${element.symbol}
        </span>
        <span class="number">
            ${index + 1}
        </span>
        `;

        btn.addEventListener(
            "click",
            () => {
                loadElementData(element);
            }
        );

        periodicTableContainer
            .appendChild(btn);
    });
}

/* =========================================
   LOAD ELEMENT
========================================= */

function loadElementData(element) {

    atomData.selectedElement =
        element.symbol;

    atomData.protons =
        element.atomicNumber;

    atomData.electrons =
        element.atomicNumber;

    atomData.neutrons =
        Math.round(
            element.atomicMass
        ) - element.atomicNumber;

    updateAtom();

    updateEventLog(
        "تم تحميل العنصر: " +
        element.name
    );
}

/* =========================================
   ELEMENT INFO
========================================= */

function updateInfo() {

    if (!atomData.selectedElement) {

        elementName.textContent = "-";
        elementSymbol.textContent = "-";
        atomicNumber.textContent = "0";
        atomicMass.textContent = "0";
        chargeValue.textContent = "0";

        return;
    }

    const element =
        periodicTable.find(
            e =>
                e.symbol ===
                atomData.selectedElement
        );

    if (!element) return;

    elementName.textContent =
        element.name;

    elementSymbol.textContent =
        element.symbol;

    atomicNumber.textContent =
        atomData.protons;

    atomicMass.textContent =
        atomData.protons +
        atomData.neutrons;

    chargeValue.textContent =
        atomData.protons -
        atomData.electrons;

    stateValue.textContent =
        element.state;

    categoryValue.textContent =
        element.category;

    electroValue.textContent =
        element.electronegativity;

    bondValue.textContent =
        element.bonds;

    updateShellInfo();
}

/* =========================================
   SHELL INFO
========================================= */

function updateShellInfo() {

    shellInfo.innerHTML = "";

    const shells =
        calculateShells();

    shells.forEach(
        (count, index) => {

            const li =
                document.createElement("li");

            li.textContent =
                `المستوى ${index + 1}: ${count}`;

            shellInfo.appendChild(li);
        }
    );
}

/* =========================================
   STABILITY
========================================= */

function calculateStability() {

    let ratio =
        atomData.neutrons /
        Math.max(atomData.protons, 1);

    let stability = 100;

    if (ratio < 0.8)
        stability -= 30;

    if (ratio > 1.6)
        stability -= 30;

    let charge =
        Math.abs(
            atomData.protons -
            atomData.electrons
        );

    stability -= charge * 5;

    stability -=
        Math.abs(
            atomData.temperature
        ) / 50;

    stability =
        Math.max(
            0,
            Math.min(100, stability)
        );

    stabilityBar.style.width =
        stability + "%";

    stabilityText.textContent =
        stability + "%";

    if (stability < 20) {

        triggerExplosion();
    }
}

/* =========================================
   ELEMENT SEARCH
========================================= */

function searchElement() {

    const value =
        searchInput.value
            .trim()
            .toLowerCase();

    const buttons =
        document.querySelectorAll(
            ".element-btn"
        );

    buttons.forEach(btn => {

        const txt =
            btn.textContent
                .toLowerCase();

        btn.style.display =
            txt.includes(value)
                ? "flex"
                : "none";
    });
}

/* =========================================
   RANDOM ELEMENT
========================================= */

function randomElement() {

    const element =
        periodicTable[
        Math.floor(
            Math.random()
            * periodicTable.length
        )
        ];

    loadElementData(element);
}

/* =========================================
   TEMPERATURE SYSTEM
========================================= */

function heatUp() {

    atomData.temperature += 25;

    updateEventLog(
        "🔥 تم رفع درجة الحرارة"
    );

    updateTemperatureEffects();

    updateAtom();
}

function coolDown() {

    atomData.temperature -= 25;

    updateEventLog(
        "❄ تم خفض درجة الحرارة"
    );

    updateTemperatureEffects();

    updateAtom();
}

function updateTemperatureEffects() {

    if (atomData.temperature > 300) {

        atomContainer.classList.add(
            "hot"
        );

        atomContainer.classList.remove(
            "cold"
        );
    }

    else if (atomData.temperature < 0) {

        atomContainer.classList.add(
            "cold"
        );

        atomContainer.classList.remove(
            "hot"
        );
    }

    else {

        atomContainer.classList.remove(
            "hot"
        );

        atomContainer.classList.remove(
            "cold"
        );
    }
}

/* =========================================
   SAVE & LOAD
========================================= */

function saveAtom() {

    localStorage.setItem(
        "saved_atom",
        JSON.stringify(atomData)
    );

    updateEventLog(
        "💾 تم حفظ الذرة"
    );

    alert("تم حفظ الذرة");
}

function loadAtom() {

    const saved =
        localStorage.getItem(
            "saved_atom"
        );

    if (!saved) {

        alert("لا يوجد حفظ");

        return;
    }

    Object.assign(
        atomData,
        JSON.parse(saved)
    );

    updateAtom();

    updateEventLog(
        "📂 تم تحميل الذرة"
    );
}

/* =========================================
   RESET
========================================= */

function resetAtom() {

    atomData.protons = 1;
    atomData.neutrons = 0;
    atomData.electrons = 1;
    atomData.temperature = 25;
    atomData.selectedElement = "H";

    updateAtom();

    updateEventLog(
        "♻ تمت إعادة الضبط"
    );
}

/* =========================================
   EXPORT JSON
========================================= */

function exportAtom() {

    const data =
        JSON.stringify(
            atomData,
            null,
            2
        );

    const blob =
        new Blob(
            [data],
            {
                type: "application/json"
            }
        );

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "atom.json";

    link.click();

    updateEventLog(
        "📤 تم تصدير الذرة"
    );
}

/* =========================================
   EXPLOSION SYSTEM
========================================= */

function triggerExplosion() {

    explosionLayer.style.display =
        "flex";

    explosionLayer.classList.add(
        "boom"
    );

    updateEventLog(
        "☢ الذرة أصبحت غير مستقرة"
    );

    setTimeout(() => {

        explosionLayer.innerHTML =
            `
        <h2>
        ☢ انفجار نووي
        </h2>

        <p>
        فقدت الذرة استقرارها
        </p>
        `;

    }, 500);

    setTimeout(() => {

        explosionLayer.style.display =
            "none";

        explosionLayer.classList.remove(
            "boom"
        );

    }, 5000);
}

/* =========================================
   EVENT LOG
========================================= */

function updateEventLog(message) {

    const log =
        document.getElementById(
            "eventLog"
        );

    if (!log) return;

    const item =
        document.createElement("div");

    const now =
        new Date();

    item.className =
        "log-item";

    item.innerHTML =
        `[${now.toLocaleTimeString()}] ${message}`;

    log.prepend(item);

    if (log.children.length > 30) {

        log.removeChild(
            log.lastChild
        );
    }
}

/* =========================================
   RANDOMIZE ATOM
========================================= */

function randomAtom() {

    atomData.protons =
        Math.floor(
            Math.random() * 20
        ) + 1;

    atomData.neutrons =
        Math.floor(
            Math.random() * 30
        );

    atomData.electrons =
        Math.floor(
            Math.random() * 20
        ) + 1;

    atomData.temperature =
        Math.floor(
            Math.random() * 600
        ) - 200;

    updateAtom();

    updateEventLog(
        "🎲 تم إنشاء ذرة عشوائية"
    );
}

/* =========================================
   STARTUP
========================================= */

window.onload = () => {

    buildElementSelector();

    createPeriodicTable();

    updateAtom();

    animateElectrons();

    updateEventLog(
        "🚀 تم تشغيل المختبر"
    );
};