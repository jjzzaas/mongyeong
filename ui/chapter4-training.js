(()=>{
  const versionText=()=>window.gameVersionText?.()||'Ver. 3.6';

  function renderTrainingBattle(){
    let haruHp=90;
    let playerHp=42;
    let focused=false;
    let guard=false;
    let finished=false;
    let speed=1;

    const delay=base=>Math.max(140,Math.round(base/speed));

    mount(`<main class="screen training-battle-screen battle-screen">
      <div class="battle-controls"><button id="trainingSpeed" class="control-btn">×1</button><button class="control-btn locked" disabled>🔒 AUTO</button></div>
      <div class="battle-layout">
        <section class="battle-top">
          <div class="unit-head"><span>하루</span><span id="trainingEnemyText">90 / 90</span></div>
          <div class="hp enemy-hp"><span id="trainingEnemyHp"></span></div>
        </section>
        <section class="battle-middle">
          <div class="turn-label" id="trainingTurn">훈련 시작</div>
          <div class="battle-line" id="trainingLine">하루의 움직임을 보고 공격하세요.</div>
        </section>
        <section class="allies training-single-ally">
          <div class="ally-panel">
            <div class="unit-head"><span>${state.playerName}</span><span id="trainingPlayerText">42 / 42</span></div>
            <div class="hp"><span id="trainingPlayerHp"></span></div>
            <div class="cards">
              <button class="card-btn training-card" data-card="strike"><strong>공격</strong><small>피해 10</small></button>
              <button class="card-btn training-card" data-card="guard"><strong>방어</strong><small>피해 감소</small></button>
              <button class="card-btn training-card" data-card="wait"><strong>틈 보기</strong><small>다음 공격 강화</small></button>
            </div>
          </div>
        </section>
      </div>
      <div class="battle-version">${versionText()}</div>
    </main>`,()=>{
      const line=document.getElementById('trainingLine');
      const turn=document.getElementById('trainingTurn');
      const cards=[...document.querySelectorAll('.training-card')];
      const speedButton=document.getElementById('trainingSpeed');

      const sync=()=>{
        document.getElementById('trainingEnemyHp').style.width=`${Math.max(0,haruHp)/90*100}%`;
        document.getElementById('trainingPlayerHp').style.width=`${Math.max(0,playerHp)/42*100}%`;
        document.getElementById('trainingEnemyText').textContent=`${Math.max(0,haruHp)} / 90`;
        document.getElementById('trainingPlayerText').textContent=`${Math.max(0,playerHp)} / 42`;
      };

      const setCards=enabled=>cards.forEach(card=>card.disabled=!enabled);

      const finish=()=>{
        finished=true;
        setCards(false);
        turn.textContent='TRAINING COMPLETE';
        line.textContent='하루가 무기를 거두었다. 화면을 터치하여 계속';
        localStorage.setItem('mongyeong.speedUnlocked','1');
        app.firstElementChild.addEventListener('click',next,{once:true});
      };

      const haruTurn=()=>{
        if(finished)return;
        setCards(false);
        turn.textContent='상대 · 하루';
        setTimeout(()=>{
          const damage=guard?4:8;
          guard=false;
          playerHp=Math.max(1,playerHp-damage);
          line.textContent=`하루의 가벼운 일격. ${damage}의 피해.`;
          sync();
          setTimeout(()=>{
            turn.textContent=`아군 · ${state.playerName}`;
            line.textContent='다음 행동을 선택하세요.';
            setCards(true);
          },delay(520));
        },delay(520));
      };

      cards.forEach(card=>card.onclick=()=>{
        if(finished)return;
        setCards(false);
        const action=card.dataset.card;
        if(action==='strike'){
          const damage=focused?18:10;
          focused=false;
          haruHp-=damage;
          line.textContent=`하루에게 ${damage}의 피해.`;
        }else if(action==='guard'){
          guard=true;
          line.textContent='자세를 낮추고 다음 공격에 대비했다.';
        }else{
          focused=true;
          line.textContent='하루의 움직임을 살피며 공격할 틈을 잡았다.';
        }
        sync();
        if(haruHp<=0){setTimeout(finish,delay(420));return;}
        setTimeout(haruTurn,delay(520));
      });

      speedButton.onclick=()=>{
        speed=speed===1?2:speed===2?3:1;
        speedButton.textContent=`×${speed}`;
      };

      sync();
      turn.textContent=`아군 · ${state.playerName}`;
      setCards(true);
    });
  }

  function renderSpeedUnlock(){
    mount(`<main class="screen status speed-unlock-screen"><section class="box"><div class="chapter-title">SPEED UNLOCK</div><div class="text" style="margin-top:18px">전투 배속 기능이 활성화되었습니다.<br>×1 · ×2 · ×3</div></section><div class="hint">터치하여 계속</div><div class="version">${versionText()}</div></main>`,()=>{app.firstElementChild.onclick=next;});
  }

  const originalRenderScene=renderScene;
  renderScene=function(scene){
    if(scene.type==='trainingBattle'){renderTrainingBattle();return;}
    if(scene.type==='speedUnlock'){renderSpeedUnlock();return;}
    originalRenderScene(scene);
  };
})();
