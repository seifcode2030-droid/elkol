/* =========================
   بيانات الذرة
========================= */

const atomData = {

    protons: 1,
    neutrons: 0,
    electrons: 1,

    temperature: 25,

    selectedElement: "H"
};

/* =========================
   العناصر
========================= */

const periodicTable = [
    {
        "symbol": "H",
        "name": "Hydrogen",
        "atomicNumber": 1,
        "atomicMass": 1.008,
        "state": "Gas",
        "category": "Nonmetal",
        "electronegativity": 2.20,
        "valenceElectrons": 1,
        "bonds": 1,
        "shells": [1],
        "group": 1,
        "period": 1,
        "radioactive": false
    },
    {
        "symbol": "He",
        "name": "Helium",
        "atomicNumber": 2,
        "atomicMass": 4.0026,
        "state": "Gas",
        "category": "Noble Gas",
        "electronegativity": 0,
        "valenceElectrons": 2,
        "bonds": 0,
        "shells": [2],
        "group": 18,
        "period": 1,
        "radioactive": false
    },
    {
        "symbol": "Li",
        "name": "Lithium",
        "atomicNumber": 3,
        "atomicMass": 6.94,
        "state": "Solid",
        "category": "Alkali Metal",
        "electronegativity": 0.98,
        "valenceElectrons": 1,
        "bonds": 1,
        "shells": [2, 1],
        "group": 1,
        "period": 2,
        "radioactive": false
    },
    {
        "symbol": "Be",
        "name": "Beryllium",
        "atomicNumber": 4,
        "atomicMass": 9.0122,
        "state": "Solid",
        "category": "Alkaline Earth Metal",
        "electronegativity": 1.57,
        "valenceElectrons": 2,
        "bonds": 2,
        "shells": [2, 2],
        "group": 2,
        "period": 2,
        "radioactive": false
    },
    {
        "symbol": "B",
        "name": "Boron",
        "atomicNumber": 5,
        "atomicMass": 10.81,
        "state": "Solid",
        "category": "Metalloid",
        "electronegativity": 2.04,
        "valenceElectrons": 3,
        "bonds": 3,
        "shells": [2, 3],
        "group": 13,
        "period": 2,
        "radioactive": false
    },
    {
        "symbol": "C",
        "name": "Carbon",
        "atomicNumber": 6,
        "atomicMass": 12.011,
        "state": "Solid",
        "category": "Nonmetal",
        "electronegativity": 2.55,
        "valenceElectrons": 4,
        "bonds": 4,
        "shells": [2, 4],
        "group": 14,
        "period": 2,
        "radioactive": false
    },
    {
        "symbol": "N",
        "name": "Nitrogen",
        "atomicNumber": 7,
        "atomicMass": 14.007,
        "state": "Gas",
        "category": "Nonmetal",
        "electronegativity": 3.04,
        "valenceElectrons": 5,
        "bonds": 3,
        "shells": [2, 5],
        "group": 15,
        "period": 2,
        "radioactive": false
    },
    {
        "symbol": "O",
        "name": "Oxygen",
        "atomicNumber": 8,
        "atomicMass": 15.999,
        "state": "Gas",
        "category": "Nonmetal",
        "electronegativity": 3.44,
        "valenceElectrons": 6,
        "bonds": 2,
        "shells": [2, 6],
        "group": 16,
        "period": 2,
        "radioactive": false
    },
    {
        "symbol": "F",
        "name": "Fluorine",
        "atomicNumber": 9,
        "atomicMass": 18.998,
        "state": "Gas",
        "category": "Halogen",
        "electronegativity": 3.98,
        "valenceElectrons": 7,
        "bonds": 1,
        "shells": [2, 7],
        "group": 17,
        "period": 2,
        "radioactive": false
    },
    {
        "symbol": "Ne",
        "name": "Neon",
        "atomicNumber": 10,
        "atomicMass": 20.180,
        "state": "Gas",
        "category": "Noble Gas",
        "electronegativity": 0,
        "valenceElectrons": 8,
        "bonds": 0,
        "shells": [2, 8],
        "group": 18,
        "period": 2,
        "radioactive": false
    },
    {
        "symbol": "Na",
        "name": "Sodium",
        "atomicNumber": 11,
        "atomicMass": 22.990,
        "state": "Solid",
        "category": "Alkali Metal",
        "electronegativity": 0.93,
        "valenceElectrons": 1,
        "bonds": 1,
        "shells": [2, 8, 1],
        "group": 1,
        "period": 3,
        "radioactive": false
    },
    {
        "symbol": "Mg",
        "name": "Magnesium",
        "atomicNumber": 12,
        "atomicMass": 24.305,
        "state": "Solid",
        "category": "Alkaline Earth Metal",
        "electronegativity": 1.31,
        "valenceElectrons": 2,
        "bonds": 2,
        "shells": [2, 8, 2],
        "group": 2,
        "period": 3,
        "radioactive": false
    },
    {
        "symbol": "Al",
        "name": "Aluminium",
        "atomicNumber": 13,
        "atomicMass": 26.982,
        "state": "Solid",
        "category": "Post-transition Metal",
        "electronegativity": 1.61,
        "valenceElectrons": 3,
        "bonds": 3,
        "shells": [2, 8, 3],
        "group": 13,
        "period": 3,
        "radioactive": false
    },
    {
        "symbol": "Si",
        "name": "Silicon",
        "atomicNumber": 14,
        "atomicMass": 28.085,
        "state": "Solid",
        "category": "Metalloid",
        "electronegativity": 1.90,
        "valenceElectrons": 4,
        "bonds": 4,
        "shells": [2, 8, 4],
        "group": 14,
        "period": 3,
        "radioactive": false
    },
    {
        "symbol": "P",
        "name": "Phosphorus",
        "atomicNumber": 15,
        "atomicMass": 30.974,
        "state": "Solid",
        "category": "Nonmetal",
        "electronegativity": 2.19,
        "valenceElectrons": 5,
        "bonds": 3,
        "shells": [2, 8, 5],
        "group": 15,
        "period": 3,
        "radioactive": false
    },
    {
        "symbol": "S",
        "name": "Sulfur",
        "atomicNumber": 16,
        "atomicMass": 32.06,
        "state": "Solid",
        "category": "Nonmetal",
        "electronegativity": 2.58,
        "valenceElectrons": 6,
        "bonds": 2,
        "shells": [2, 8, 6],
        "group": 16,
        "period": 3,
        "radioactive": false
    },
    {
        "symbol": "Cl",
        "name": "Chlorine",
        "atomicNumber": 17,
        "atomicMass": 35.45,
        "state": "Gas",
        "category": "Halogen",
        "electronegativity": 3.16,
        "valenceElectrons": 7,
        "bonds": 1,
        "shells": [2, 8, 7],
        "group": 17,
        "period": 3,
        "radioactive": false
    },
    {
        "symbol": "Ar",
        "name": "Argon",
        "atomicNumber": 18,
        "atomicMass": 39.948,
        "state": "Gas",
        "category": "Noble Gas",
        "electronegativity": 0,
        "valenceElectrons": 8,
        "bonds": 0,
        "shells": [2, 8, 8],
        "group": 18,
        "period": 3,
        "radioactive": false
    },
    {
        "symbol": "K",
        "name": "Potassium",
        "atomicNumber": 19,
        "atomicMass": 39.098,
        "state": "Solid",
        "category": "Alkali Metal",
        "electronegativity": 0.82,
        "valenceElectrons": 1,
        "bonds": 1,
        "shells": [2, 8, 8, 1],
        "group": 1,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Ca",
        "name": "Calcium",
        "atomicNumber": 20,
        "atomicMass": 40.078,
        "state": "Solid",
        "category": "Alkaline Earth Metal",
        "electronegativity": 1.00,
        "valenceElectrons": 2,
        "bonds": 2,
        "shells": [2, 8, 8, 2],
        "group": 2,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Sc",
        "name": "Scandium",
        "atomicNumber": 21,
        "atomicMass": 44.956,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.36,
        "valenceElectrons": 3,
        "bonds": 3,
        "group": 3,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Ti",
        "name": "Titanium",
        "atomicNumber": 22,
        "atomicMass": 47.867,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.54,
        "valenceElectrons": 4,
        "group": 4,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "V",
        "name": "Vanadium",
        "atomicNumber": 23,
        "atomicMass": 50.942,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.63,
        "valenceElectrons": 5,
        "group": 5,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Cr",
        "name": "Chromium",
        "atomicNumber": 24,
        "atomicMass": 51.996,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.66,
        "valenceElectrons": 6,
        "group": 6,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Mn",
        "name": "Manganese",
        "atomicNumber": 25,
        "atomicMass": 54.938,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.55,
        "group": 7,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Fe",
        "name": "Iron",
        "atomicNumber": 26,
        "atomicMass": 55.845,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.83,
        "group": 8,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Co",
        "name": "Cobalt",
        "atomicNumber": 27,
        "atomicMass": 58.933,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.88,
        "group": 9,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Ni",
        "name": "Nickel",
        "atomicNumber": 28,
        "atomicMass": 58.693,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.91,
        "group": 10,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Cu",
        "name": "Copper",
        "atomicNumber": 29,
        "atomicMass": 63.546,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.90,
        "group": 11,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Zn",
        "name": "Zinc",
        "atomicNumber": 30,
        "atomicMass": 65.38,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.65,
        "group": 12,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Ga",
        "name": "Gallium",
        "atomicNumber": 31,
        "atomicMass": 69.723,
        "state": "Solid",
        "category": "Post-transition Metal",
        "electronegativity": 1.81,
        "group": 13,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Ge",
        "name": "Germanium",
        "atomicNumber": 32,
        "atomicMass": 72.630,
        "state": "Solid",
        "category": "Metalloid",
        "electronegativity": 2.01,
        "group": 14,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "As",
        "name": "Arsenic",
        "atomicNumber": 33,
        "atomicMass": 74.922,
        "state": "Solid",
        "category": "Metalloid",
        "electronegativity": 2.18,
        "group": 15,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Se",
        "name": "Selenium",
        "atomicNumber": 34,
        "atomicMass": 78.971,
        "state": "Solid",
        "category": "Nonmetal",
        "electronegativity": 2.55,
        "group": 16,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Br",
        "name": "Bromine",
        "atomicNumber": 35,
        "atomicMass": 79.904,
        "state": "Liquid",
        "category": "Halogen",
        "electronegativity": 2.96,
        "group": 17,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Kr",
        "name": "Krypton",
        "atomicNumber": 36,
        "atomicMass": 83.798,
        "state": "Gas",
        "category": "Noble Gas",
        "group": 18,
        "period": 4,
        "radioactive": false
    },
    {
        "symbol": "Rb",
        "name": "Rubidium",
        "atomicNumber": 37,
        "atomicMass": 85.468,
        "state": "Solid",
        "category": "Alkali Metal",
        "electronegativity": 0.82,
        "group": 1,
        "period": 5,
        "radioactive": false
    },
    {
        "symbol": "Sr",
        "name": "Strontium",
        "atomicNumber": 38,
        "atomicMass": 87.62,
        "state": "Solid",
        "category": "Alkaline Earth Metal",
        "electronegativity": 0.95,
        "group": 2,
        "period": 5,
        "radioactive": false
    },
    {
        "symbol": "Y",
        "name": "Yttrium",
        "atomicNumber": 39,
        "atomicMass": 88.906,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.22,
        "group": 3,
        "period": 5,
        "radioactive": false
    },
    {
        "symbol": "Zr",
        "name": "Zirconium",
        "atomicNumber": 40,
        "atomicMass": 91.224,
        "state": "Solid",
        "category": "Transition Metal",
        "electronegativity": 1.33,
        "group": 4,
        "period": 5,
        "radioactive": false
    },
    {
        "symbol": "Nb",
        "name": "Niobium",
        "atomicNumber": 41,
        "atomicMass": 92.906,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 5,
        "period": 5,
        "electronegativity": 1.6,
        "radioactive": false
    },
    {
        "symbol": "Mo",
        "name": "Molybdenum",
        "atomicNumber": 42,
        "atomicMass": 95.95,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 6,
        "period": 5,
        "electronegativity": 2.16,
        "radioactive": false
    },
    {
        "symbol": "Tc",
        "name": "Technetium",
        "atomicNumber": 43,
        "atomicMass": 98,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 7,
        "period": 5,
        "electronegativity": 1.9,
        "radioactive": true
    },
    {
        "symbol": "Ru",
        "name": "Ruthenium",
        "atomicNumber": 44,
        "atomicMass": 101.07,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 8,
        "period": 5,
        "electronegativity": 2.2,
        "radioactive": false
    },
    {
        "symbol": "Rh",
        "name": "Rhodium",
        "atomicNumber": 45,
        "atomicMass": 102.91,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 9,
        "period": 5,
        "electronegativity": 2.28,
        "radioactive": false
    },
    {
        "symbol": "Pd",
        "name": "Palladium",
        "atomicNumber": 46,
        "atomicMass": 106.42,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 10,
        "period": 5,
        "electronegativity": 2.20,
        "radioactive": false
    },
    {
        "symbol": "Ag",
        "name": "Silver",
        "atomicNumber": 47,
        "atomicMass": 107.87,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 11,
        "period": 5,
        "electronegativity": 1.93,
        "radioactive": false
    },
    {
        "symbol": "Cd",
        "name": "Cadmium",
        "atomicNumber": 48,
        "atomicMass": 112.41,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 12,
        "period": 5,
        "electronegativity": 1.69,
        "radioactive": false
    },
    {
        "symbol": "In",
        "name": "Indium",
        "atomicNumber": 49,
        "atomicMass": 114.82,
        "state": "Solid",
        "category": "Post-transition Metal",
        "group": 13,
        "period": 5,
        "electronegativity": 1.78,
        "radioactive": false
    },
    {
        "symbol": "Sn",
        "name": "Tin",
        "atomicNumber": 50,
        "atomicMass": 118.71,
        "state": "Solid",
        "category": "Post-transition Metal",
        "group": 14,
        "period": 5,
        "electronegativity": 1.96,
        "radioactive": false
    },
    {
        "symbol": "Sb",
        "name": "Antimony",
        "atomicNumber": 51,
        "atomicMass": 121.76,
        "state": "Solid",
        "category": "Metalloid",
        "group": 15,
        "period": 5,
        "electronegativity": 2.05,
        "radioactive": false
    },
    {
        "symbol": "Te",
        "name": "Tellurium",
        "atomicNumber": 52,
        "atomicMass": 127.60,
        "state": "Solid",
        "category": "Metalloid",
        "group": 16,
        "period": 5,
        "electronegativity": 2.10,
        "radioactive": false
    },
    {
        "symbol": "I",
        "name": "Iodine",
        "atomicNumber": 53,
        "atomicMass": 126.90,
        "state": "Solid",
        "category": "Halogen",
        "group": 17,
        "period": 5,
        "electronegativity": 2.66,
        "radioactive": false
    },
    {
        "symbol": "Xe",
        "name": "Xenon",
        "atomicNumber": 54,
        "atomicMass": 131.29,
        "state": "Gas",
        "category": "Noble Gas",
        "group": 18,
        "period": 5,
        "electronegativity": 0,
        "radioactive": false
    },
    {
        "symbol": "Cs",
        "name": "Cesium",
        "atomicNumber": 55,
        "atomicMass": 132.91,
        "state": "Solid",
        "category": "Alkali Metal",
        "group": 1,
        "period": 6,
        "electronegativity": 0.79,
        "radioactive": false
    },
    {
        "symbol": "Ba",
        "name": "Barium",
        "atomicNumber": 56,
        "atomicMass": 137.33,
        "state": "Solid",
        "category": "Alkaline Earth Metal",
        "group": 2,
        "period": 6,
        "electronegativity": 0.89,
        "radioactive": false
    },
    {
        "symbol": "La",
        "name": "Lanthanum",
        "atomicNumber": 57,
        "atomicMass": 138.91,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.10,
        "radioactive": false
    },
    {
        "symbol": "Ce",
        "name": "Cerium",
        "atomicNumber": 58,
        "atomicMass": 140.12,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.12,
        "radioactive": false
    },
    {
        "symbol": "Pr",
        "name": "Praseodymium",
        "atomicNumber": 59,
        "atomicMass": 140.91,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.13,
        "radioactive": false
    },
    {
        "symbol": "Nd",
        "name": "Neodymium",
        "atomicNumber": 60,
        "atomicMass": 144.24,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3, "period": 6,
        "electronegativity": 1.14,
        "radioactive": false
    },
    {
        "symbol": "Pm",
        "name": "Promethium",
        "atomicNumber": 61,
        "atomicMass": 145,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.13,
        "radioactive": true
    },
    {
        "symbol": "Sm",
        "name": "Samarium",
        "atomicNumber": 62,
        "atomicMass": 150.36,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.17,
        "radioactive": false
    },
    {
        "symbol": "Eu",
        "name": "Europium",
        "atomicNumber": 63,
        "atomicMass": 151.96,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.20,
        "radioactive": false
    },
    {
        "symbol": "Gd",
        "name": "Gadolinium",
        "atomicNumber": 64,
        "atomicMass": 157.25,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.20,
        "radioactive": false
    },
    {
        "symbol": "Tb",
        "name": "Terbium",
        "atomicNumber": 65,
        "atomicMass": 158.93,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.10,
        "radioactive": false
    },
    {
        "symbol": "Dy",
        "name": "Dysprosium",
        "atomicNumber": 66,
        "atomicMass": 162.50,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.22,
        "radioactive": false
    },
    {
        "symbol": "Ho",
        "name": "Holmium",
        "atomicNumber": 67,
        "atomicMass": 164.93,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.23,
        "radioactive": false
    },
    {
        "symbol": "Er",
        "name": "Erbium",
        "atomicNumber": 68,
        "atomicMass": 167.26,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.24,
        "radioactive": false
    },
    {
        "symbol": "Tm",
        "name": "Thulium",
        "atomicNumber": 69,
        "atomicMass": 168.93,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.25,
        "radioactive": false
    },
    {
        "symbol": "Yb",
        "name": "Ytterbium",
        "atomicNumber": 70,
        "atomicMass": 173.05,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.10,
        "radioactive": false
    },
    {
        "symbol": "Lu",
        "name": "Lutetium",
        "atomicNumber": 71,
        "atomicMass": 174.97,
        "state": "Solid",
        "category": "Lanthanide",
        "group": 3,
        "period": 6,
        "electronegativity": 1.27,
        "radioactive": false
    },
    {
        "symbol": "Hf",
        "name": "Hafnium",
        "atomicNumber": 72,
        "atomicMass": 178.49,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 4,
        "period": 6,
        "electronegativity": 1.30,
        "radioactive": false
    },
    {
        "symbol": "Ta",
        "name": "Tantalum",
        "atomicNumber": 73,
        "atomicMass": 180.95,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 5,
        "period": 6,
        "electronegativity": 1.50,
        "radioactive": false
    },
    {
        "symbol": "W",
        "name": "Tungsten",
        "atomicNumber": 74,
        "atomicMass": 183.84,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 6,
        "period": 6,
        "electronegativity": 2.36,
        "radioactive": false
    },
    {
        "symbol": "Re",
        "name": "Rhenium",
        "atomicNumber": 75,
        "atomicMass": 186.21,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 7,
        "period": 6,
        "electronegativity": 1.90,
        "radioactive": false
    },
    {
        "symbol": "Os",
        "name": "Osmium",
        "atomicNumber": 76,
        "atomicMass": 190.23,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 8,
        "period": 6,
        "electronegativity": 2.20,
        "radioactive": false
    },
    {
        "symbol": "Ir",
        "name": "Iridium",
        "atomicNumber": 77,
        "atomicMass": 192.22,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 9,
        "period": 6,
        "electronegativity": 2.20,
        "radioactive": false
    },
    {
        "symbol": "Pt",
        "name": "Platinum",
        "atomicNumber": 78,
        "atomicMass": 195.08,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 10,
        "period": 6,
        "electronegativity": 2.28,
        "radioactive": false
    },
    {
        "symbol": "Au",
        "name": "Gold",
        "atomicNumber": 79,
        "atomicMass": 196.97,
        "state": "Solid",
        "category": "Transition Metal",
        "group": 11,
        "period": 6,
        "electronegativity": 2.54,
        "radioactive": false
    },
    {
        "symbol": "Hg",
        "name": "Mercury",
        "atomicNumber": 80,
        "atomicMass": 200.59,
        "state": "Liquid",
        "category": "Transition Metal",
        "group": 12,
        "period": 6,
        "electronegativity": 2.00,
        "radioactive": false
    },
    {
        "symbol": "Tl",
        "name": "Thallium",
        "atomicNumber": 81,
        "atomicMass": 204.38,
        "state": "Solid",
        "category": "Post-transition Metal",
        "group": 13,
        "period": 6,
        "electronegativity": 1.62,
        "radioactive": false
    },
    {
        "symbol": "Pb",
        "name": "Lead",
        "atomicNumber": 82,
        "atomicMass": 207.2,
        "state": "Solid",
        "category": "Post-transition Metal",
        "group": 14,
        "period": 6,
        "electronegativity": 2.33,
        "radioactive": false
    },
    {
        "symbol": "Bi",
        "name": "Bismuth",
        "atomicNumber": 83,
        "atomicMass": 208.98,
        "state": "Solid",
        "category": "Post-transition Metal",
        "group": 15,
        "period": 6,
        "electronegativity": 2.02,
        "radioactive": false
    },
    {
        "symbol": "Po",
        "name": "Polonium",
        "atomicNumber": 84,
        "atomicMass": 209,
        "state": "Solid",
        "category": "Metalloid",
        "group": 16,
        "period": 6,
        "electronegativity": 2.0,
        "radioactive": true
    },
    {
        "symbol": "At",
        "name": "Astatine",
        "atomicNumber": 85,
        "atomicMass": 210,
        "state": "Solid",
        "category": "Halogen",
        "group": 17,
        "period": 6,
        "electronegativity": 2.2,
        "radioactive": true
    },
    {
        "symbol": "Rn",
        "name": "Radon",
        "atomicNumber": 86,
        "atomicMass": 222,
        "state": "Gas",
        "category": "Noble Gas",
        "group": 18,
        "period": 6,
        "electronegativity": 0,
        "radioactive": true
    },
    {
        "symbol": "Fr",
        "name": "Francium",
        "atomicNumber": 87,
        "atomicMass": 223,
        "state": "Solid",
        "category": "Alkali Metal",
        "group": 1,
        "period": 7,
        "electronegativity": 0.7,
        "radioactive": true
    },
    {
        "symbol": "Ra",
        "name": "Radium",
        "atomicNumber": 88,
        "atomicMass": 226,
        "state": "Solid",
        "category": "Alkaline Earth Metal",
        "group": 2,
        "period": 7,
        "electronegativity": 0.9,
        "radioactive": true
    },
    {
        "symbol": "Ac",
        "name": "Actinium",
        "atomicNumber": 89,
        "atomicMass": 227,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.1,
        "radioactive": true
    },
    {
        "symbol": "Th",
        "name": "Thorium",
        "atomicNumber": 90,
        "atomicMass": 232.04,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.3,
        "radioactive": true
    },
    {
        "symbol": "Pa",
        "name": "Protactinium",
        "atomicNumber": 91,
        "atomicMass": 231.04,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.5,
        "radioactive": true
    },
    {
        "symbol": "U",
        "name": "Uranium",
        "atomicNumber": 92,
        "atomicMass": 238.03,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.38,
        "radioactive": true
    },
    {
        "symbol": "Np",
        "name": "Neptunium",
        "atomicNumber": 93,
        "atomicMass": 237,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.36,
        "radioactive": true
    },
    {
        "symbol": "Pu",
        "name": "Plutonium",
        "atomicNumber": 94,
        "atomicMass": 244,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.28,
        "radioactive": true
    },
    {
        "symbol": "Am",
        "name": "Americium",
        "atomicNumber": 95,
        "atomicMass": 243,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.3,
        "radioactive": true
    },
    {
        "symbol": "Cm",
        "name": "Curium",
        "atomicNumber": 96,
        "atomicMass": 247,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.3,
        "radioactive": true
    },
    {
        "symbol": "Bk",
        "name": "Berkelium",
        "atomicNumber": 97,
        "atomicMass": 247,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "radioactive": true
    },
    {
        "symbol": "Cf",
        "name": "Californium",
        "atomicNumber": 98,
        "atomicMass": 251,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "radioactive": true
    },
    {
        "symbol": "Es",
        "name": "Einsteinium",
        "atomicNumber": 99,
        "atomicMass": 252,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "radioactive": true
    },
    {
        "symbol": "Fm",
        "name": "Fermium",
        "atomicNumber": 100,
        "atomicMass": 257,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "radioactive": true
    },
    {
        "symbol": "Tl",
        "name": "Thallium",
        "atomicNumber": 81,
        "atomicMass": 204.38,
        "state": "Solid",
        "category": "Post-transition Metal",
        "group": 13,
        "period": 6,
        "electronegativity": 1.62,
        "radioactive": false
    },
    {
        "symbol": "Pb",
        "name": "Lead",
        "atomicNumber": 82,
        "atomicMass": 207.2,
        "state": "Solid",
        "category": "Post-transition Metal",
        "group": 14,
        "period": 6,
        "electronegativity": 2.33,
        "radioactive": false
    },
    {
        "symbol": "Bi",
        "name": "Bismuth",
        "atomicNumber": 83,
        "atomicMass": 208.98,
        "state": "Solid",
        "category": "Post-transition Metal",
        "group": 15,
        "period": 6,
        "electronegativity": 2.02,
        "radioactive": false
    },
    {
        "symbol": "Po",
        "name": "Polonium",
        "atomicNumber": 84,
        "atomicMass": 209,
        "state": "Solid",
        "category": "Metalloid",
        "group": 16,
        "period": 6,
        "electronegativity": 2.0,
        "radioactive": true
    },
    {
        "symbol": "At",
        "name": "Astatine",
        "atomicNumber": 85,
        "atomicMass": 210,
        "state": "Solid",
        "category": "Halogen",
        "group": 17,
        "period": 6,
        "electronegativity": 2.2,
        "radioactive": true
    },
    {
        "symbol": "Rn",
        "name": "Radon",
        "atomicNumber": 86,
        "atomicMass": 222,
        "state": "Gas",
        "category": "Noble Gas",
        "group": 18,
        "period": 6,
        "electronegativity": 0,
        "radioactive": true
    },
    {
        "symbol": "Fr",
        "name": "Francium",
        "atomicNumber": 87,
        "atomicMass": 223,
        "state": "Solid",
        "category": "Alkali Metal",
        "group": 1,
        "period": 7,
        "electronegativity": 0.7,
        "radioactive": true
    },
    {
        "symbol": "Ra",
        "name": "Radium",
        "atomicNumber": 88,
        "atomicMass": 226,
        "state": "Solid",
        "category": "Alkaline Earth Metal",
        "group": 2,
        "period": 7,
        "electronegativity": 0.9,
        "radioactive": true
    },
    {
        "symbol": "Ac",
        "name": "Actinium",
        "atomicNumber": 89,
        "atomicMass": 227,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.1,
        "radioactive": true
    },
    {
        "symbol": "Th",
        "name": "Thorium",
        "atomicNumber": 90,
        "atomicMass": 232.04,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.3,
        "radioactive": true
    },
    {
        "symbol": "Pa",
        "name": "Protactinium",
        "atomicNumber": 91,
        "atomicMass": 231.04,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.5,
        "radioactive": true
    },
    {
        "symbol": "U",
        "name": "Uranium",
        "atomicNumber": 92,
        "atomicMass": 238.03,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.38,
        "radioactive": true
    },
    {
        "symbol": "Np",
        "name": "Neptunium",
        "atomicNumber": 93,
        "atomicMass": 237,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.36,
        "radioactive": true
    },
    {
        "symbol": "Pu",
        "name": "Plutonium",
        "atomicNumber": 94,
        "atomicMass": 244,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.28,
        "radioactive": true
    },
    {
        "symbol": "Am",
        "name": "Americium",
        "atomicNumber": 95,
        "atomicMass": 243,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.3,
        "radioactive": true
    },
    {
        "symbol": "Cm",
        "name": "Curium",
        "atomicNumber": 96,
        "atomicMass": 247,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "electronegativity": 1.3,
        "radioactive": true
    },
    {
        "symbol": "Bk",
        "name": "Berkelium",
        "atomicNumber": 97,
        "atomicMass": 247,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "radioactive": true
    },
    {
        "symbol": "Cf",
        "name": "Californium",
        "atomicNumber": 98,
        "atomicMass": 251,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "radioactive": true
    },
    {
        "symbol": "Es",
        "name": "Einsteinium",
        "atomicNumber": 99,
        "atomicMass": 252,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "radioactive": true
    },
    {
        "symbol": "Fm",
        "name": "Fermium",
        "atomicNumber": 100,
        "atomicMass": 257,
        "state": "Solid",
        "category": "Actinide",
        "group": 3,
        "period": 7,
        "radioactive": true
    }
]

