export const chapter003 = {
  id: 3,
  title: '당황스러운 첫 만남',
  scenes: [
    { id: 'c3-title', mode: 'black', center: 'CHAPTER 3\n\n당황스러운 첫 만남' },
    { id: 'c3-morning-light', mode: 'black', narration: true, text: '창문 틈으로 들어온 빛에 눈을 떴다. 낯선 천장과 어제의 기억이 천천히 돌아왔다.' },
    { id: 'c3-sound', mode: 'black', center: '새근……\n\n새근……' },
    { id: 'c3-turn', mode: 'city', narration: true, text: '옆 침상에서 인기척이 들렸다. 고개를 돌리자 처음 보는 소녀가 이불을 끌어안은 채 자고 있었다.' },
    { id: 'c3-momo-wake', mode: 'city', speaker: '???', text: '으음…… 조금만 더…….' },
    { id: 'c3-eye-contact', mode: 'city', narration: true, text: '소녀가 눈을 뜨는 순간 시선이 정면으로 마주쳤다. 짧은 침묵 뒤, 두 사람 모두 동시에 몸을 일으켰다.' },
    { id: 'c3-momo-shock', mode: 'city', speaker: '???', text: '누, 누구예요?! 왜 남자가 여기 있어요?!' },
    { id: 'c3-choice-first', mode: 'city', speaker: '주인공', text: '나도 묻고 싶은 말이었다.', choices: [
      { id: 'c3-first-explain', label: '임시 숙소를 허가받았다고 설명한다.', reply: '저도 어제 안내원에게 이 방을 배정받았습니다. 놀라게 했다면 죄송합니다.', trust: { momo: 1 }, traits: { considerate: 1 } },
      { id: 'c3-first-question', label: '상대가 누구인지 되묻는다.', reply: '저도 방금 알았습니다. 우선 누구신지부터 여쭤봐도 될까요?', traits: { cautious: 1 } },
      { id: 'c3-first-distance', label: '시선을 피하고 거리를 둔다.', reply: '오해하지 마세요. 저는 방금 일어났을 뿐입니다.', affection: { momo: 1 }, traits: { considerate: 1 } }
    ] },
    { id: 'c3-momo-intro', mode: 'city', speaker: '모모', text: '……모모예요. 저도 가끔 이 숙소를 쓰는데, 어젯밤엔 아무도 없는 줄 알았어요.' },
    { id: 'c3-awkward', mode: 'city', narration: true, text: '서로 상황을 이해한 뒤에도 어색함은 쉽게 가라앉지 않았다. 모모는 서둘러 짐을 챙겨 먼저 방을 나갔다.' },
    { id: 'c3-guild-return', mode: 'guild-front', narration: true, text: '나도 뒤늦게 길드로 향했다. 어제의 안내원을 찾기도 전에 안쪽에서 날카로운 목소리가 들렸다.' },
    { id: 'c3-master-scold', mode: 'city', speaker: '길드장', text: '신원도 없고 돈도 없는데 길드 숙소에서 공짜로 잤다고?' },
    { id: 'c3-guide-defend', mode: 'city', speaker: '안내원', text: '하루 씨가 보증했고 하룻밤만 허가한 겁니다. 규정 안에서 처리했어요.' },
    { id: 'c3-mc-enter', mode: 'city', speaker: '주인공', text: '잠시만요. 숙박값은 제가 치르겠습니다.' },
    { id: 'c3-master-look', mode: 'city', narration: true, text: '길드장은 귀찮다는 듯 나를 훑어봤다. 모모는 조금 떨어진 곳에서 아침의 상대가 나라는 사실을 깨닫고 눈을 크게 떴다.' },
    { id: 'c3-choice-repay', mode: 'city', speaker: '길드장', text: '돈도 없다면서 뭘로 갚겠다는 거지?', choices: [
      { id: 'c3-repay-work', label: '무슨 일이든 시켜 달라고 한다.', reply: '제가 할 수 있는 일이 있다면 무엇이든 하겠습니다.', traits: { brave: 1, justice: 1 }, flags: ['accepted_repayment_job'] },
      { id: 'c3-repay-labor', label: '육체노동으로 갚겠다고 한다.', reply: '힘을 쓰는 일이라도 괜찮습니다. 대가 없이 머물 생각은 없습니다.', traits: { justice: 2 } },
      { id: 'c3-repay-ask', label: '가장 급한 일이 무엇인지 묻는다.', reply: '지금 길드에서 사람이 부족한 일이 있다면 맡겨주세요.', traits: { cautious: 1, considerate: 1 } }
    ] },
    { id: 'c3-master-job', mode: 'city', speaker: '길드장', text: '마침 중앙도시 외곽의 방호 시설이 고장 났다. 위험한 일은 아니고, 귀찮고 손이 많이 가는 보수 작업이지.' },
    { id: 'c3-mc-accept', mode: 'city', speaker: '주인공', text: '맡겠습니다.' },
    { id: 'c3-momo-request', mode: 'city', speaker: '모모', text: '길드장님, 저도 같이 가도 돼요?' },
    { id: 'c3-master-question', mode: 'city', speaker: '길드장', text: '네가? 굳이?' },
    { id: 'c3-momo-reason', mode: 'city', speaker: '모모', text: '혼자 보내면 길도 모르잖아요. 보수 작업이면 저도 도울 수 있고요.' },
    { id: 'c3-choice-momo', mode: 'city', speaker: '주인공', text: '모모의 동행 제안에 어떻게 답할까.', choices: [
      { id: 'c3-momo-welcome', label: '함께 가면 든든하다고 말한다.', reply: '같이 가주신다면 든든하겠습니다.', affection: { momo: 2 }, trust: { momo: 1 } },
      { id: 'c3-momo-caution', label: '위험하지 않은지 확인한다.', reply: '괜찮으시겠습니까? 혹시 위험한 곳이라면 무리하지 않으셔도 됩니다.', affection: { momo: 1 }, traits: { considerate: 1 } },
      { id: 'c3-momo-thanks', label: '길 안내를 부탁한다.', reply: '그럼 길을 부탁드리겠습니다. 아직 도시 밖은 전혀 모르니까요.', trust: { momo: 1 }, traits: { cautious: 1 } }
    ] },
    { id: 'c3-momo-personality', mode: 'city', narration: true, text: '모모는 사람을 쉽게 따르고 먼저 말을 거는 성격이었다. 다만 허리에 찬 작은 단검과 달리, 전투 경험은 많아 보이지 않았다.' },
    { id: 'c3-depart', mode: 'city-gate', narration: true, text: '필요한 공구와 부품을 챙긴 뒤 우리는 중앙도시 외곽으로 향했다.' },
    { id: 'c3-road-talk', mode: 'forest-exit', speaker: '모모', text: '아침 일은…… 서로 모르는 걸로 해요. 알겠죠?' },
    { id: 'c3-choice-road', mode: 'forest-exit', speaker: '주인공', text: '모모가 얼굴을 붉힌 채 앞만 보고 걷는다.', choices: [
      { id: 'c3-road-agree', label: '조용히 동의한다.', reply: '네. 저도 그렇게 하겠습니다.', affection: { momo: 1 }, trust: { momo: 1 } },
      { id: 'c3-road-apology', label: '다시 한번 사과한다.', reply: '놀라게 해서 죄송했습니다. 저도 그런 상황인 줄 몰랐습니다.', affection: { momo: 2 }, traits: { considerate: 1 } },
      { id: 'c3-road-light', label: '가볍게 웃으며 넘긴다.', reply: '이미 둘 다 충분히 당황했으니 그걸로 끝내죠.', affection: { momo: 1 }, traits: { brave: 1 } }
    ] },
    { id: 'c3-outskirts-view', mode: 'forest-exit', narration: true, text: '성벽을 벗어나자 잘 정비된 거리 대신 거친 흙길과 낡은 방호 장치들이 이어졌다.' },
    { id: 'c3-arrive', mode: 'city-gate', speaker: '모모', text: '저기예요. 저 장치를 고치면 되는 것 같아요.' },
    { id: 'c3-clear', mode: 'black', center: 'CHAPTER 3 CLEAR' },
    { id: 'c3-end', mode: 'black', ending: true, center: '첫 임무는 전투가 아닌, 귀찮은 보수 작업이었다.' }
  ]
};