export const chapter005 = {
  id: 5,
  title: '강해져야 하는 이유',
  scenes: [
    { id: 'c5-title', mode: 'black', center: 'CHAPTER 5\n\n강해져야 하는 이유' },
    { id: 'c5-guild-return', mode: 'city', narration: true, text: '길드로 돌아오자 하루는 곧장 길드장실로 향했다. 나와 모모도 그 뒤를 따랐다.' },
    { id: 'c5-haru-scold-1', mode: 'city', speaker: '하루', text: '전투 경험도 없는 두 사람을 외곽에 보냈다고요?' },
    { id: 'c5-master-excuse', mode: 'city', speaker: '길드장', text: '보수 작업뿐이었어. 그 길에서 악몽이 나올 줄 누가 알았겠냐고.' },
    { id: 'c5-haru-scold-2', mode: 'city', speaker: '하루', text: '외곽은 언제든 상황이 바뀔 수 있어요. 최소한 호위 인원은 붙였어야죠.' },
    { id: 'c5-master-sulk', mode: 'city', speaker: '길드장', text: '알았어, 알았다고. 그렇게 걱정되면 네가 둘을 맡아.' },
    { id: 'c5-haru-surprise', mode: 'city', speaker: '하루', text: '네?' },
    { id: 'c5-master-leave', mode: 'city', speaker: '길드장', text: '기초 훈련이든 안전 교육이든 네가 알아서 해. 나도 처리할 일이 산더미야.' },
    { id: 'c5-master-exit', mode: 'city', narration: true, text: '길드장은 토라진 사람처럼 서류 뭉치를 끌어안고 방을 나가버렸다.' },
    { id: 'c5-silence', mode: 'city', narration: true, text: '방 안에는 지친 나와 고개를 숙인 모모, 그리고 한숨을 삼키는 하루만 남았다.' },
    { id: 'c5-momo-apology', mode: 'city', speaker: '모모', text: '……미안해요. 무서워서 저 혼자 숨었어요.' },
    { id: 'c5-momo-truth', mode: 'city', speaker: '모모', text: '다크사이트는 원래 정찰에도 쓰는 기술인데…… 저는 싸움이 시작되면 숨는 데만 써요.' },
    { id: 'c5-choice-momo', mode: 'city', speaker: '주인공', text: '모모는 손을 떨며 끝내 시선을 들지 못했다.', choices: [
      { id: 'c5-momo-no-blame', label: '모모를 탓하지 않는다.', reply: '살아남기 위해 숨은 겁니다. 모모 씨만의 잘못은 아닙니다.', affection: { momo: 2 }, trust: { momo: 2 }, traits: { considerate: 1 } },
      { id: 'c5-momo-together', label: '다음에는 함께 버티자고 한다.', reply: '다음에는 혼자 숨지 말고 같이 방법을 찾죠. 저도 더 강해지겠습니다.', affection: { momo: 1 }, trust: { momo: 2 }, traits: { brave: 1 } },
      { id: 'c5-momo-honest', label: '두 사람 모두 부족했다고 말한다.', reply: '저도 아무것도 하지 못했습니다. 이번 일은 우리 둘 다 준비가 부족했던 겁니다.', trust: { momo: 1 }, traits: { cautious: 1 } }
    ] },
    { id: 'c5-mc-resolve', mode: 'city', speaker: '주인공', text: '하루 씨. 저를 훈련시켜 주세요.' },
    { id: 'c5-haru-look', mode: 'city', narration: true, text: '하루가 조용히 나를 바라봤다. 옆구리는 아직 아팠지만 이번만큼은 시선을 피하고 싶지 않았다.' },
    { id: 'c5-mc-reason', mode: 'city', speaker: '주인공', text: '다음에도 누군가가 구해주기만 기다릴 수는 없습니다. 적어도 제 몸과 옆 사람을 지킬 수 있을 만큼은 강해지고 싶습니다.' },
    { id: 'c5-momo-join', mode: 'city', speaker: '모모', text: '저도…… 할게요. 다음에는 무서워도 바로 숨지 않을래요.' },
    { id: 'c5-haru-warning', mode: 'city', speaker: '하루', text: '훈련은 생각보다 힘들 거예요. 며칠 한다고 갑자기 강해지는 것도 아니고요.' },
    { id: 'c5-choice-resolve', mode: 'city', speaker: '하루', text: '그래도 하시겠어요?', choices: [
      { id: 'c5-resolve-yes', label: '끝까지 해보겠다고 답한다.', reply: '네. 쉽게 끝날 거라고 생각하지 않습니다.', affection: { haru: 1 }, trust: { haru: 2 }, traits: { brave: 1 }, flags: ['committed_to_training'] },
      { id: 'c5-resolve-basic', label: '기초부터 배우겠다고 한다.', reply: '제가 아무것도 모른다는 것부터 인정하겠습니다. 기초부터 가르쳐 주세요.', trust: { haru: 2 }, traits: { cautious: 1 } },
      { id: 'c5-resolve-protect', label: '다시는 같은 일을 반복하지 않겠다고 한다.', reply: '다시는 누군가를 두고 아무것도 못 하는 상황을 만들고 싶지 않습니다.', affection: { haru: 1, momo: 1 }, traits: { justice: 1, brave: 1 } }
    ] },
    { id: 'c5-haru-accept', mode: 'city', speaker: '하루', text: '알겠어요. 그럼 제가 맡을게요.' },
    { id: 'c5-haru-tomorrow', mode: 'city', speaker: '하루', text: '오늘은 둘 다 쉬세요. 상처와 피로가 남은 상태로 시작하면 훈련이 아니라 고문이 돼요.' },
    { id: 'c5-training-place', mode: 'city', speaker: '하루', text: '내일 아침, 헌터지구 훈련소로 오세요. 늦으면 기다려주지 않을 거예요.' },
    { id: 'c5-momo-small', mode: 'city', speaker: '모모', text: '……네. 갈게요.' },
    { id: 'c5-room', mode: 'black', narration: true, text: '숙소로 돌아와 침상에 누웠지만 쉽게 잠들 수 없었다. 악몽의 발톱과 하루의 화살이 계속 떠올랐다.' },
    { id: 'c5-status', mode: 'status', center: '스테이터스\n\n레벨  1\n힘  1   민첩  1\n체력  1   정신력  1\n\n스킬  없음\n구현 무기  없음' },
    { id: 'c5-monologue', mode: 'black', speaker: '주인공', text: '아직 아무것도 없다. 그러니까 내일부터 하나씩 만들어 가면 된다.' },
    { id: 'c5-clear', mode: 'black', center: 'CHAPTER 5 CLEAR' },
    { id: 'c5-end', mode: 'black', ending: true, center: '살아남기 위한 훈련이 시작된다.' }
  ]
};