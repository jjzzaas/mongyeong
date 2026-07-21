export const chapter006 = {
  id: 6,
  title: '첫 정식 의뢰',
  scenes: [
    { id: 'c6-title', mode: 'black', center: 'CHAPTER 6\n\n첫 정식 의뢰' },
    { id: 'c6-departure', mode: 'city-gate', narration: true, text: '출발 시간이 되자 성문 앞에 호송 마차와 지원 인력이 모였다.' },
    { id: 'c6-momo-arrive', mode: 'city-gate', speaker: '모모', text: '늦은 건 아니죠? 이번에는 저도 정식으로 같이 가요.' },
    { id: 'c6-choice-greeting', mode: 'city-gate', speaker: '주인공', text: '모모에게 뭐라고 답할까.', choices: [
      { id: 'c6-greeting-welcome', label: '함께여서 다행이라고 말한다.', reply: '모모 씨가 함께라서 다행입니다.', affection: { momo: 2 }, trust: { momo: 1 } },
      { id: 'c6-greeting-ready', label: '준비됐는지 확인한다.', reply: '준비는 다 되셨나요?', trust: { momo: 1 }, traits: { cautious: 1 } },
      { id: 'c6-greeting-joke', label: '늦지 않았다고 가볍게 말한다.', reply: '아직 출발 전이니 늦지 않았습니다.', affection: { momo: 1 } }
    ] },
    { id: 'c6-escort-leader', mode: 'city-gate', speaker: '호송대장', text: '이번 임무는 물자를 안전하게 인도하는 것이다. 전투보다 경로 유지가 우선이다.' },
    { id: 'c6-road', mode: 'forest-exit', narration: true, text: '마차는 도시 외곽 도로를 따라 천천히 움직였다. 처음 한동안은 별다른 문제가 없었다.' },
    { id: 'c6-trace', mode: 'danger', narration: true, text: '그러나 길가에서 검게 마른 풀과 부서진 바퀴 자국이 발견됐다.' },
    { id: 'c6-choice-investigate', mode: 'danger', speaker: '호송대장', text: '누군가 먼저 확인해야 한다.', choices: [
      { id: 'c6-investigate-self', label: '직접 앞을 확인하겠다고 나선다.', reply: '제가 먼저 확인하겠습니다.', traits: { brave: 2 }, flags: ['volunteered_escort_scout'] },
      { id: 'c6-investigate-momo', label: '정찰에 익숙한 모모에게 의견을 묻는다.', reply: '모모 씨가 보기에는 어떤가요?', trust: { momo: 2 }, traits: { considerate: 1 } },
      { id: 'c6-investigate-route', label: '우회로가 있는지 먼저 확인한다.', reply: '위험을 감수하기 전에 우회로부터 확인하는 게 좋겠습니다.', traits: { cautious: 2 } }
    ] },
    { id: 'c6-ambush', mode: 'danger', narration: true, text: '바위 뒤에서 악몽들이 모습을 드러냈다. 마차를 노리고 길 양쪽에서 접근하고 있었다.' },
    { id: 'c6-battle-start', mode: 'battle', center: '호송로 방어전' },
    { id: 'c6-momo-call', mode: 'battle', speaker: '모모', text: '왼쪽은 제가 막을게요! 마차 쪽을 부탁해요!' },
    { id: 'c6-choice-defense', mode: 'battle', speaker: '주인공', text: '무엇을 우선해야 할까.', choices: [
      { id: 'c6-defense-cart', label: '마차와 물자를 지킨다.', reply: '마차 쪽은 제가 맡겠습니다.', traits: { cautious: 1 }, flags: ['protected_escort_cart'] },
      { id: 'c6-defense-momo', label: '모모의 위험을 먼저 막는다.', reply: '모모 씨, 뒤쪽을 조심하세요!', affection: { momo: 2 }, trust: { momo: 1 } },
      { id: 'c6-defense-enemy', label: '가장 큰 악몽을 먼저 공격한다.', reply: '큰 놈부터 쓰러뜨리겠습니다.', traits: { brave: 2 }, flags: ['targeted_escort_leader_enemy'] }
    ] },
    { id: 'c6-battle-end', mode: 'after-battle', narration: true, text: '단검의 형태는 아직 불안정했지만, 이전보다 오래 유지됐다. 마지막 악몽이 쓰러지자 길이 다시 조용해졌다.' },
    { id: 'c6-momo-check', mode: 'after-battle', speaker: '모모', text: '다친 데 없어요? 아까 움직임은 전보다 훨씬 나았어요.' },
    { id: 'c6-choice-after', mode: 'after-battle', speaker: '주인공', text: '전투를 마친 모모에게 어떻게 답할까.', choices: [
      { id: 'c6-after-worry', label: '모모가 무사해서 다행이라고 말한다.', reply: '저보다 모모 씨가 무사해서 다행입니다.', affection: { momo: 2 }, traits: { considerate: 1 } },
      { id: 'c6-after-team', label: '함께 싸워서 가능했다고 말한다.', reply: '혼자였다면 막지 못했을 겁니다.', trust: { momo: 2 } },
      { id: 'c6-after-reflect', label: '아직 부족했다고 평가한다.', reply: '아직 검을 제대로 다루지 못했습니다. 더 연습해야겠어요.', traits: { cautious: 1 } }
    ] },
    { id: 'c6-arrival', mode: 'city-gate', narration: true, text: '해가 기울 무렵, 호송대는 목적지에 도착했다. 물자는 하나도 잃지 않았다.' },
    { id: 'c6-leader-praise', mode: 'city-gate', speaker: '호송대장', text: '첫 정식 의뢰치고는 잘했다. 길드에 완료 보고를 올리겠다.' },
    { id: 'c6-return', mode: 'black', speaker: '주인공', text: '처음으로 누군가에게 맡겨진 일을 끝냈다. 아주 조금은 이 세계에서 살아갈 수 있을 것 같았다.' },
    { id: 'c6-clear', mode: 'black', center: 'CHAPTER 6 CLEAR' },
    { id: 'c6-end', mode: 'black', ending: true, center: 'CHAPTER 6\n\n완료' }
  ]
};