/* =========================
   أغلفة الإلكترونات
========================= */

const maxElectronsPerShell = [
    2,
    8,
    18,
    32
];

/* =========================
   عناصر DOM
========================= */

const elementSelect =
    document.getElementById("elementSelect");

const periodicTableContainer =
    document.getElementById("periodicTable");

const protonsDiv =
    document.getElementById("protons");

const neutronsDiv =
    document.getElementById("neutrons");

const electronsDiv =
    document.getElementById("electrons");

const nucleus =
    document.getElementById("nucleus");

/* =========================
   إنشاء القائمة
========================= */

function createElementSelect() {

    elementSelect.innerHTML =
        '<option value="">اختر عنصر</option>';

    periodicTable.forEach(element => {

        const option =
            document.createElement("option");

        option.value =
            element.symbol;

        option.textContent =
            `${element.symbol} - ${element.name}`;

        elementSelect.appendChild(option);

    });

}

/* =========================
   إنشاء الجدول الدوري
========================= */

function createPeriodicTable() {

    if (!periodicTableContainer) return;

    periodicTableContainer.innerHTML = "";

    periodicTable.forEach(element => {

        const btn =
            document.createElement("button");

        btn.className =
            "element-btn";

        btn.textContent =
            element.symbol;

        btn.addEventListener("click", () => {

            selectElement(
                element.symbol
            );

        });

        periodicTableContainer
            .appendChild(btn);

    });

}

