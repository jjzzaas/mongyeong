export const chapter006 = {
  id: 6,
  title: '첫 번째 검',
  scenes: [
    { id: 'c6-title', mode: 'black', center: 'CHAPTER 6\n\n첫 번째 검' },
    { id: 'c6-morning', mode: 'city', narration: true, text: '다음 날 아침, 약속한 시간보다 조금 일찍 헌터지구 훈련소에 도착했다.' },
    { id: 'c6-training-view', mode: 'city', narration: true, text: '넓은 훈련장 곳곳에서 헌터들이 무기를 휘두르거나 스킬을 연습하고 있었다. 검과 창, 활은 모두 정신 에너지로 만들어진 것이었다.' },
    { id: 'c6-momo-arrive', mode: 'city', speaker: '모모', text: '일찍 왔네요. 혹시 긴장돼서 잠도 못 잔 거 아니에요?' },
    { id: 'c6-choice-morning', mode: 'city', speaker: '주인공', text: '모모도 평소보다 굳은 표정이었다.', choices: [
      { id: 'c6-morning-honest', label: '조금 긴장된다고 말한다.', reply: '네. 제대로 할 수 있을지 조금 긴장됩니다.', trust: { momo: 1 } },
      { id: 'c6-morning-momo', label: '모모도 긴장한 것 같다고 말한다.', reply: '저보다 모모 씨가 더 긴장한 것 같은데요.', affection: { momo: 1 } },
      { id: 'c6-morning-ready', label: '준비됐다고 답한다.', reply: '괜찮습니다. 오늘은 끝까지 해보겠습니다.', traits: { brave: 1 } }
    ] },
    { id: 'c6-haru-enter', mode: 'city', speaker: '하루', text: '두 분 다 왔네요. 그럼 바로 시작할게요.' },
    { id: 'c6-status-explain', mode: 'city', speaker: '하루', text: '먼저 스테이터스 창을 열어보세요. 힘과 민첩 같은 수치는 현재 몸과 정신을 얼마나 안정적으로 움직일 수 있는지 보여줘요.' },
    { id: 'c6-status-before', mode: 'status', center: '스테이터스\n\n레벨  1\n힘  1   민첩  1\n체력  1   정신력  1\n\n스킬  없음\n구현 무기  없음' },
    { id: 'c6-haru-level', mode: 'city', speaker: '하루', text: '레벨이 오른다고 모든 수치가 똑같이 오르는 건 아니에요. 훈련 방식과 경험에 따라 성장 방향도 달라져요.' },
    { id: 'c6-haru-weapon', mode: 'city', speaker: '하루', text: '그리고 무기는 밖에서 꺼내는 물건이 아니에요. 자신의 정신 에너지를 형태로 만드는 거예요.' },
    { id: 'c6-first-attempt', mode: 'battle', center: '기초 훈련 1-1\n\n정신 에너지 감지' },
    { id: 'c6-focus', mode: 'battle', narration: true, text: '손바닥에 의식을 집중했지만 아무 일도 일어나지 않았다. 힘을 줄수록 손끝의 감각만 둔해졌다.' },
    { id: 'c6-haru-correct', mode: 'battle', speaker: '하루', text: '억지로 짜내려고 하지 마세요. 머릿속에 자신이 가장 자연스럽게 다룰 수 있는 형태를 떠올리세요.' },
    { id: 'c6-choice-form', mode: 'battle', speaker: '주인공', text: '어떤 형태를 떠올려야 할까.', choices: [
      { id: 'c6-form-short', label: '가볍고 짧은 검을 떠올린다.', reply: '빠르게 움직일 수 있는 짧은 검이 좋겠습니다.', traits: { cautious: 1 }, flags: ['imagined_short_sword'] },
      { id: 'c6-form-simple', label: '장식 없는 단순한 검을 떠올린다.', reply: '복잡한 형태보다 베는 데 필요한 모습만 생각하겠습니다.', traits: { cautious: 1 } },
      { id: 'c6-form-instinct', label: '숲에서 싸웠던 감각에 맡긴다.', reply: '생각보다 몸이 기억하는 감각을 따라가 보겠습니다.', traits: { brave: 1 }, flags: ['trusted_body_instinct'] }
    ] },
    { id: 'c6-light-start', mode: 'battle', narration: true, text: '호흡을 가다듬자 손끝에 아주 작은 빛이 맺혔다. 빛은 금세 흐트러졌지만 처음과는 달랐다.' },
    { id: 'c6-fail-repeat', mode: 'battle', narration: true, text: '몇 번이나 형태가 생겼다가 무너졌다. 손잡이만 남기도 했고, 날이 만들어지기 전에 빛이 흩어지기도 했다.' },
    { id: 'c6-momo-training', mode: 'battle', narration: true, text: '옆에서는 모모가 훈련용 악몽 모형 앞에 서 있었다. 본능적으로 다크사이트를 쓰려다 멈추고, 떨리는 손으로 단검을 다시 쥐었다.' },
    { id: 'c6-haru-momo', mode: 'battle', speaker: '하루', text: '모모 씨, 숨지 않는 게 목표지 맞아주는 게 목표는 아니에요. 무서우면 거리를 벌리고 다시 보세요.' },
    { id: 'c6-momo-face', mode: 'battle', speaker: '모모', text: '네…… 이번에는 제 눈으로 끝까지 볼게요.' },
    { id: 'c6-second-stage', mode: 'battle', center: '기초 훈련 1-2\n\n형태 유지' },
    { id: 'c6-mc-defeat', mode: 'battle', narration: true, text: '희미한 검을 쥐고 훈련용 표적에 달려들었지만 첫 충돌과 함께 형태가 깨졌다. 반동을 버티지 못하고 그대로 바닥에 넘어졌다.' },
    { id: 'c6-momo-advice', mode: 'after-battle', speaker: '모모', text: '그래도 끝까지 싸웠잖아요. 아까보다 검도 훨씬 오래 남아 있었어요.' },
    { id: 'c6-choice-advice', mode: 'after-battle', speaker: '주인공', text: '모모가 손을 내밀었다.', choices: [
      { id: 'c6-advice-thanks', label: '손을 잡고 일어난다.', reply: '고맙습니다. 다음에는 깨지지 않게 해보겠습니다.', affection: { momo: 2 }, trust: { momo: 1 } },
      { id: 'c6-advice-return', label: '모모의 훈련도 응원한다.', reply: '모모 씨도 아까 숨지 않고 버텼습니다. 같이 다시 해보죠.', affection: { momo: 1 }, trust: { momo: 2 } },
      { id: 'c6-advice-analyze', label: '실패한 이유를 되짚는다.', reply: '형태보다 힘부터 실었습니다. 이번에는 유지하는 데 집중하겠습니다.', traits: { cautious: 2 } }
    ] },
    { id: 'c6-final-attempt', mode: 'battle', center: '기초 훈련 1-3\n\n무기 구현' },
    { id: 'c6-breathe', mode: 'battle', narration: true, text: '손에 힘을 주는 대신 머릿속의 형태를 또렷하게 붙잡았다. 손잡이와 날, 무게와 길이를 하나씩 인식했다.' },
    { id: 'c6-manifest', mode: 'battle', center: '파아앗—' },
    { id: 'c6-sword', mode: 'battle', narration: true, text: '푸른 입자가 손안으로 모이며 짧은 검의 형태를 완성했다. 희미했지만 이번에는 사라지지 않았다.' },
    { id: 'c6-first-swing', mode: 'battle', narration: true, text: '검을 휘두르자 훈련용 표적에 선명한 자국이 남았다. 손에 전해지는 무게와 반동이 분명했다.' },
    { id: 'c6-haru-praise', mode: 'after-battle', speaker: '하루', text: '성공했어요. 아직 불안정하지만 분명 당신이 구현한 검이에요.' },
    { id: 'c6-status-after', mode: 'status', center: '스테이터스 갱신\n\n레벨  1\n힘  1   민첩  1\n체력  1   정신력  1\n\n스킬  없음\n구현 무기  짧은 검' },
    { id: 'c6-momo-success', mode: 'after-battle', narration: true, text: '모모 역시 마지막 훈련에서 다크사이트를 쓰지 않았다. 표적을 쓰러뜨리지는 못했지만 도망치지 않고 끝까지 서 있었다.' },
    { id: 'c6-momo-breath', mode: 'after-battle', speaker: '모모', text: '무서웠는데…… 그래도 이번에는 숨지 않았어요.' },
    { id: 'c6-haru-end', mode: 'city', speaker: '하루', text: '오늘은 여기까지예요. 두 분 다 이제 겨우 첫걸음을 뗀 거예요.' },
    { id: 'c6-choice-end', mode: 'city', speaker: '하루', text: '훈련을 마친 두 사람을 보며 하루가 옅게 웃었다.', choices: [
      { id: 'c6-end-thanks', label: '하루에게 감사한다.', reply: '가르쳐 주셔서 감사합니다. 이 감각을 잊지 않겠습니다.', affection: { haru: 2 }, trust: { haru: 1 } },
      { id: 'c6-end-more', label: '계속 훈련하겠다고 말한다.', reply: '아직 부족합니다. 내일부터도 계속 연습하겠습니다.', trust: { haru: 1 }, traits: { brave: 1 } },
      { id: 'c6-end-together', label: '모모와 함께 강해지겠다고 말한다.', reply: '모모 씨와 같이 다음에는 더 나아지겠습니다.', affection: { momo: 1, haru: 1 }, traits: { considerate: 1 } }
    ] },
    { id: 'c6-final-monologue', mode: 'black', speaker: '주인공', text: '맨손밖에 없던 내 손에 처음으로 검이 생겼다. 아직 약하지만, 적어도 어제와 같은 나는 아니다.' },
    { id: 'c6-clear', mode: 'black', center: 'CHAPTER 6 CLEAR' },
    { id: 'c6-end', mode: 'black', ending: true, center: '처음으로 자신의 무기를 구현했다.' }
  ]
};