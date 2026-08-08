window.chemistryUtils = {
  bondTypes: {
    ionic: 'الروابط الأيونية تنتج عن انتقال الإلكترونات بين الذرات.',
    covalent: 'الروابط التساهمية تنشأ عند مشاركة الإلكترونات بين الذرات.',
    metallic: 'الروابط الفلزية تسمح للإلكترونات بالتحرك بحرية داخل المعدن.'
  },

  moleculeTemplates: {
    H2O: {
      label: 'H₂O',
      atoms: [
        { symbol: 'O', color: '#5ae5ff', x: 110, y: 110 },
        { symbol: 'H', color: '#ffb86c', x: 40, y: 160 },
        { symbol: 'H', color: '#ffb86c', x: 180, y: 160 }
      ],
      bonds: [
        { from: 0, to: 1, angle: 18 },
        { from: 0, to: 2, angle: -18 }
      ]
    },
    CO2: {
      label: 'CO₂',
      atoms: [
        { symbol: 'C', color: '#9e7cff', x: 110, y: 110 },
        { symbol: 'O', color: '#5ae5ff', x: 35, y: 110 },
        { symbol: 'O', color: '#5ae5ff', x: 185, y: 110 }
      ],
      bonds: [
        { from: 0, to: 1, angle: 0 },
        { from: 0, to: 2, angle: 180 }
      ]
    },
    NH3: {
      label: 'NH₃',
      atoms: [
        { symbol: 'N', color: '#7ce8a3', x: 110, y: 110 },
        { symbol: 'H', color: '#ffb86c', x: 170, y: 50 },
        { symbol: 'H', color: '#ffb86c', x: 175, y: 170 },
        { symbol: 'H', color: '#ffb86c', x: 60, y: 170 }
      ],
      bonds: [
        { from: 0, to: 1, angle: 35 },
        { from: 0, to: 2, angle: -35 },
        { from: 0, to: 3, angle: 180 }
      ]
    },
    CH4: {
      label: 'CH₄',
      atoms: [
        { symbol: 'C', color: '#9e7cff', x: 110, y: 110 },
        { symbol: 'H', color: '#ffb86c', x: 190, y: 110 },
        { symbol: 'H', color: '#ffb86c', x: 110, y: 28 },
        { symbol: 'H', color: '#ffb86c', x: 110, y: 192 },
        { symbol: 'H', color: '#ffb86c', x: 32, y: 110 }
      ],
      bonds: [
        { from: 0, to: 1, angle: 0 },
        { from: 0, to: 2, angle: 90 },
        { from: 0, to: 3, angle: -90 },
        { from: 0, to: 4, angle: 180 }
      ]
    }
  },

  getReactionText(key) {
    const map = {
      H2O: 'H₂ + O → H₂O: تفاعل تكوين الماء مع انبعاث طاقة.',
      NaCl: 'Na + Cl → NaCl: تكوين ملح أيوني مستقر.',
      CO2: 'C + O₂ → CO₂: تكوين ثاني أكسيد الكربون.',
      CH4: 'CH₄ + O₂ → CO₂ + H₂O: احتراق الميثان مع إطلاق حرارة.',
      water: 'H₂ + O → H₂O: تجربة الماء تندمج فيه الهيدروجين والأكسجين لتكوين الماء.',
      salt: 'Na + Cl → NaCl: عندما يندمج الصوديوم مع الكلور يتكون كلوريد الصوديوم.',
      co2: 'C + O₂ → CO₂: يؤدي الاحتراق الكامل للكربون إلى ثاني أكسيد الكربون.',
      combustion: 'CH₄ + O₂ → CO₂ + H₂O: الاحتراق ينتج غازات ساخنة ومضيئة.'
    };
    return map[key] || 'تفاعل كيميائي جديد في المختبر.';
  }
};
