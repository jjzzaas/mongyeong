(()=>{
  function replaceChapter3MissionFlow(){
    const chapter=window.CHAPTER_3;
    if(!Array.isArray(chapter))return;
    const start=chapter.findIndex(scene=>scene?.type==='lobbyPause'&&String(scene.text||'').includes('의뢰서'));
    if(start<0)return;
    const end=start+4;
    chapter.splice(start,end-start,
      {type:'missionLobby',speaker:'모모',text:'길드에서 받은 의뢰서부터 확인해보자.'},
      {type:'officialMission',missionLabel:'의뢰서',title:'외곽 성벽 보수',description:'악몽의 습격으로 파손된 외벽 일부를 정비한다.',location:'도시 외곽 성벽',departure:'즉시 출발',warning:'위험도 낮음 · 보수 자재는 현장에서 지급',reward:'5,000 크레딧'}
    );
  }

  function replaceChapter5MissionFlow(){
    const chapter=window.CHAPTER_5;
    if(!Array.isArray(chapter))return;
    const lobbyIndex=chapter.findIndex(scene=>scene?.type==='missionLobby');
    if(lobbyIndex>=0){
      chapter[lobbyIndex]={type:'missionLobby',speaker:'주인공',text:'길드장에게 받은 의뢰서를 확인해보자.'};
    }
    const missionIndex=chapter.findIndex(scene=>scene?.type==='officialMission');
    if(missionIndex>=0){
      chapter[missionIndex]={type:'officialMission',missionLabel:'정식 의뢰',title:'호송 물자 인계 지원',description:'인접 도시에서 출발한 호송대와 도시 외곽 관문에서 접선해 보급 물자를 인계받고 길드까지 안전하게 운반한다.',location:'도시 외곽 관문',departure:'다음 날 아침',warning:'이동 중 악몽 출몰 가능성 있음',reward:'길드 규정에 따른 보수 지급'};
      const nextScene=chapter[missionIndex+1];
      if(nextScene?.type==='black'&&String(nextScene.text||'').includes('첫 정식 의뢰')){
        chapter.splice(missionIndex+1,1,
          {type:'mainLobby',speaker:'주인공',text:'출발은 내일 아침이다. 오늘은 숙소로 돌아가 쉬자.',destination:'lodging'},
          {type:'lodging',text:'의뢰 내용을 확인한 뒤 숙소로 돌아왔다. 내일 아침 출발을 위해 일찍 잠자리에 들었다.'},
          {type:'black',text:'첫 정식 의뢰를 앞둔 밤이 조용히 깊어갔다.'}
        );
      }
    }
  }

  function renderMissionLobby(scene){
    const app=document.getElementById('app');
    const level=Number(localStorage.getItem('mongyeong.level')||state?.level||1);
    const credits=Number(localStorage.getItem('mongyeong.credits')||state?.credits||0);
    app.innerHTML=`<main class="screen main-lobby chapter5-mission-lobby mission-lobby-tap">
      <header class="lobby-top">
        <div class="level-badge">Lv. ${level}</div>
        <div class="stamina"><span>활력</span><b>200 / 200</b></div>
        <div class="credits"><span>크레딧</span><b>${credits.toLocaleString()}</b></div>
      </header>
      <section class="hero-zone">
        <div class="hero-placeholder">HEROINE</div>
        <div class="speech"><strong>${scene.speaker||'주인공'}</strong><p>${String(scene.text||'받은 의뢰서를 확인해보자.').replace(/\n/g,'<br>')}</p></div>
      </section>
      <nav class="tiles">${[1,2,3,4,5,6].map(n=>`<button class="tile" disabled><span>0${n}</span><strong>${n===1?'길드':'잠김'}</strong></button>`).join('')}</nav>
      <div class="mission-guide">화면을 터치하여 의뢰서를 확인하세요.</div>
      <div class="version">${window.gameVersionText?.()||'Ver. 7.4'}</div>
    </main>`;
    app.querySelector('.mission-lobby-tap').onclick=()=>window.next();
  }

  function renderOfficialMission(scene){
    const app=document.getElementById('app');
    app.innerHTML=`<main class="screen official-mission-screen">
      <section class="official-mission-card">
        <div class="official-mission-kicker">${scene.missionLabel||'의뢰서'}</div>
        <h1>${scene.title||'의뢰'}</h1>
        <div class="mission-field"><span>내용</span><p>${scene.description||''}</p></div>
        <div class="mission-grid">
          <div class="mission-field"><span>목적지</span><p>${scene.location||'-'}</p></div>
          <div class="mission-field"><span>출발</span><p>${scene.departure||'즉시'}</p></div>
        </div>
        <div class="mission-field warning"><span>주의 사항</span><p>${scene.warning||'없음'}</p></div>
        <div class="mission-field"><span>보상</span><p>${scene.reward||'길드 규정에 따른 보수 지급'}</p></div>
        <button class="mission-confirm-btn">확인</button>
      </section>
      <div class="version">${window.gameVersionText?.()||'Ver. 7.4'}</div>
    </main>`;
    app.querySelector('.mission-confirm-btn').onclick=()=>window.next();
  }

  replaceChapter3MissionFlow();
  replaceChapter5MissionFlow();

  const priorRenderScene=window.renderScene;
  window.renderScene=function(scene){
    if(scene?.type==='missionLobby')return renderMissionLobby(scene);
    if(scene?.type==='officialMission')return renderOfficialMission(scene);
    return priorRenderScene(scene);
  };

  const priorRenderMainLobby=window.renderMainLobby;
  if(typeof priorRenderMainLobby==='function'){
    window.renderMainLobby=function(scene){
      priorRenderMainLobby(scene);
      document.querySelector('.mission-btn')?.remove();
    };
  }
})();