/* =========================
   اختيار عنصر
========================= */

function selectElement(symbol) {

    const index =
        periodicTable.findIndex(
            e => e.symbol === symbol
        );

    if (index === -1) return;

    const element =
        periodicTable[index];

    atomData.selectedElement =
        symbol;

    atomData.protons =
        index + 1;

    atomData.electrons =
        index + 1;

    atomData.neutrons =
        Math.round(
            atomData.protons * 1.2
        );

    updateAtom();

}

/* =========================
   تحديث الذرة كاملة
========================= */

function updateAtom() {

    createNucleus();

    renderElectrons();

    updateInfo();

    updateTemperatureEffects();

}

/* =========================
   إنشاء النواة
========================= */

function createNucleus() {

    const nucleus =
        document.getElementById("nucleus");

    nucleus.innerHTML = "";

    const particles = [];

    for (let i = 0; i < atomData.protons; i++) {
        particles.push("proton");
    }

    for (let i = 0; i < atomData.neutrons; i++) {
        particles.push("neutron");
    }

    const radius = 35;

    particles.forEach((type, index) => {

        const particle =
            document.createElement("div");

        particle.className = type;

        const angle =
            (Math.PI * 2 * index) /
            particles.length;

        const randomRadius =
            Math.random() * radius;

        const x =
            Math.cos(angle) *
            randomRadius;

        const y =
            Math.sin(angle) *
            randomRadius;

        particle.style.left =
            `calc(50% + ${x}px)`;

        particle.style.top =
            `calc(50% + ${y}px)`;

        nucleus.appendChild(particle);

    });

}

