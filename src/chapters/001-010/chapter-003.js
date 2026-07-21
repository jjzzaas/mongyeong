export const chapter003 = {
  id: 3,
  title: '첫 임무',
  scenes: [
    { id: 'c3-title', mode: 'black', center: 'CHAPTER 3\n\n첫 임무' },
    { id: 'c3-morning', mode: 'city', narration: true, text: '다음 날 아침, 나는 길드로 향했다. 어제보다 도시의 풍경이 조금은 익숙하게 느껴졌다.' },
    { id: 'c3-momo-appear', mode: 'city', speaker: '모모', text: '잠깐만요! 거기 새로 온 사람 맞죠?' },
    { id: 'c3-misunderstanding', mode: 'city', narration: true, text: '작은 체구의 소녀는 나를 위아래로 훑어보더니 혼자 무언가를 오해한 듯 표정을 굳혔다.' },
    { id: 'c3-choice-momo-first', mode: 'city', speaker: '모모', text: '수상한 사람은 아닌 거죠?', choices: [
      { id: 'c3-momo-polite', label: '정중하게 자신을 소개한다.', reply: '저도 아직 상황을 잘 모르지만, 수상한 행동은 하지 않겠습니다.', affection: { momo: 1 }, trust: { momo: 1 } },
      { id: 'c3-momo-joke', label: '가볍게 웃으며 넘긴다.', reply: '제가 수상해 보이긴 하나 보네요.', affection: { momo: 1 }, traits: { brave: 1 } },
      { id: 'c3-momo-question', label: '먼저 누구인지 묻는다.', reply: '그 전에 모모 씨는 누구신가요?', traits: { cautious: 1 } }
    ] },
    { id: 'c3-guildmaster-call', mode: 'city', speaker: '길드장', text: '둘 다 그만하고 안으로 들어와라.' },
    { id: 'c3-job', mode: 'city', speaker: '길드장', text: '외곽 시설에 보급품을 전달하는 간단한 임무다. 모모가 동행한다.' },
    { id: 'c3-momo-protest', mode: 'city', speaker: '모모', text: '제가요? 왜 제가 이 사람을 데리고 가야 해요?' },
    { id: 'c3-choice-team', mode: 'city', speaker: '주인공', text: '모모의 반응에 어떻게 답할까.', choices: [
      { id: 'c3-team-cooperate', label: '폐를 끼치지 않겠다고 말한다.', reply: '최대한 방해되지 않도록 하겠습니다.', affection: { momo: 1 }, trust: { momo: 1 } },
      { id: 'c3-team-learn', label: '배우겠다고 말한다.', reply: '부족한 만큼 열심히 배우겠습니다.', trust: { momo: 1 }, traits: { considerate: 1 } },
      { id: 'c3-team-silent', label: '조용히 준비한다.', reply: '……준비하겠습니다.', traits: { cautious: 1 } }
    ] },
    { id: 'c3-outskirts', mode: 'forest-exit', narration: true, text: '도시 외곽으로 나가자 길은 점점 거칠어졌다. 모모는 앞장서 주변을 살폈다.' },
    { id: 'c3-ambush', mode: 'danger', narration: true, text: '보급 시설을 앞두고 악몽 두 마리가 길을 막아섰다.' },
    { id: 'c3-momo-darksite', mode: 'battle', speaker: '모모', text: '제가 시선을 끌게요. 움직임을 놓치지 마세요.' },
    { id: 'c3-choice-battle', mode: 'battle', speaker: '주인공', text: '지금 해야 할 행동은…….', choices: [
      { id: 'c3-battle-follow', label: '모모의 지시를 따른다.', reply: '알겠습니다. 움직임을 보고 따라가겠습니다.', trust: { momo: 2 }, flags: ['followed_momo_tutorial'] },
      { id: 'c3-battle-cover', label: '모모의 빈틈을 막는다.', reply: '뒤쪽은 제가 보겠습니다.', affection: { momo: 1 }, traits: { brave: 1 } },
      { id: 'c3-battle-charge', label: '먼저 적의 시선을 끈다.', reply: '제가 앞에서 시간을 벌겠습니다.', traits: { brave: 2 }, flags: ['reckless_battle_choice'] }
    ] },
    { id: 'c3-battle-end', mode: 'after-battle', narration: true, text: '싸움은 오래가지 않았다. 모모의 빠른 움직임 덕분에 우리는 무사히 보급품을 전달했다.' },
    { id: 'c3-momo-eval', mode: 'after-battle', speaker: '모모', text: '생각보다는 괜찮네요. 아주 조금은요.' },
    { id: 'c3-choice-after', mode: 'after-battle', speaker: '주인공', text: '모모에게 뭐라고 답할까.', choices: [
      { id: 'c3-after-thanks', label: '도와줘서 고맙다고 말한다.', reply: '모모 씨 덕분입니다. 감사합니다.', affection: { momo: 2 } },
      { id: 'c3-after-praise', label: '모모의 움직임을 칭찬한다.', reply: '정말 빠르시네요. 많이 배웠습니다.', affection: { momo: 1 }, trust: { momo: 1 } },
      { id: 'c3-after-next', label: '다음에는 더 잘하겠다고 말한다.', reply: '다음에는 더 도움이 되겠습니다.', traits: { brave: 1 } }
    ] },
    { id: 'c3-report', mode: 'city', narration: true, text: '길드로 돌아와 임무 완료를 보고하자 길드장은 짧게 고개를 끄덕였다.' },
    { id: 'c3-clear', mode: 'black', center: 'CHAPTER 3 CLEAR' },
    { id: 'c3-end', mode: 'black', ending: true, center: 'CHAPTER 3\n\n완료' }
  ]
};