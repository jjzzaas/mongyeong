export const chapter003 = {
  id: 3,
  title: '낯선 동행',
  scenes: [
    { id: 'c3-title', mode: 'black', center: 'CHAPTER 3\n\n낯선 동행' },
    { id: 'c3-morning-light', mode: 'black', narration: true, text: '희미한 아침빛에 눈을 떴다. 낯선 천장이 먼저 보였고, 그제야 어젯밤 임시 숙소에 들어왔다는 사실이 떠올랐다.' },
    { id: 'c3-sound', mode: 'black', center: '새근……\n\n새근……' },
    { id: 'c3-turn', mode: 'city', narration: true, text: '바로 옆 침상에서 인기척이 들렸다. 고개를 돌리자 처음 보는 소녀가 이불을 끌어안은 채 깊이 잠들어 있었다.' },
    { id: 'c3-confused', mode: 'city', speaker: '주인공', text: '누구지……? 어젯밤에 누가 들어온 건가?' },
    { id: 'c3-choice-first', mode: 'city', speaker: '주인공', text: '깨우는 편이 나을까. 아니면 조용히 나가는 편이 나을까.', choices: [
      {
        id: 'c3-first-quiet',
        label: '조용히 나간다.',
        reply: '괜히 일을 키우지 말자. 일단 길드에 가서 상황부터 확인해야겠다.',
        traits: { cautious: 1, considerate: 1 },
        followUp: [
          { id: 'c3-first-quiet-action', mode: 'city', narration: true, text: '숨을 죽인 채 옷을 챙겨 입고 문고리를 잡았다.' },
          { id: 'c3-first-quiet-momo', mode: 'city', speaker: '???', text: '……다녀오세요.' },
          { id: 'c3-first-quiet-look', mode: 'city', narration: true, text: '놀라 뒤를 돌아봤지만 소녀는 여전히 눈을 감고 있었다. 잠꼬대인지, 정말 나에게 한 말인지는 알 수 없었다.' }
        ]
      },
      {
        id: 'c3-first-wake',
        label: '모모를 깨운다.',
        reply: '저기요. 잠시 일어나 보세요.',
        traits: { brave: 1 },
        followUp: [
          { id: 'c3-first-wake-startle', mode: 'city', speaker: '???', text: '흐엣……! 누, 누구세요?' },
          { id: 'c3-first-wake-distance', mode: 'city', narration: true, text: '소녀는 이불을 끌어당기며 침상 끝으로 물러났다. 나 역시 누구인지 모른다고 설명하자 경계 어린 눈으로 한참 바라봤다.' },
          { id: 'c3-first-wake-leave', mode: 'city', speaker: '주인공', text: '저도 길드에 확인하러 가겠습니다. 여기서 기다리셔도 됩니다.' }
        ]
      },
      {
        id: 'c3-first-wait',
        label: '상황을 정리하려고 잠시 더 누워 있는다.',
        reply: '섣불리 움직이지 말자. 기억나는 것부터 차근차근 정리해 보자.',
        traits: { cautious: 1 },
        followUp: [
          { id: 'c3-first-wait-think', mode: 'city', narration: true, text: '어제 숲에서 깨어났고, 하루 씨를 따라 도시에 들어왔다. 하지만 이 소녀에 관한 기억은 어디에도 없었다.' },
          { id: 'c3-first-wait-rise', mode: 'city', narration: true, text: '생각을 마친 뒤 조용히 몸을 일으켰다. 소녀는 여전히 깊이 잠들어 있었다.' }
        ]
      }
    ] },
    { id: 'c3-leave-alone', mode: 'guild-front', narration: true, text: '결국 혼자 숙소를 나와 길드로 향했다. 낯선 소녀가 누구인지는 길드에 가면 알 수 있을지도 몰랐다.' },
    { id: 'c3-guild-enter', mode: 'city', narration: true, text: '길드 안으로 들어서자 접수대의 안내원이 나를 알아보고 길드장실로 안내했다.' },
    { id: 'c3-master-first', mode: 'city', speaker: '길드장', text: '사정은 들었다.' },
    { id: 'c3-master-distrust', mode: 'city', speaker: '길드장', text: '하지만 신원도 실력도 모르는 사람에게 일을 맡길 수는 없다. 하루가 데려왔다는 이유만으로 널 신뢰할 생각도 없고.' },
    { id: 'c3-mc-answer', mode: 'city', speaker: '주인공', text: '당연한 판단이었다. 나조차 내가 누구인지 알지 못한다.' },
    { id: 'c3-choice-repay', mode: 'city', speaker: '주인공', text: '그래도 도움만 받고 있을 수는 없었다.', choices: [
      { id: 'c3-repay-work', label: '할 수 있는 일이 있는지 묻는다.', reply: '신뢰하기 어렵다는 건 이해합니다. 그래도 제가 할 수 있는 일이 있다면 시켜주십시오.', traits: { brave: 1, justice: 1 } },
      { id: 'c3-repay-proof', label: '먼저 실력을 증명하겠다고 한다.', reply: '말만으로 믿어 달라고 하지는 않겠습니다. 확인할 방법이 있다면 따르겠습니다.', traits: { brave: 1, cautious: 1 } },
      { id: 'c3-repay-wait', label: '길드의 판단을 따르겠다고 한다.', reply: '알겠습니다. 확인이 끝날 때까지 길드의 판단을 따르겠습니다.', traits: { considerate: 1, cautious: 1 } }
    ] },
    { id: 'c3-door-open', mode: 'city', narration: true, text: '길드장이 대답하려던 순간 문이 조심스럽게 열렸다. 아침에 숙소에서 보았던 소녀가 안쪽을 살피며 들어왔다.' },
    { id: 'c3-master-calls-momo', mode: 'city', speaker: '길드장', text: '모모. 마침 잘 왔다.' },
    { id: 'c3-name-realize', mode: 'city', narration: true, text: '그제야 소녀의 이름이 모모라는 것을 알았다. 모모 역시 나를 발견하고 눈에 띄게 굳었다.' },
    { id: 'c3-momo-startled', mode: 'city', speaker: '모모', text: '저, 저 사람은…….' },
    { id: 'c3-master-assign', mode: 'city', speaker: '길드장', text: '모모, 오늘은 네가 이 녀석을 데리고 다녀라. 외곽 방호 장치 점검을 도우면서 이상한 행동을 하는지 잘 보고.' },
    { id: 'c3-master-test', mode: 'city', speaker: '길드장', text: '정식 의뢰가 아니다. 일을 맡길 수 있는 사람인지 시험하고 관찰하는 단계다. 문제라고 판단되면 바로 데리고 돌아와.' },
    { id: 'c3-momo-fear', mode: 'city', narration: true, text: '모모는 당장이라도 거절하고 싶은 표정이었다. 하지만 길드장의 지시를 외면하지는 못했다.' },
    { id: 'c3-momo-accept', mode: 'city', speaker: '모모', text: '네…… 알겠습니다.' },
    { id: 'c3-choice-momo', mode: 'city', speaker: '주인공', text: '부담스러워하는 모모에게 어떻게 말할까.', choices: [
      { id: 'c3-momo-distance', label: '필요한 거리만 유지하겠다고 말한다.', reply: '불편하게 하지 않겠습니다. 안내만 부탁드리겠습니다.', trust: { momo: 1 }, traits: { considerate: 1 } },
      { id: 'c3-momo-return', label: '문제가 생기면 바로 돌아오겠다고 한다.', reply: '조금이라도 문제가 생기면 바로 돌아오겠습니다.', affection: { momo: 1 }, traits: { cautious: 1 } },
      { id: 'c3-momo-silent', label: '말없이 길드장의 지시를 기다린다.', reply: '……알겠습니다.', traits: { cautious: 1 } }
    ] },
    { id: 'c3-tools', mode: 'city', narration: true, text: '모모는 공구와 교체 부품을 챙기면서도 계속 내 움직임을 살폈다. 가까이 다가가면 한 걸음 물러났고, 시선이 마주치면 먼저 피했다.' },
    { id: 'c3-depart', mode: 'city-gate', narration: true, text: '준비를 마친 뒤 우리는 중앙도시 외곽으로 향했다.' },
    { id: 'c3-road-first', mode: 'forest-exit', speaker: '모모', text: '저기요…… 저는 길이랑 작업 순서만 알려드릴 거예요. 이상한 행동을 하면 바로 길드로 돌아갈 거고요.' },
    { id: 'c3-choice-road', mode: 'forest-exit', speaker: '주인공', text: '모모는 나보다 몇 걸음 앞서 걸으며 계속 주변을 확인했다.', choices: [
      { id: 'c3-road-agree', label: '조용히 동의한다.', reply: '네. 그렇게 하겠습니다.', trust: { momo: 1 } },
      { id: 'c3-road-apology', label: '억지로 동행하게 해 미안하다고 한다.', reply: '원해서 오신 게 아닌데 죄송합니다. 최대한 빨리 끝내겠습니다.', affection: { momo: 2 }, traits: { considerate: 1 } },
      { id: 'c3-road-question', label: '점검 순서를 물어본다.', reply: '먼저 어떤 장치부터 확인하면 됩니까?', trust: { momo: 1 }, traits: { cautious: 1 } }
    ] },
    { id: 'c3-momo-that-person', mode: 'forest-exit', speaker: '모모', text: '그쪽은…… 생각보다 말이 잘 통하네요.' },
    { id: 'c3-mc-soften', mode: 'forest-exit', speaker: '주인공', text: '그렇게 위험한 사람처럼 보였습니까?' },
    { id: 'c3-momo-honest', mode: 'forest-exit', speaker: '모모', text: '조금은요. 아니, 꽤 많이요…….' },
    { id: 'c3-outskirts-view', mode: 'forest-exit', narration: true, text: '짧은 대화가 끝난 뒤에도 어색함은 남아 있었다. 그래도 모모의 걸음은 처음보다 조금 느려져 있었다.' },
    { id: 'c3-arrive', mode: 'city-gate', speaker: '모모', text: '저기예요. 저 장치부터 확인하면 돼요. 끝날 때까지 제가 옆에서 보고 있을게요.' },
    { id: 'c3-clear', mode: 'black', center: 'CHAPTER 3 CLEAR' },
    { id: 'c3-end', mode: 'black', ending: true, center: '정식 의뢰가 아닌 시험. 낯선 두 사람의 불편한 동행이 시작되었다.' }
  ]
};