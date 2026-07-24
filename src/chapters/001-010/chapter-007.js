export const chapter007 = {
  id: 7,
  title: '남겨진 온기',
  scenes: [
    { id: 'c7-title', mode: 'black', center: 'CHAPTER 7\n\n남겨진 온기' },
    { id: 'c7-morning', mode: 'city', narration: true, text: '훈련을 마친 다음 날 아침. 하루는 임무를 나갔고, 모모도 길드의 심부름으로 자리를 비운 상태였다.' },
    { id: 'c7-alone', mode: 'city', speaker: '주인공', text: '어제 겨우 검을 만들었다. 감각이 남아 있을 때 조금이라도 더 연습해 두자.' },
    { id: 'c7-training-ground', mode: 'battle', narration: true, text: '주인공은 혼자 헌터지구 훈련소로 향했다. 이른 시간이라 넓은 훈련장에는 사람의 모습이 거의 보이지 않았다.' },
    { id: 'c7-repeat', mode: 'battle', narration: true, text: '손안에 푸른 입자를 모으고, 짧은 검의 형태를 붙잡았다. 검을 만들고 휘두르고, 흐트러지면 다시 구현했다.' },
    { id: 'c7-choice-training', mode: 'battle', speaker: '주인공', text: '어제보다 오래 유지할 수 있다. 조금만 더 해볼까.', choices: [
      { id: 'c7-train-steady', label: '호흡을 고르며 천천히 반복한다.', reply: '서두르지 말자. 형태를 유지하는 감각부터 익혀야 한다.', traits: { cautious: 2 } },
      { id: 'c7-train-push', label: '한계까지 계속 훈련한다.', reply: '아직 할 수 있다. 한 번만 더.', traits: { brave: 2 }, flags: ['pushed_training_limit'] },
      { id: 'c7-train-recall', label: '하루의 가르침을 떠올린다.', reply: '억지로 짜내지 말고, 자연스럽게 형태를 떠올리자.', trust: { haru: 1 }, traits: { calm: 1 } }
    ] },
    { id: 'c7-drain', mode: 'battle', narration: true, text: '반복할수록 손끝의 빛이 옅어졌다. 검을 유지하는 것뿐 아니라 서 있는 것조차 점점 힘들어졌다.' },
    { id: 'c7-collapse', mode: 'black', narration: true, text: '시야가 크게 흔들렸다. 바닥이 가까워지는 순간조차 제대로 느끼지 못한 채 의식이 끊어졌다.' },
    { id: 'c7-warmth', mode: 'black', narration: true, text: '아무것도 보이지 않았다. 다만 차갑게 식어가던 몸 안으로 따뜻한 감각이 천천히 스며들었다.' },
    { id: 'c7-presence', mode: 'black', narration: true, text: '가까운 곳에 누군가 있었다. 희미한 인기척과 함께 흐트러진 정신 에너지가 부드럽게 가라앉았다.' },
    { id: 'c7-wake', mode: 'battle', narration: true, text: '얼마 뒤 눈을 떴을 때 훈련장에는 아무도 없었다. 방금 전까지 곁에 누군가 있었던 흔적도 찾을 수 없었다.' },
    { id: 'c7-wake-thought', mode: 'battle', speaker: '주인공', text: '분명 누군가 있었던 것 같은데…… 꿈이었나.' },
    { id: 'c7-guildmaster-room', mode: 'city', narration: true, text: '같은 시각, 길드장실. 평소처럼 의자에 비스듬히 기대 있던 길드장은 하루가 제출한 임무 보고서를 몇 번이나 다시 읽고 있었다.' },
    { id: 'c7-guildmaster-strange', mode: 'city', speaker: '길드장', text: '이 부분, 아무리 다시 봐도 이상하단 말이지.' },
    { id: 'c7-vice-question', mode: 'city', speaker: '부길드장', text: '몽환 숲에서 발견한 신원 불명의 신입 말씀이십니까?' },
    { id: 'c7-report', mode: 'status', center: '임무 보고서\n\n발견 지점  몽환 숲 외곽\n대상 상태  기억 상실·신원 불명\n특이사항  무기 없이 악몽과 교전\n확인 사항  맨손으로 악몽 한 개체 제압' },
    { id: 'c7-guildmaster-impossible', mode: 'city', speaker: '길드장', text: '그래. 정신 에너지 사용법도 모르는 사람이 악몽을 맨손으로 쓰러뜨렸어. 보통은 불가능하지.' },
    { id: 'c7-vice-error', mode: 'city', speaker: '부길드장', text: '보고 과정에서 착오가 있었을 가능성은 없겠습니까?' },
    { id: 'c7-guildmaster-haru', mode: 'city', speaker: '길드장', text: '하루가 이런 내용을 잘못 적을 사람은 아니잖아. 그렇다고 보고서만 보고 계속 의심할 수도 없고.' },
    { id: 'c7-guildmaster-call', mode: 'city', speaker: '길드장', text: '마침 초급 의뢰 하나가 들어왔어. 직접 맡겨 보면 어느 정도는 알 수 있겠지. 그 신입을 불러와 줘.' },
    { id: 'c7-vice-training', mode: 'battle', narration: true, text: '부길드장은 주인공이 훈련소에 있다는 말을 듣고 곧장 그곳으로 향했다.' },
    { id: 'c7-vice-find', mode: 'battle', speaker: '부길드장', text: '여기 있었군. 길드장님께서 찾고 계신다. 지금 함께 가도록 하지.' },
    { id: 'c7-return-room', mode: 'city', narration: true, text: '주인공이 길드장실로 들어서자 길드장은 보고서를 덮고 평소와 다름없는 가벼운 표정으로 그를 맞았다.' },
    { id: 'c7-guildmaster-body', mode: 'city', speaker: '길드장', text: '훈련소에서 쓰러졌다면서? 처음 무기를 만들었다고 너무 신난 것 아니야?' },
    { id: 'c7-choice-answer', mode: 'city', speaker: '주인공', text: '길드장의 말투는 가벼웠지만 시선은 내 상태를 세심하게 살피고 있었다.', choices: [
      { id: 'c7-answer-apology', label: '무리했다고 인정한다.', reply: '죄송합니다. 한계를 제대로 판단하지 못했습니다.', trust: { guildmaster: 1 }, traits: { cautious: 1 } },
      { id: 'c7-answer-fine', label: '이제 괜찮다고 답한다.', reply: '지금은 괜찮습니다. 다음부터는 같은 실수를 반복하지 않겠습니다.', traits: { calm: 1 } },
      { id: 'c7-answer-work', label: '맡길 일이 있는지 묻는다.', reply: '몸은 괜찮습니다. 저를 부르신 이유가 따로 있습니까?', traits: { brave: 1 } }
    ] },
    { id: 'c7-guildmaster-mission', mode: 'city', speaker: '길드장', text: '좋아. 그럼 네게 첫 정식 의뢰를 맡겨 보지.' },
    { id: 'c7-mission-card', mode: 'status', center: '정식 의뢰\n\n인접 도시 물자 인계 지원\n\n내일 아침 도시 외곽에서 동행 헌터와 합류\n중간 지점에서 물자를 인계받은 뒤\n길드까지 무사히 복귀할 것' },
    { id: 'c7-guildmaster-end', mode: 'city', speaker: '길드장', text: '어려운 임무는 아니야. 하지만 처음인 만큼 지시를 잘 따르고, 무엇보다 무사히 돌아와.' },
    { id: 'c7-final', mode: 'black', speaker: '주인공', text: '내일, 처음으로 정식 의뢰에 나간다. 훈련장에서 느낀 정체 모를 온기는 여전히 몸 어딘가에 남아 있었다.' },
    { id: 'c7-clear', mode: 'black', center: 'CHAPTER 7 CLEAR' },
    { id: 'c7-end', mode: 'black', ending: true, center: '첫 정식 의뢰를 부여받았다.' }
  ]
};