/* =========================
   توزيع الإلكترونات
========================= */

function calculateShells() {

    let remaining =
        atomData.electrons;

    let shells = [];

    for (
        let i = 0;
        i < maxElectronsPerShell.length;
        i++
    ) {

        const value =
            Math.min(
                remaining,
                maxElectronsPerShell[i]
            );

        shells.push(value);

        remaining -= value;

        if (
            remaining <= 0
        ) break;

    }

    return shells;

}

/* =========================
   رسم الإلكترونات
========================= */

function renderElectrons() {

    electronsDiv.innerHTML = "";

    const shells =
        calculateShells();

    const shellRadius = [
        75,
        125,
        175,
        225
    ];

    shells.forEach(
        (count, shellIndex) => {

            for (
                let i = 0;
                i < count;
                i++
            ) {

                const angle =
                    (360 / count) * i;

                const electron =
                    document.createElement("div");

                electron.className =
                    "electron";

                const x =
                    Math.cos(
                        angle *
                        Math.PI / 180
                    ) *
                    shellRadius[shellIndex];

                const y =
                    Math.sin(
                        angle *
                        Math.PI / 180
                    ) *
                    shellRadius[shellIndex];

                electron.style.left =
                    `calc(50% + ${x}px - 7px)`;

                electron.style.top =
                    `calc(50% + ${y}px - 7px)`;

                electronsDiv.appendChild(
                    electron
                );

            }

        });

}

