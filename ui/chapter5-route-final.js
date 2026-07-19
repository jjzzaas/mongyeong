(()=>{
  const previousRenderScene=window.renderScene;
  if(typeof previousRenderScene!=='function')return;

  function normalizeTrainingCenterTerms(scene){
    if(!scene||typeof scene!=='object')return scene;
    const normalized={...scene};
    if(typeof normalized.text==='string'){
      normalized.text=normalized.text.replaceAll('훈련장','훈련 센터').replaceAll('훈련소','훈련 센터');
    }
    return normalized;
  }

  function renderGuildRouteFinal(){
    mount(`<main class="screen hunter-district-screen"><section class="district-panel"><div class="district-kicker">HUNTER DISTRICT</div><h1>헌터 지구</h1><p>길드장에게 호출을 받았다. 길드로 이동하자.</p><div class="district-grid"><button class="district-card is-locked" disabled><span>01</span><strong>훈련 센터</strong><small>오늘의 훈련을 마쳤다</small><em>이용 불가</em></button><button class="district-card is-open quest-target" id="chapter5-guild-target"><span>02</span><strong>길드</strong><small>길드장이 기다리고 있다</small><i class="quest-dot" aria-hidden="true"></i><em>목적지</em></button><button class="district-card is-locked" disabled><span>03</span><strong>장비 정비소</strong><small>장비 점검 및 조정</small><em>이용 불가</em></button><button class="district-card is-locked" disabled><span>04</span><strong>구현화 실험실</strong><small>정신 에너지 구현 연구</small><em>이용 불가</em></button></div></section><div class="version">${window.gameVersionText?.()||'Ver. 6.5'}</div></main>`,()=>{
      const target=document.getElementById('chapter5-guild-target');
      if(target)target.addEventListener('click',()=>next(),{once:true});
    });
  }

  window.renderScene=function(scene){
    const normalized=normalizeTrainingCenterTerms(scene);
    if(normalized?.type==='guildRoute'){
      renderGuildRouteFinal();
      return;
    }
    previousRenderScene(normalized);
  };
})();
