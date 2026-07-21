export const chapter004 = {
  id: 4,
  title: '훈련의 시작',
  scenes: [
    { id: 'c4-title', mode: 'black', center: 'CHAPTER 4\n\n훈련의 시작' },
    { id: 'c4-guild-scold', mode: 'city', speaker: '길드장', text: '지난 임무는 운이 좋았다. 지금 실력으로는 다음에도 살아남는다는 보장이 없다.' },
    { id: 'c4-haru-duty', mode: 'city', speaker: '길드장', text: '하루. 오늘부터 두 사람의 기초 훈련을 맡아라.' },
    { id: 'c4-haru-ask', mode: 'city', speaker: '하루', text: '두 분 모두 괜찮으시겠어요? 훈련은 생각보다 힘들 거예요.', choices: [
      { id: 'c4-ready', label: '끝까지 해보겠다고 답한다.', reply: '힘들어도 끝까지 해보겠습니다.', affection: { haru: 1 }, trust: { haru: 1 }, traits: { brave: 1 } },
      { id: 'c4-careful', label: '배워야 할 순서부터 묻는다.', reply: '기초부터 차근차근 알려주세요.', trust: { haru: 1 }, traits: { cautious: 1 } },
      { id: 'c4-momo-check', label: '모모의 상태를 먼저 확인한다.', reply: '모모 씨도 괜찮으신가요?', affection: { momo: 1 }, traits: { considerate: 1 } }
    ] },
    { id: 'c4-training-enter', mode: 'city', narration: true, text: '다음 날, 우리는 헌터지구의 훈련장에 모였다.' },
    { id: 'c4-stage1', mode: 'battle', center: '기초 훈련 1-1' },
    { id: 'c4-defeat', mode: 'after-battle', narration: true, text: '나는 제대로 공격해 보지도 못한 채 바닥에 쓰러졌다.' },
    { id: 'c4-momo-advice', mode: 'after-battle', speaker: '모모', text: '그래도 끝까지 싸웠잖아요. 처음부터 잘하는 사람은 없어요.', choices: [
      { id: 'c4-momo-thanks', label: '조언에 감사한다.', reply: '고맙습니다. 다음에는 더 오래 버텨보겠습니다.', affection: { momo: 2 }, trust: { momo: 1 } },
      { id: 'c4-momo-joke', label: '조금 민망하다고 웃는다.', reply: '이렇게 빨리 질 줄은 몰랐네요.', affection: { momo: 1 } },
      { id: 'c4-momo-focus', label: '패배 원인을 되짚는다.', reply: '움직임을 읽지 못했습니다. 다시 해보겠습니다.', traits: { cautious: 1 } }
    ] },
    { id: 'c4-stage2', mode: 'battle', center: '기초 훈련 1-2' },
    { id: 'c4-weapon-awaken', mode: 'battle', narration: true, text: '다시 일어서는 순간, 손끝에 낯선 감각이 모였다. 희미한 빛이 단검의 형태를 만들었다.' },
    { id: 'c4-haru-praise', mode: 'after-battle', speaker: '하루', text: '처음부터 형태를 만들어 냈네요. 잘하셨어요.' },
    { id: 'c4-choice-weapon', mode: 'after-battle', speaker: '주인공', text: '손에 남은 감각을 어떻게 받아들일까.', choices: [
      { id: 'c4-weapon-curious', label: '원리를 자세히 묻는다.', reply: '이 힘이 어떻게 만들어지는지 알고 싶습니다.', trust: { haru: 1 }, traits: { cautious: 1 } },
      { id: 'c4-weapon-practice', label: '바로 다시 움직여 본다.', reply: '감각이 사라지기 전에 다시 해보겠습니다.', traits: { brave: 1 }, flags: ['weapon_practice_eager'] },
      { id: 'c4-weapon-share', label: '모모에게도 보여준다.', reply: '모모 씨, 방금 보셨나요?', affection: { momo: 1 } }
    ] },
    { id: 'c4-stage3', mode: 'battle', center: '기초 훈련 1-3 ~ 1-5' },
    { id: 'c4-momo-overcome', mode: 'after-battle', narration: true, text: '모모도 두려움을 억누르고 끝까지 버텼다. 모두 지쳐 있었지만 전보다 분명 나아졌다.' },
    { id: 'c4-haru-end', mode: 'city', speaker: '하루', text: '오늘 훈련은 여기까지예요. 강해지려면 그만큼의 노력이 필요해요.' },
    { id: 'c4-choice-haru-end', mode: 'city', speaker: '하루', text: '내일부터 저는 임무를 나가야 해요. 두 분은 개인 훈련을 계속하세요.', choices: [
      { id: 'c4-end-thanks', label: '가르쳐 줘서 감사하다고 말한다.', reply: '오늘 가르쳐 주셔서 감사합니다. 잊지 않겠습니다.', affection: { haru: 2 }, trust: { haru: 1 } },
      { id: 'c4-end-worry', label: '임무를 조심하라고 말한다.', reply: '하루 씨도 임무에서 다치지 않도록 조심하세요.', affection: { haru: 2 }, traits: { considerate: 1 } },
      { id: 'c4-end-promise', label: '다음 만남까지 강해지겠다고 약속한다.', reply: '다시 만날 때는 더 나아진 모습을 보여드리겠습니다.', trust: { haru: 1 }, traits: { brave: 1 } }
    ] },
    { id: 'c4-room', mode: 'black', speaker: '주인공', text: '오늘 손에 쥔 검의 감각을 잊지 말자. 내일부터는 스스로 강해져야 한다.' },
    { id: 'c4-clear', mode: 'black', center: 'CHAPTER 4 CLEAR' },
    { id: 'c4-end', mode: 'black', ending: true, center: 'CHAPTER 4\n\n완료' }
  ]
};