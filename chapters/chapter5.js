(()=>{
  window.CHAPTER_5=[
    {type:'black',text:'CHAPTER 5\n\n혼자 걷는 첫걸음'},
    {type:'lodging',text:'눈을 뜨자 익숙해진 숙소의 천장이 보였다.\n어제 훈련의 피로가 아직 온몸에 남아 있었다.'},
    {type:'lodging',text:'하루는 오늘부터 다시 임무를 나간다고 했다.\n이제부터는 배운 것을 혼자 반복하며 익혀야 한다.'},
    {type:'black',text:'아직 부족하다.\n오늘도 훈련장에 가자.'},
    {type:'lodging',text:'몸을 일으켜 준비를 마친 뒤 숙소를 나섰다.'},

    {type:'city',text:'훈련장으로 향하던 중, 문득 모모가 떠올랐다.\n가기 전에 잠깐 얼굴을 보고 가도 괜찮을 것 같았다.'},
    {type:'relationshipChoice',screenType:'city',speaker:'주인공',text:'모모 씨를 만나면 무슨 말을 해볼까?',affinityKey:'momoAffinity',choices:[
      {text:'같이 훈련하자고 해본다.',playerLine:'혹시 오늘도 같이 훈련하시겠습니까?',affinityKey:'momoAffinity',affinity:2,response:'나도 같이 가고는 싶은데, 오늘은 맡은 일이 있어.\n미안. 다음에는 같이 가줄게.'},
      {text:'인사만 하고 훈련장으로 간다.',playerLine:'훈련장에 가는 길이라 인사드리러 왔습니다.',affinityKey:null,affinity:0,response:'응.\n조심해서 다녀와.'},
      {text:'오늘은 같이 놀자고 해본다.',playerLine:'오늘은 훈련 대신 같이 시간을 보내시는 건 어떻습니까?',affinityKey:'haruAffinity',affinity:-1,response:'나도 같이 놀고는 싶은데, 오늘은 맡은 일이 있어서 안 돼.\n미안. 다음에 시간 맞으면 같이 놀자.'}
    ]},
    {type:'relationshipResponse',screenType:'city',speaker:'모모',fallback:'응. 조심해서 다녀와.'},
    {type:'city',speaker:'주인공',text:'알겠습니다.\n그럼 다녀오겠습니다.'},
    {type:'city',speaker:'모모',text:'응. 잘 다녀와.'},
    {type:'city',text:'모모와 인사를 마친 뒤 다시 훈련장으로 향했다.\n무슨 말을 건넸든, 오늘 해야 할 일은 달라지지 않았다.'},
    {type:'black',text:'오늘도 훈련한다.\n조금이라도 더 강해지기 위해서.'},
    {type:'city',text:'잠시 후, 헌터지구의 훈련장이 눈앞에 들어왔다.'}
  ];
})();