/* =========================
   تحديث المعلومات
========================= */

function updateInfo() {

    document.getElementById(
        "protonCount"
    ).textContent =
        atomData.protons;

    document.getElementById(
        "neutronCount"
    ).textContent =
        atomData.neutrons;

    document.getElementById(
        "electronCount"
    ).textContent =
        atomData.electrons;

    document.getElementById(
        "temperatureDisplay"
    ).textContent =
        atomData.temperature + "°C";

    document.getElementById(
        "atomicNumber"
    ).textContent =
        atomData.protons;

    document.getElementById(
        "atomicMass"
    ).textContent =
        atomData.protons +
        atomData.neutrons;

    document.getElementById(
        "chargeValue"
    ).textContent =
        atomData.protons -
        atomData.electrons;

    updateShellInfo();

    updateElementInfo();

    updateStability();

}

/* =========================
   معلومات الأغلفة
========================= */

function updateShellInfo() {

    const shellInfo =
        document.getElementById(
            "shellInfo"
        );

    shellInfo.innerHTML = "";

    const shells =
        calculateShells();

    shells.forEach(
        (count, index) => {

            const li =
                document.createElement("li");

            li.textContent =
                `المستوى ${index + 1}: ${count} إلكترون`;

            shellInfo.appendChild(li);

        });

}

