window.achievementSystem = {
  list: [
    { id: 'first-atom', title: 'أول ذرة', description: 'أنشئ أول ذرة في المختبر.', unlocked: false },
    { id: 'first-molecule', title: 'أول جزيء', description: 'أنشئ أول جزيء.', unlocked: false },
    { id: 'first-reaction', title: 'أول تفاعل', description: 'ابدأ أول تفاعل كيميائي.', unlocked: false },
    { id: 'first-explosion', title: 'أول انفجار نووي', description: 'تسبب في انفجار نووي.', unlocked: false },
    { id: 'chemistry-master', title: 'عالم كيمياء', description: 'أكمل 3 تفاعلات.', unlocked: false },
    { id: 'physics-master', title: 'عالم فيزياء', description: 'استكشف الجاذبية والطاقة والمغناطيسية.', unlocked: false }
  ],

  unlock(id) {
    const item = this.list.find((entry) => entry.id === id);
    if (item) item.unlocked = true;
  },

  getUnlockedCount() {
    return this.list.filter((item) => item.unlocked).length;
  },

  render(container) {
    container.innerHTML = this.list.map((item) => `
      <div class="achievement-item ${item.unlocked ? 'unlocked' : ''}">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    `).join('');
  }
};
