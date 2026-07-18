(()=>{
  window.CHAPTER_5=[
    {type:'black',text:'CHAPTER 5\n\n혼자 걷는 첫걸음'},
    {type:'lodging',text:'눈을 뜨자 이제는 제법 익숙해진 숙소의 천장이 보였다.\n어제 훈련의 피로가 아직 몸 곳곳에 남아 있었다.'},
    {type:'lodging',speaker:'주인공',text:'하루 씨는 오늘부터 다시 임무를 나간다고 했지.\n그렇다면 오늘은 혼자서 해봐야겠네.'},
    {type:'black',text:'혼자서도 계속해야 한다.\n우선 어제 배운 것부터 천천히 다시 해보자.'},
    {type:'lodging',text:'가볍게 몸을 풀고 준비를 마친 뒤 숙소를 나섰다.\n훈련장으로 향하는 길에는 따뜻한 아침 햇살이 조금씩 번지고 있었다.'},

    {type:'city',text:'헌터지구로 향하며 어제 배운 동작을 하나씩 떠올렸다.\n머릿속으로 순서를 되짚던 중, 길 건너편에서 익숙한 목소리가 들려왔다.'},
    {type:'city',speaker:'모모',text:'어, 좋은 아침.\n오늘도 훈련하러 가는 거야?'},
    {type:'relationshipChoice',screenType:'city',speaker:'주인공',text:'모모 씨에게 뭐라고 대답할까?',affinityKey:'momoAffinity',choices:[
      {text:'네. 어제 배운 걸 잊기 전에 조금 더 연습해보려고요.',playerLine:'네. 어제 배운 걸 잊기 전에 조금 더 연습해보려고요.',affinityKey:null,affinity:0,response:'그렇구나. 그래도 너무 무리하진 마.'},
      {text:'모모 씨도 같이 가실래요?',playerLine:'모모 씨도 같이 가실래요?',affinityKey:'momoAffinity',affinity:2,response:'같이 가고 싶긴 한데, 오늘은 따로 가볼 곳이 있어.\n다음에는 같이 가자.'},
      {text:'모모 씨는 어디 가세요?',playerLine:'모모 씨는 어디 가세요?',affinityKey:null,affinity:0,response:'나는…… 그, 놀이공원에 가려고.\n전에 지나가면서 봤는데 조금 궁금해서.'}
    ]},
    {type:'relationshipResponse',screenType:'city',speaker:'모모',fallback:'응. 잘 다녀와.'},
    {type:'city',speaker:'주인공',text:'알겠습니다.\n그럼 모모 씨도 잘 다녀오세요.'},
    {type:'city',speaker:'모모',text:'응. 훈련도 조심해서 하고 와.'},
    {type:'city',text:'모모와 인사를 나눈 뒤 다시 훈련장 쪽으로 걸음을 옮겼다.\n짧은 대화를 나누고 나니 혼자 향하던 길도 조금은 가볍게 느껴졌다.'},
    {type:'city',text:'얼마 지나지 않아 헌터지구의 높은 건물들이 시야에 들어왔다.\n그중 어제 방문했던 훈련 센터의 입구를 향해 곧장 걸어갔다.'},
    {type:'hunterDistrict'},

    {type:'trainingMap',unlocked:6},
    {type:'soloTrainingBattle',stage:6,enemyType:'heavy'},
    {type:'trainingMap',unlocked:7},
    {type:'soloTrainingBattle',stage:7,enemyType:'agile'},
    {type:'trainingMap',unlocked:8},
    {type:'soloTrainingBattle',stage:8,enemyType:'heavy'},
    {type:'trainingMap',unlocked:9},
    {type:'soloTrainingBattle',stage:9,enemyType:'agile'},
    {type:'trainingMap',unlocked:10},
    {type:'soloTrainingBattle',stage:10,enemyType:'heavy'},
    {type:'city',speaker:'주인공',text:'좋아. 기초 훈련 1-10까지는 전부 끝냈어.\n잠깐 숨을 고르고 다음 훈련을 준비하자.'}
  ];
})();