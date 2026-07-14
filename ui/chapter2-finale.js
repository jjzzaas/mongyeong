(()=>{
  const previousRenderScene=renderScene;

  function renderRelationshipUnlock(){
    localStorage.setItem('mongyeong.relationshipUnlocked','true');
    mount(`<main class="screen relationship-unlock"><section class="relationship-unlock__panel"><div class="relationship-unlock__kicker">RELATIONSHIP</div><div class="relationship-unlock__title">하루</div><div class="relationship-unlock__text">새로운 관계가 시작되었습니다.</div><div class="relationship-unlock__hidden">호감도는 아직 공개되지 않습니다.</div></section><div class="hint">터치하여 계속</div><div class="version">Ver. 1.3</div></main>`,()=>app.firstElementChild.onclick=next);
  }

  function renderSleep(scene){
    mount(`<main class="screen sleep-scene"><section class="sleep-scene__text">${scene.text.replace(/\n/g,'<br>')}</section><div class="hint">터치하여 계속</div><div class="version">Ver. 1.3</div></main>`,()=>app.firstElementChild.onclick=next);
  }

  renderScene=function(scene){
    if(scene.type==='relationshipUnlock'){renderRelationshipUnlock();return;}
    if(scene.type==='sleep'){renderSleep(scene);return;}
    previousRenderScene(scene);
  };
})();