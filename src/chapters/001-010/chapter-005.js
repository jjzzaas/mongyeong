export const chapter005 = {
  id: 5,
  title: '개인 훈련과 정식 의뢰',
  scenes: [
    { id: 'c5-title', mode: 'black', center: 'CHAPTER 5\n\n개인 훈련과 정식 의뢰' },
    { id: 'c5-morning', mode: 'city', narration: true, text: '아침 일찍 숙소를 나섰다. 훈련장으로 향하는 길에서 익숙한 목소리가 들렸다.' },
    { id: 'c5-momo-meet', mode: 'city', speaker: '모모', text: '어? 오늘도 훈련하러 가요?' },
    { id: 'c5-choice-morning', mode: 'city', speaker: '주인공', text: '모모에게 어떻게 답할까.', choices: [
      { id: 'c5-morning-simple', label: '네, 훈련하러 간다고 답한다.', reply: '네. 오늘도 훈련하려고요.', trust: { momo: 1 } },
      { id: 'c5-morning-together', label: '같이 갈지 조심스럽게 묻는다.', reply: '혹시 같이 가실래요?', affection: { momo: 2 } },
      { id: 'c5-morning-question', label: '모모는 어디에 가는지 묻는다.', reply: '모모 씨는 어디에 가세요?', affection: { momo: 1 }, traits: { considerate: 1 } }
    ] },
    { id: 'c5-momo-plan', mode: 'city', speaker: '모모', text: '저는 잠깐 볼일이 있어요. 훈련은 나중에 합류할게요.' },
    { id: 'c5-training', mode: 'battle', center: '개인 훈련 1-6 ~ 1-10' },
    { id: 'c5-exhausted', mode: 'after-battle', narration: true, text: '마지막 훈련을 끝낸 순간 다리에 힘이 풀렸다. 시야가 흔들리며 그대로 바닥에 쓰러졌다.' },
    { id: 'c5-healer', mode: 'after-battle', speaker: '???', text: '무리했네요. 움직이지 말고 잠시 누워 있어요.' },
    { id: 'c5-choice-healer', mode: 'after-battle', speaker: '주인공', text: '낯선 사람에게 뭐라고 답할까.', choices: [
      { id: 'c5-healer-thanks', label: '치료해 줘서 감사하다고 말한다.', reply: '도와주셔서 감사합니다.', traits: { considerate: 1 }, flags: ['healer_first_good_impression'] },
      { id: 'c5-healer-name', label: '이름을 묻는다.', reply: '실례지만 성함을 알 수 있을까요?', traits: { cautious: 1 } },
      { id: 'c5-healer-return', label: '빨리 길드로 돌아가야 한다고 말한다.', reply: '괜찮습니다. 길드로 돌아가야 합니다.', traits: { brave: 1 } }
    ] },
    { id: 'c5-guild-call', mode: 'city', narration: true, text: '회복한 뒤 길드로 돌아오자 길드장이 나를 기다리고 있었다.' },
    { id: 'c5-request', mode: 'city', speaker: '길드장', text: '이제 잔심부름은 끝이다. 옆 도시에서 들어오는 호송 물자를 인도하는 정식 의뢰를 맡긴다.' },
    { id: 'c5-choice-request', mode: 'city', speaker: '길드장', text: '받아들이겠나?', choices: [
      { id: 'c5-request-accept', label: '바로 수락한다.', reply: '네. 맡겠습니다.', traits: { brave: 1 }, flags: ['accepted_first_official_request'] },
      { id: 'c5-request-detail', label: '임무 내용을 자세히 확인한다.', reply: '출발 전에 위험 요소와 경로를 확인하고 싶습니다.', traits: { cautious: 2 } },
      { id: 'c5-request-team', label: '동행 인원을 묻는다.', reply: '이번 임무는 누구와 함께 가게 되나요?', trust: { momo: 1 }, traits: { considerate: 1 } }
    ] },
    { id: 'c5-request-paper', mode: 'city', narration: true, text: '로비로 돌아오자 정식 의뢰서가 도착해 있었다. 출발 시간과 호송 경로가 적혀 있었다.' },
    { id: 'c5-monologue', mode: 'black', speaker: '주인공', text: '이번에는 훈련이 아니다. 정말로 누군가의 안전을 책임져야 한다.' },
    { id: 'c5-clear', mode: 'black', center: 'CHAPTER 5 CLEAR' },
    { id: 'c5-end', mode: 'black', ending: true, center: 'CHAPTER 5\n\n완료' }
  ]
};