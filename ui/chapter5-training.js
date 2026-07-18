(()=>{
  const versionText=()=>window.gameVersionText?.()||'Ver. 5.8';
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const SPEED_KEY='mongyeong.battleSpeed';
  const AUTO_KEY='mongyeong.battleAuto';
  const getSpeed=()=>[1,2,3].includes(Number(localStorage.getItem(SPEED_KEY)))?Number(localStorage.getItem(SPEED_KEY)):1;
  const getAuto=()=>localStorage.getItem(AUTO_KEY)==='1';

  function renderSoloTraining(scene){
    const stage=Number(scene.stage||6);
    const type=scene.enemyType==='agile'?'agile':'heavy';
    const enemy=type==='heavy'
      ?{name:'강화 훈련체',hp:42+(stage-6)*6,maxHp:42+(stage-6)*6,damage:7+(stage-6)}
      :{name:'기동 훈련체',hp:30+(stage-6)*5,maxHp:30+(stage-6)*5,damage:5+(stage-6)};
    const player={name:state.playerName,hp:52,maxHp:52,damage:type==='heavy'?14:12};
    const autoUnlocked=localStorage.getItem('mongyeong.autoUnlocked')==='1';
    let turn='player',ended=false,speed=getSpeed(),auto=autoUnlocked&&getAuto(),autoTimer=null;

    mount(`<main class="screen battle-intro"><div class="battle-start-flash">BATTLE START</div><div class="battle-start-sub">기초 훈련 1-${stage} · ${enemy.name}</div><div class="version">${versionText()}</div></main>`,()=>setTimeout(start,900));

    function start(){
      mount(`<main class="screen battle-screen training-battle-screen"><div class="battle-controls"><button id="soloSpeed" class="control-btn">×${speed}</button><button id="soloAuto" class="control-btn ${autoUnlocked?'':'locked'}" ${autoUnlocked?'':'disabled'}>${autoUnlocked?(auto?'AUTO ON':'AUTO OFF'):'🔒 AUTO'}</button></div><div class="battle-layout battle-layout-v24"><section class="enemy-formation chapter3-enemies"><button class="battle-enemy-card is-targeted" data-solo-enemy><strong>${enemy.name}</strong><div class="hp enemy-hp"><span id="soloEnemyHp"></span></div><em id="soloEnemyText"></em></button>${[2,3,4,5].map(slot=>`<div class="battle-enemy-card is-empty"><span>적 ${slot}</span></div>`).join('')}</section><section class="battle-middle"><div class="turn-label" id="soloTurnLabel">아군 턴 · 행동할 캐릭터 선택</div><div class="battle-line" id="soloBattleLine">${auto?'자동 전투가 진행됩니다.':'주인공 카드를 터치하세요.'}</div></section><section class="battle-cards"><button class="battle-character-card" data-solo-player><span class="battle-card-order"></span><strong>${player.name}</strong><small>한손검 · 피해 ${player.damage}</small><div class="hp"><span id="soloPlayerHp"></span></div><em id="soloPlayerText"></em></button>${[2,3,4].map(slot=>`<div class="battle-character-card is-locked"><strong>슬롯 ${slot}</strong><small>파티원 미참가</small></div>`).join('')}</section></div><div class="battle-version">${versionText()}</div></main>`,()=>{
        const card=document.querySelector('[data-solo-player]');
        const target=document.querySelector('[data-solo-enemy]');
        const line=document.getElementById('soloBattleLine');
        const label=document.getElementById('soloTurnLabel');
        const speedBtn=document.getElementById('soloSpeed');
        const autoBtn=document.getElementById('soloAuto');
        const sync=()=>{
          document.getElementById('soloEnemyHp').style.width=`${Math.max(0,enemy.hp)/enemy.maxHp*100}%`;
          document.getElementById('soloPlayerHp').style.width=`${Math.max(0,player.hp)/player.maxHp*100}%`;
          document.getElementById('soloEnemyText').textContent=`${Math.max(0,enemy.hp)} / ${enemy.maxHp}`;
          document.getElementById('soloPlayerText').textContent=`${Math.max(0,player.hp)} / ${player.maxHp}`;
        };
        const queueAuto=()=>{
          clearTimeout(autoTimer);
          if(!auto||ended||turn!=='player')return;
          autoTimer=setTimeout(()=>card.click(),Math.max(170,520/speed));
        };
        const finish=async win=>{
          if(ended)return;ended=true;clearTimeout(autoTimer);card.disabled=true;target.disabled=true;
          label.textContent=win?'TRAINING CLEAR':'TRAINING FAILED';
          line.textContent=win?`기초 훈련 1-${stage}을 클리어했습니다.`:'훈련을 다시 시작합니다.';
          await wait(650);
          if(win){line.textContent+=' 화면을 터치하여 계속';app.firstElementChild.addEventListener('click',next,{once:true});}
          else renderSoloTraining(scene);
        };
        const enemyTurn=async()=>{
          turn='enemy';card.disabled=true;label.textContent=`상대 턴 · ${enemy.name}`;
          await wait(Math.max(160,430/speed));
          player.hp-=enemy.damage;line.textContent=`${enemy.name}의 공격. ${enemy.damage}의 피해.`;sync();
          if(player.hp<=0){finish(false);return;}
          await wait(Math.max(180,520/speed));turn='player';card.disabled=false;card.classList.remove('is-acted');card.querySelector('.battle-card-order').textContent='';label.textContent='아군 턴 · 행동할 캐릭터 선택';line.textContent=auto?'자동 전투가 진행됩니다.':'주인공 카드를 터치하세요.';queueAuto();
        };
        card.onclick=async()=>{
          if(turn!=='player'||ended)return;turn='busy';clearTimeout(autoTimer);card.disabled=true;card.classList.add('is-acted');card.querySelector('.battle-card-order').textContent='1번째 행동';enemy.hp-=player.damage;line.textContent=`${player.name}이 한손검으로 공격했습니다. ${player.damage}의 피해.`;sync();
          if(enemy.hp<=0){await wait(400);finish(true);return;}
          await wait(Math.max(160,380/speed));enemyTurn();
        };
        speedBtn.onclick=()=>{
          speed=speed===1?2:speed===2?3:1;
          localStorage.setItem(SPEED_KEY,String(speed));
          speedBtn.textContent=`×${speed}`;
          queueAuto();
        };
        if(autoUnlocked)autoBtn.onclick=()=>{
          auto=!auto;
          localStorage.setItem(AUTO_KEY,auto?'1':'0');
          autoBtn.textContent=auto?'AUTO ON':'AUTO OFF';
          line.textContent=auto?'자동 전투가 진행됩니다.':'자동 전투가 해제되었습니다.';
          if(auto)queueAuto();else clearTimeout(autoTimer);
        };
        sync();queueAuto();
      });
    }
  }

  const previousRenderScene=renderScene;
  renderScene=function(scene){
    if(scene.type==='soloTrainingBattle'){renderSoloTraining(scene);return;}
    previousRenderScene(scene);
  };
})();