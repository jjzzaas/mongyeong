const 주요인물기본값 = {
  하루: 0,
  모모: 0,
  세나: 0,
  주요인물4: 0,
  주요인물5: 0,
  주요인물6: 0,
};

const 인물이름변환 = {
  haru: '하루',
  momo: '모모',
  sena: '세나',
  하루: '하루',
  모모: '모모',
  세나: '세나',
  주요인물4: '주요인물4',
  주요인물5: '주요인물5',
  주요인물6: '주요인물6',
};

const 성향이름변환 = {
  cautious: '신중함',
  brave: '용기',
  considerate: '배려',
  justice: '정의감',
  calm: '냉정함',
  신중함: '신중함',
  용기: '용기',
  배려: '배려',
  정의감: '정의감',
  냉정함: '냉정함',
};

const 기본스테이터스 = {
  이름: '미상',
  레벨: 1,
  힘: 1,
  민첩: 1,
  체력: 1,
  정신력: 1,
  스킬: [],
  구현무기: '없음',
};

export const createInitialGameState = () => ({
  currentChapter: 1,
  currentScene: '프롤로그_제목',

  status: {
    ...기본스테이터스,
    스킬: [...기본스테이터스.스킬],
  },

  affection: { ...주요인물기본값 },
  trust: { ...주요인물기본값 },

  traits: {
    신중함: 0,
    용기: 0,
    배려: 0,
    정의감: 0,
    냉정함: 0,
  },

  flags: {},
  choiceHistory: [],
});

const 합치기 = (기본값, 저장값 = {}, 이름변환 = {}) => {
  const 결과 = { ...기본값 };

  Object.entries(저장값).forEach(([이름, 값]) => {
    const 한글이름 = 이름변환[이름] || 이름;
    결과[한글이름] = (결과[한글이름] || 0) + Number(값 || 0);
  });

  return 결과;
};

const 스테이터스합치기 = (저장값 = {}) => ({
  ...기본스테이터스,
  ...저장값,
  스킬: Array.isArray(저장값.스킬) ? 저장값.스킬 : [],
});

export const normalizeGameState = (savedState = {}) => {
  const 기본상태 = createInitialGameState();

  return {
    ...기본상태,
    ...savedState,
    status: 스테이터스합치기(savedState.status),
    affection: 합치기(기본상태.affection, savedState.affection, 인물이름변환),
    trust: 합치기(기본상태.trust, savedState.trust, 인물이름변환),
    traits: 합치기(기본상태.traits, savedState.traits, 성향이름변환),
    flags: { ...기본상태.flags, ...(savedState.flags || {}) },
    choiceHistory: Array.isArray(savedState.choiceHistory) ? savedState.choiceHistory : [],
  };
};

export const updateStatus = (state, changes = {}) => {
  const nextState = normalizeGameState(structuredClone(state));
  const current = nextState.status;

  ['레벨', '힘', '민첩', '체력', '정신력'].forEach((key) => {
    if (Number.isFinite(changes[key])) current[key] = Math.max(0, changes[key]);
  });

  if (typeof changes.이름 === 'string') current.이름 = changes.이름;
  if (typeof changes.구현무기 === 'string') current.구현무기 = changes.구현무기;
  if (Array.isArray(changes.스킬)) current.스킬 = [...changes.스킬];

  return nextState;
};

export const recordChoice = (state, choice) => {
  const nextState = normalizeGameState(structuredClone(state));

  Object.entries(choice.affection || {}).forEach(([character, amount]) => {
    const 한글이름 = 인물이름변환[character] || character;
    nextState.affection[한글이름] = (nextState.affection[한글이름] || 0) + amount;
  });

  Object.entries(choice.trust || {}).forEach(([character, amount]) => {
    const 한글이름 = 인물이름변환[character] || character;
    nextState.trust[한글이름] = (nextState.trust[한글이름] || 0) + amount;
  });

  Object.entries(choice.traits || {}).forEach(([trait, amount]) => {
    const 한글이름 = 성향이름변환[trait] || trait;
    nextState.traits[한글이름] = (nextState.traits[한글이름] || 0) + amount;
  });

  (choice.flags || []).forEach((flag) => {
    nextState.flags[flag] = true;
  });

  nextState.choiceHistory.push({
    chapter: nextState.currentChapter,
    scene: nextState.currentScene,
    choiceId: choice.id,
    label: choice.label,
    affection: choice.affection || {},
    trust: choice.trust || {},
    traits: choice.traits || {},
    flags: choice.flags || [],
    selectedAt: Date.now(),
  });

  return nextState;
};