/* =========================
   معلومات العنصر
========================= */

function updateElementInfo() {

    const element =
        periodicTable.find(
            e =>
                e.symbol ===
                atomData.selectedElement
        );

    if (!element) return;

    document.getElementById(
        "elementName"
    ).textContent =
        element.name;

    document.getElementById(
        "elementSymbol"
    ).textContent =
        element.symbol;

    document.getElementById(
        "stateValue"
    ).textContent =
        element.state;

    document.getElementById(
        "categoryValue"
    ).textContent =
        element.category;

    document.getElementById(
        "electroValue"
    ).textContent =
        element.electro;

    document.getElementById(
        "bondValue"
    ).textContent =
        element.bonds;

}

/* =========================
   الاستقرار
========================= */

function updateStability() {

    let stability = 100;

    const charge =
        Math.abs(
            atomData.protons -
            atomData.electrons
        );

    stability -= charge * 5;

    stability -=
        Math.abs(
            atomData.neutrons -
            atomData.protons
        ) * 2;

    if (
        atomData.temperature > 100
    ) {
        stability -=
            (atomData.temperature - 100)
            / 10;
    }

    stability =
        Math.max(
            0,
            Math.min(100, stability)
        );

    document.getElementById(
        "stabilityValue"
    ).textContent =
        Math.round(stability) + "%";

    document.getElementById(
        "stabilityFill"
    ).style.width =
        stability + "%";

    if (stability > 70) {

        document.getElementById(
            "stabilityFill"
        ).style.background =
            "#00ff66";

    }
    else if (stability > 40) {

        document.getElementById(
            "stabilityFill"
        ).style.background =
            "#ffcc00";

    }
    else {

        document.getElementById(
            "stabilityFill"
        ).style.background =
            "#ff3333";

    }

}

