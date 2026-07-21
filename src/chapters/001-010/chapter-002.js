export const chapter002 = {
  id: 2,
  title: '기록되지 않은 사람',
  scenes: [
    { id: 'c2-title', mode: 'black', center: 'CHAPTER 2\n\n기록되지 않은 사람' },
    { id: 'c2-guild-open', mode: 'guild-front', narration: true, text: '길드의 문이 열리자 사람들의 목소리와 발걸음이 한꺼번에 밀려왔다.' },
    { id: 'c2-hall', mode: 'city', narration: true, text: '벽에는 수많은 의뢰서가 붙어 있었고, 무기를 든 사람들이 접수대와 게시판 사이를 오갔다.' },
    { id: 'c2-guide', mode: 'city', speaker: '안내원', text: '하루 씨, 임무 보고인가요?' },
    { id: 'c2-haru-report', mode: 'city', speaker: '하루', text: '네. 그리고 확인해 주셨으면 하는 사람이 있어요. 몽환 숲에서 발견했는데 기억이 전혀 없대요.' },
    { id: 'c2-guide-to-mc', mode: 'city', speaker: '안내원', text: '성함과 소속을 말씀해 주시겠어요?' },
    { id: 'c2-choice-answer', mode: 'city', speaker: '주인공', text: '아는 것이 거의 없다.', choices: [
      { id: 'c2-answer-honest', label: '기억이 없다고 솔직히 말한다.', reply: '죄송하지만 이름도 소속도 기억나지 않습니다.', trust: { haru: 1 }, traits: { considerate: 1 } },
      { id: 'c2-answer-status', label: '스테이터스 결과를 말한다.', reply: '스테이터스에는 이름을 알 수 없다고 표시됩니다.', traits: { cautious: 1 }, flags: ['reported_unknown_status'] },
      { id: 'c2-answer-forest', label: '숲에서 깨어났다고 설명한다.', reply: '몽환 숲에서 눈을 떴습니다. 그 이전은 전혀 기억나지 않습니다.', traits: { cautious: 1 } }
    ] },
    { id: 'c2-search', mode: 'city', narration: true, text: '안내원은 이름, 외형, 스테이터스 식별 정보까지 차례로 조회했다.' },
    { id: 'c2-search-result', mode: 'status', center: '길드 기록 조회\n\n일치하는 신원 정보 없음\n헌터 등록 정보 없음\n거주 기록 없음' },
    { id: 'c2-guide-confused', mode: 'city', speaker: '안내원', text: '이상하네요. 신원 정보가 하나도 없는 사람은 거의 없는데…….' },
    { id: 'c2-status-question', mode: 'city', speaker: '안내원', text: '본인 스테이터스 창은 열 수 있나요?' },
    { id: 'c2-status-show', mode: 'status', center: '스테이터스\n\n이름  알 수 없음\n레벨  1\n힘  1   민첩  1\n체력  1   정신력  1\n스킬  없음\n구현 무기  없음' },
    { id: 'c2-guide-confirm', mode: 'city', speaker: '안내원', text: '창이 열린다는 건 이 세계의 법칙에는 연결되어 있다는 뜻이에요. 다만 현재 정보만으로는 신원을 증명할 수 없어요.' },
    { id: 'c2-haru-room', mode: 'city', speaker: '하루', text: '그럼 오늘 밤만이라도 임시 숙소를 쓸 수 없을까요? 저 상태로 밖에 둘 수는 없잖아요.' },
    { id: 'c2-guide-hesitate', mode: 'city', speaker: '안내원', text: '등록되지 않은 사람에게 숙소를 제공하는 건 원칙상 어렵지만…… 하루 씨가 발견 경위를 보증한다면 하룻밤은 가능해요.' },
    { id: 'c2-choice-room', mode: 'city', speaker: '주인공', text: '두 사람의 배려를 어떻게 받아들일까.', choices: [
      { id: 'c2-room-thanks', label: '두 사람에게 감사한다.', reply: '감사합니다. 신세를 반드시 갚겠습니다.', affection: { haru: 2 }, trust: { haru: 1 }, traits: { considerate: 1 } },
      { id: 'c2-room-work', label: '대가를 치르겠다고 말한다.', reply: '그냥 받을 수는 없습니다. 제가 할 수 있는 일이 있다면 시켜주세요.', traits: { justice: 1, brave: 1 }, flags: ['offered_to_repay_room'] },
      { id: 'c2-room-cautious', label: '숙소 규칙을 먼저 확인한다.', reply: '허락해 주신다면 규칙을 지키겠습니다. 주의할 점을 알려주세요.', traits: { cautious: 1 } }
    ] },
    { id: 'c2-haru-leave', mode: 'city', speaker: '하루', text: '저는 남은 임무 보고를 마치고 바로 다른 일정으로 가야 해요. 내일 다시 길드로 오세요.' },
    { id: 'c2-guide-key', mode: 'city', speaker: '안내원', text: '임시 숙소는 공동 사용 구역이에요. 빈 침상을 하나 쓰시면 됩니다. 오늘 밤까지만 허가할게요.' },
    { id: 'c2-room-walk', mode: 'city', narration: true, text: '안내원을 따라 길드 뒤편의 낡은 숙소 건물로 향했다. 화려하지는 않았지만 비바람을 피할 수 있는 곳이었다.' },
    { id: 'c2-room-enter', mode: 'black', narration: true, text: '방 안에는 침상 두 개와 작은 창문, 낡은 옷장이 전부였다. 다른 침상은 비어 있었다.' },
    { id: 'c2-alone', mode: 'black', speaker: '주인공', text: '하룻밤뿐이다. 내일은 내가 누구인지, 여기서 무엇을 해야 하는지 알아내야 한다.' },
    { id: 'c2-sleep', mode: 'black', narration: true, text: '몸을 눕히자 하루 동안 억지로 붙잡고 있던 긴장이 풀렸다. 의식은 금세 깊은 어둠 속으로 가라앉았다.' },
    { id: 'c2-clear', mode: 'black', center: 'CHAPTER 2 CLEAR' },
    { id: 'c2-end', mode: 'black', ending: true, center: '이름 없는 사람에게 허락된 단 하룻밤.' }
  ]
};