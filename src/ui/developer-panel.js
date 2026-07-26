const 표시이름 = {
  주요인물4: '주요인물 4',
  주요인물5: '주요인물 5',
  주요인물6: '주요인물 6',
};

const formatValues = (values = {}) =>
  Object.entries(values)
    .map(([name, value]) => `<li><span>${표시이름[name] || name}</span><strong>${Array.isArray(value) ? (value.join(', ') || '없음') : value}</strong></li>`)
    .join('') || '<li>기록 없음</li>';

const createPanelShell = ({ title, closeLabel = '닫기', onClose } = {}) => {
  const panel = document.createElement('aside');
  panel.className = 'developer-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <div class="developer-panel__header">
      <h2>${title}</h2>
      <button type="button" data-developer-close>${closeLabel}</button>
    </div>
  `;

  panel.addEventListener('click', (event) => event.stopPropagation());
  panel.querySelector('[data-developer-close]').addEventListener('click', () => {
    panel.hidden = true;
    onClose?.();
  });

  return panel;
};

export const createAffectionPanel = ({ onClose } = {}) => {
  const panel = createPanelShell({ title: '호감도 확인', onClose });
  panel.insertAdjacentHTML('beforeend', `
    <section>
      <h3>주요 인물 호감도</h3>
      <ul data-developer-affection></ul>
    </section>
    <section class="developer-panel__notice">
      <p>버전 표시를 빠르게 5회 누르면 열리는 숨겨진 확인 기능입니다.</p>
    </section>
  `);
  return panel;
};

export const openAffectionPanel = (panel, snapshot) => {
  panel.querySelector('[data-developer-affection]').innerHTML = formatValues(snapshot.affection);
  panel.hidden = false;
};

export const createChapterNavigator = ({ chapters = [], onSelectChapter, onClose } = {}) => {
  const panel = createPanelShell({ title: '개발자 스토리 이동', onClose });
  panel.insertAdjacentHTML('beforeend', `
    <section class="developer-panel__notice">
      <h3>스토리 점검 모드</h3>
      <p>선택한 챕터의 첫 장면으로 즉시 이동합니다. 레벨·호감도·기존 저장 데이터에는 반영되지 않습니다.</p>
    </section>
    <section>
      <h3>챕터 선택</h3>
      <div class="developer-chapter-grid" data-developer-chapters></div>
    </section>
  `);

  const chapterList = panel.querySelector('[data-developer-chapters]');
  chapters.forEach((chapter, chapterIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'developer-chapter-button';
    button.innerHTML = `<strong>CHAPTER ${chapter.id}</strong><span>${chapter.title || '제목 없음'}</span>`;
    button.addEventListener('click', () => onSelectChapter?.(chapterIndex));
    chapterList.appendChild(button);
  });

  return panel;
};

export const openChapterNavigator = (panel) => {
  panel.hidden = false;
};