/* =========================
   الحرارة
========================= */

function updateTemperatureEffects() {

    if (
        atomData.temperature > 300
    ) {

        nucleus.style.boxShadow =
            "0 0 80px red";

    }
    else if (
        atomData.temperature < 0
    ) {

        nucleus.style.boxShadow =
            "0 0 80px cyan";

    }
    else {

        nucleus.style.boxShadow =
            "0 0 40px crimson";

    }

}

/* =========================
   البروتونات
========================= */

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

/* =========================
   النيوترونات
========================= */

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

/* =========================
   الإلكترونات
========================= */

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

/* =========================
   الحرارة
========================= */

function heatUp() {

    atomData.temperature += 25;

    document.body.classList.add("hot");

    setTimeout(() => {
        document.body.classList.remove("hot");
    }, 500);

    updateAtom();
}

function coolDown() {

    atomData.temperature -= 25;

    document.body.classList.add("cold");

    setTimeout(() => {
        document.body.classList.remove("cold");
    }, 500);

    updateAtom();
}

/* =========================
   الحفظ
========================= */

function saveAtom() {

    localStorage.setItem(
        "saved_atom",
        JSON.stringify(atomData)
    );

    alert("تم حفظ الذرة");
}

/* =========================
   التحميل
========================= */

function loadAtom() {

    const data =
        localStorage.getItem(
            "saved_atom"
        );

    if (!data) {

        alert("لا يوجد حفظ سابق");
        return;
    }

    Object.assign(
        atomData,
        JSON.parse(data)
    );

    updateAtom();

    alert("تم تحميل الذرة");
}

/* =========================
   إعادة ضبط
========================= */

function resetAtom() {

    atomData.protons = 1;
    atomData.neutrons = 0;
    atomData.electrons = 1;
    atomData.temperature = 25;
    atomData.selectedElement = "H";

    updateAtom();
}

/* =========================
   تصدير JSON
========================= */

