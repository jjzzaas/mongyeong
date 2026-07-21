// 새 챕터를 만들 때 이 파일을 복사해 사용합니다.
export default {
  id: 0,
  title: '챕터 제목',
  status: 'draft',

  scenes: [
    {
      id: 'scene-001',
      mode: 'black',
      speaker: '주인공',
      text: '대사를 입력하세요.',
    },
    {
      id: 'choice-001',
      mode: 'black',
      speaker: '주인공',
      text: '어떻게 행동할까?',
      choices: [
        {
          id: 'choice-001-a',
          label: '첫 번째 선택지',
          reply: '선택 후 출력할 대사',
          affection: { haru: 0 },
          trust: {},
          traits: {},
          flags: [],
        },
      ],
    },
  ],
};
