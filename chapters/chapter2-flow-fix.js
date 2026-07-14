(()=>{
  const scenes=window.CHAPTER_1;
  if(!Array.isArray(scenes))return;

  const chapter2Index=scenes.findIndex(scene=>scene.type==='chapter2');
  if(chapter2Index<0)return;

  const guildInteriorIndex=scenes.findIndex((scene,index)=>
    index>chapter2Index&&scene.type==='guild'&&typeof scene.text==='string'&&scene.text.startsWith('문이 열렸다.')
  );
  if(guildInteriorIndex<0)return;

  const revisedOpening=[
    {type:'chapter2'},
    {type:'city',text:'중앙도시 안쪽으로 들어서자, 숲과는 전혀 다른 풍경이 펼쳐졌다.\n넓게 뻗은 거리와 그 사이를 가득 메운 건물들이 시야 끝까지 이어져 있었다.'},
    {type:'city',text:'빛이 흐르는 표지판 아래로 사람들이 끊임없이 오갔다.\n가게 문이 열릴 때마다 말소리와 음식 냄새가 거리로 흘러나왔다.'},
    {type:'city',text:'처음 보는 곳인데도 도시는 멈추지 않았다.\n누군가는 목적지를 향해 서둘렀고, 누군가는 길가에 서서 동료를 기다리고 있었다.'},
    {type:'mainLobby',speaker:'하루',text:'우선 길드부터 가보자.\n네가 이곳 사람이라면 뭔가 기록이 남아 있을지도 몰라.\n나도 임무 완료 보고를 해야 하니까, 어차피 가야 하거든.'},
    {type:'city',text:'하루를 따라 도시 중심부를 향해 걸었다.\n조금 전에는 보이지 않던 것들이 하나둘 눈에 들어오기 시작했다.'},
    {type:'city',text:'허리에 검을 찬 남자. 등에 거대한 창을 멘 여자.\n처음 보는 형태의 무기를 손질하며 길가에 앉아 있는 사람들까지.'},
    {type:'city',text:'그들 대부분은 혼자가 아니었다.\n두 명, 세 명, 때로는 네 명씩 무리를 이루어 같은 방향으로 움직이고 있었다.'},
    {type:'city',text:'한쪽에서는 지도를 펼쳐 경로를 확인했고, 다른 쪽에서는 서로의 장비를 점검했다.\n출발을 앞둔 파티와 임무를 마치고 돌아온 파티가 거리 위에서 엇갈렸다.'},
    {type:'city',speaker:s=>s.playerName,text:'저 사람들은……?'},
    {type:'city',speaker:'하루',text:'임무 나가는 사람들이야.\n악몽은 혼자 상대하기 어려우니까 대부분 파티를 꾸려서 움직여.'},
    {type:'city',text:'조금 더 걷자 온몸에 상처를 입은 채 동료의 부축을 받으며 돌아오는 사람들도 보였다.'},
    {type:'city',text:'웃으며 이야기를 나누는 사람들 사이로, 누군가의 이름이 적힌 작은 꽃다발을 들고 조용히 걷는 사람도 지나갔다.'},
    {type:'city',text:'나는 그 모습을 잠시 바라봤다.\n하루는 설명하지 않았고, 나도 묻지 않았다.'},
    {type:'city',text:'도시의 중심으로 가까워질수록 사람들의 흐름은 한 건물을 향해 모여들었다.\n수많은 사람이 끊임없이 드나드는 거대한 건물이었다.'},
    {type:'city',text:'건물 정면에는 단 하나의 글자가 크게 새겨져 있었다.\n\nGUILD'},
    {type:'city',speaker:'하루',text:'여기가 길드야.'}
  ];

  scenes.splice(chapter2Index,guildInteriorIndex-chapter2Index,...revisedOpening);
})();