function exportAtom() {

    const blob =
        new Blob(
            [
                JSON.stringify(
                    atomData,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "atom.json";

    link.click();
}

/* =========================
   ربط الأزرار
========================= */

document.getElementById("addProton")
    .addEventListener(
        "click",
        addProton
    );

document.getElementById("removeProton")
    .addEventListener(
        "click",
        removeProton
    );

document.getElementById("addNeutron")
    .addEventListener(
        "click",
        addNeutron
    );

document.getElementById("removeNeutron")
    .addEventListener(
        "click",
        removeNeutron
    );

document.getElementById("addElectron")
    .addEventListener(
        "click",
        addElectron
    );

document.getElementById("removeElectron")
    .addEventListener(
        "click",
        removeElectron
    );

document.getElementById("heatBtn")
    .addEventListener(
        "click",
        heatUp
    );

document.getElementById("coolBtn")
    .addEventListener(
        "click",
        coolDown
    );

document.getElementById("saveAtom")
    .addEventListener(
        "click",
        saveAtom
    );

document.getElementById("loadAtom")
    .addEventListener(
        "click",
        loadAtom
    );

document.getElementById("resetAtom")
    .addEventListener(
        "click",
        resetAtom
    );

document.getElementById("exportAtom")
    .addEventListener(
        "click",
        exportAtom
    );

/* =========================
   البروتونات
========================= */

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

/* =========================
   النيوترونات
========================= */

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

/* =========================
   الإلكترونات
========================= */

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

/* =========================
   الحرارة
========================= */

function heatUp() {

    atomData.temperature += 25;

    document.body.classList.add("hot");

    setTimeout(() => {
        document.body.classList.remove("hot");
    }, 500);

    updateAtom();
}

function coolDown() {

    atomData.temperature -= 25;

    document.body.classList.add("cold");

    setTimeout(() => {
        document.body.classList.remove("cold");
    }, 500);

    updateAtom();
}

/* =========================
   الحفظ
========================= */

function saveAtom() {

    localStorage.setItem(
        "saved_atom",
        JSON.stringify(atomData)
    );

    alert("تم حفظ الذرة");
}

/* =========================
   التحميل
========================= */

function loadAtom() {

    const data =
        localStorage.getItem(
            "saved_atom"
        );

    if (!data) {

        alert("لا يوجد حفظ سابق");
        return;
    }

    Object.assign(
        atomData,
        JSON.parse(data)
    );

    updateAtom();

    alert("تم تحميل الذرة");
}

/* =========================
   إعادة ضبط
========================= */

function resetAtom() {

    atomData.protons = 1;
    atomData.neutrons = 0;
    atomData.electrons = 1;
    atomData.temperature = 25;
    atomData.selectedElement = "H";

    updateAtom();
}

/* =========================
   تصدير JSON
========================= */

function exportAtom() {

    const blob =
        new Blob(
            [
                JSON.stringify(
                    atomData,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "atom.json";

    link.click();
}

/* =========================
   ربط الأزرار
========================= */

document.getElementById("addProton")
    .addEventListener(
        "click",
        addProton
    );

document.getElementById("removeProton")
    .addEventListener(
        "click",
        removeProton
    );

document.getElementById("addNeutron")
    .addEventListener(
        "click",
        addNeutron
    );

document.getElementById("removeNeutron")
    .addEventListener(
        "click",
        removeNeutron
    );

document.getElementById("addElectron")
    .addEventListener(
        "click",
        addElectron
    );

document.getElementById("removeElectron")
    .addEventListener(
        "click",
        removeElectron
    );

document.getElementById("heatBtn")
    .addEventListener(
        "click",
        heatUp
    );

document.getElementById("coolBtn")
    .addEventListener(
        "click",
        coolDown
    );

document.getElementById("saveAtom")
    .addEventListener(
        "click",
        saveAtom
    );

document.getElementById("loadAtom")
    .addEventListener(
        "click",
        loadAtom
    );

document.getElementById("resetAtom")
    .addEventListener(
        "click",
        resetAtom
    );

document.getElementById("exportAtom")
    .addEventListener(
        "click",
        exportAtom
    );

/* =========================
   إنشاء الجدول الدوري
========================= */

function createPeriodicTable() {

    const table =
        document.getElementById(
            "periodicTable"
        );

    if (!table) return;

    table.innerHTML = "";

    periodicTable.forEach(
        element => {

            const btn =
                document.createElement(
                    "button"
                );

            btn.className =
                "element-btn";

            btn.textContent =
                element.symbol;

            btn.addEventListener(
                "click",
                () => {

                    selectElement(
                        element.symbol
                    );

                }
            );

            table.appendChild(btn);

        });

}

/* =========================
   قائمة العناصر
========================= */

function createElementSelect() {

    const select =
        document.getElementById(
            "elementSelect"
        );

    if (!select) return;

    select.innerHTML =
        `<option value="">
        اختر عنصر
     </option>`;

    periodicTable.forEach(
        element => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                element.symbol;

            option.textContent =
                `${element.symbol} - ${element.name}`;

            select.appendChild(
                option
            );

        });

}

/* =========================
   زر تحميل عنصر
========================= */

document.getElementById(
    "loadElement"
).addEventListener(
    "click",
    () => {

        const value =
            document.getElementById(
                "elementSelect"
            ).value;

        if (!value) return;

        selectElement(value);

    }
);

/* =========================
   دوران الإلكترونات
========================= */

let electronRotation = 0;

function animateElectrons() {

    electronRotation += 0.4;

    const electrons =
        document.querySelectorAll(
            ".electron"
        );

    electrons.forEach(
        (electron, index) => {

            electron.style.transform =
                `rotate(${electronRotation + index * 10}deg)`;

        });

    requestAnimationFrame(
        animateElectrons
    );

}

/* =========================
   الانفجار النووي
========================= */

function checkExplosion() {

    const charge =
        Math.abs(
            atomData.protons -
            atomData.electrons
        );

    const neutronDiff =
        Math.abs(
            atomData.neutrons -
            atomData.protons
        );

    if (
        charge > 20 ||
        neutronDiff > 40 ||
        atomData.temperature > 1000
    ) {

        triggerExplosion();

    }

}

/* =========================
   تنفيذ الانفجار
========================= */

function triggerExplosion() {

    const screen =
        document.getElementById(
            "explosionScreen"
        );

    if (!screen) return;

    screen.style.display =
        "flex";

}

/* =========================
   زر إعادة المحاولة
========================= */

const restartBtn =
    document.getElementById(
        "restartAfterExplosion"
    );

if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        () => {

            document.getElementById(
                "explosionScreen"
            ).style.display =
                "none";

            resetAtom();

        }
    );

}

/* =========================
   تحديث مع كل تغيير
========================= */

const oldUpdateAtom =
    updateAtom;

updateAtom = function () {

    oldUpdateAtom();

    checkExplosion();

};

/* =========================
   بدء التشغيل
========================= */

window.addEventListener(
    "load",
    () => {

        createPeriodicTable();

        createElementSelect();

        selectElement("H");

        animateElectrons();

    }
);