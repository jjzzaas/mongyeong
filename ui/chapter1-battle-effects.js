(()=>{
  const effects=window.BattleEffects;
  if(!effects||typeof window.renderBattle!=='function')return;

  window.renderBattle=function renderChapter1BattleWithEffects(){
    const allies=[
      {id:'player',name:state.playerName,maxHp:42,hp:42,damage:10,attackType:'impact',label:'맨손 공격'},
      {id:'haru',name:'하루',maxHp:48,hp:48,damage:14,attackType:'pierce',projectileType:'arrow',label:'빛의 화살',special:'celestial'}
    ].slice(0,4);
    const enemies=[
      {id:'enemy1',name:'정체불명의 생명체',maxHp:90,hp:90,damage:8,attackType:'claw'}
    ].slice(0,5);

    let phase='ally';
    let enemyTurnIndex=0;
    let actionLocked=false;
    let haruSpecialUsed=false;
    const actedAllies=new Set();

    const allyMarkup=allies.map((unit,index)=>`
      <div class="ally-panel battle-unit-card" id="ally-${unit.id}" role="button" tabindex="0" data-ally-index="${index}" aria-label="${unit.name} 일반 공격">
        <div class="unit-head"><span>${unit.name}</span><span id="ally-text-${unit.id}">${unit.hp} / ${unit.maxHp}</span></div>
        <div class="hp"><span id="ally-hp-${unit.id}"></span></div>
        <div class="unit-action-label">카드를 터치해 공격</div>
      </div>`).join('');

    const enemyMarkup=enemies.map((unit,index)=>`
      <section class="battle-enemy-card" id="enemy-${unit.id}" data-enemy-index="${index}">
        <div class="unit-head"><span>${unit.name}</span><span id="enemy-text-${unit.id}">${unit.hp} / ${unit.maxHp}</span></div>
        <div class="hp enemy-hp"><span id="enemy-hp-${unit.id}"></span></div>
      </section>`).join('');

    mount(`<style>
      .chapter1-effect-battle{padding-top:calc(env(safe-area-inset-top) + 14px);padding-bottom:42px}
      .chapter1-effect-battle .battle-controls{left:auto;right:14px;top:calc(env(safe-area-inset-top) + 12px);display:flex;justify-content:flex-end;gap:6px;z-index:5}
      .chapter1-effect-battle .control-btn{min-width:52px;padding:7px 8px;border-radius:9px;font-size:11px;white-space:nowrap}
      .chapter1-effect-battle .battle-layout{position:relative;width:min(860px,100%);height:100%;display:grid;grid-template-rows:auto 1fr auto;gap:10px;padding-top:48px}
      .chapter1-effect-battle .battle-enemies{align-self:start}
      .chapter1-effect-battle .battle-middle{position:absolute;left:0;right:0;top:53%;transform:translateY(-50%);min-height:0;gap:6px;padding:0 12px}
      .chapter1-effect-battle .turn-label{font-size:13px;font-weight:800;letter-spacing:.12em}
      .chapter1-effect-battle .battle-line{min-height:42px;padding:5px 12px}
      .chapter1-effect-battle .battle-allies{align-self:end;margin-top:auto}
      @media(max-height:700px){
        .chapter1-effect-battle .battle-layout{padding-top:42px;gap:6px}
        .chapter1-effect-battle .battle-middle{top:51%}
        .chapter1-effect-battle .battle-line{min-height:34px}
      }
    </style><main class="screen battle-screen chapter1-effect-battle">
      <div class="battle-controls">
        <button class="control-btn locked">×1 잠김</button>
        <button class="control-btn locked">AUTO 잠김</button>
      </div>
      <div class="battle-layout">
        <section class="battle-enemies battle-enemies-${enemies.length}">${enemyMarkup}</section>
        <section class="battle-middle">
          <div class="turn-label" id="turnLabel"></div>
          <div class="battle-line" id="battleLine"></div>
        </section>
        <section class="allies battle-allies battle-allies-${allies.length}">${allyMarkup}</section>
      </div>
      <div class="battle-version">${window.gameVersionText?window.gameVersionText():'Ver. 8.0'}</div>
    </main>`,()=>{
      const line=document.getElementById('battleLine');
      const label=document.getElementById('turnLabel');
      const allyCards=allies.map(unit=>document.getElementById(`ally-${unit.id}`));

      const livingAllies=()=>allies.filter(unit=>unit.hp>0);
      const livingEnemies=()=>enemies.filter(unit=>unit.hp>0);
      const firstLivingEnemy=()=>enemies.find(unit=>unit.hp>0);
      const remainingAllies=()=>livingAllies().filter(unit=>!actedAllies.has(unit.id));

      function sync(){
        allies.forEach(unit=>{
          document.getElementById(`ally-hp-${unit.id}`).style.width=`${Math.max(0,unit.hp)/unit.maxHp*100}%`;
          document.getElementById(`ally-text-${unit.id}`).textContent=`${Math.max(0,unit.hp)} / ${unit.maxHp}`;
          document.getElementById(`ally-${unit.id}`).classList.toggle('unit-defeated',unit.hp<=0);
        });
        enemies.forEach(unit=>{
          document.getElementById(`enemy-hp-${unit.id}`).style.width=`${Math.max(0,unit.hp)/unit.maxHp*100}%`;
          document.getElementById(`enemy-text-${unit.id}`).textContent=`${Math.max(0,unit.hp)} / ${unit.maxHp}`;
          document.getElementById(`enemy-${unit.id}`).classList.toggle('unit-defeated',unit.hp<=0);
        });
      }

      function updateCardStates(){
        allyCards.forEach((card,index)=>{
          const unit=allies[index];
          card.classList.remove('active-turn','disabled-turn','turn-complete');
          if(unit.hp<=0){
            card.classList.add('disabled-turn');
          }else if(actedAllies.has(unit.id)){
            card.classList.add('turn-complete');
          }else if(phase==='ally'&&!actionLocked){
            card.classList.add('active-turn');
          }else{
            card.classList.add('disabled-turn');
          }
        });
      }

      function showAllySelection(){
        phase='ally';
        label.textContent='아군 행동';
        line.textContent='공격할 아군 카드를 선택하세요.';
        updateCardStates();
      }

      function victory(){
        actionLocked=true;
        updateCardStates();
        label.textContent='VICTORY';
        line.textContent='화면을 터치하여 계속';
        app.firstElementChild.addEventListener('click',next,{once:true});
      }

      function defeat(){
        actionLocked=true;
        updateCardStates();
        label.textContent='DEFEAT';
        line.textContent='전투를 계속할 수 없습니다.';
      }

      async function tryHaruSpecial(attacker){
        if(attacker.special!=='celestial'||haruSpecialUsed||Math.random()>=0.35)return;
        haruSpecialUsed=true;
        label.textContent='SPECIAL SKILL';
        line.innerHTML='<strong>하루 — 천체낙하</strong><br>푸른 천체의 빛이 적 전체를 덮쳤다.';
        const targets=livingEnemies();
        for(const enemy of targets){
          await effects.playAttack({
            attacker:document.getElementById(`ally-${attacker.id}`),
            target:document.getElementById(`enemy-${enemy.id}`),
            type:'energy',projectileType:'energy',damage:24,heavy:true,
            onImpact:()=>{enemy.hp-=24;sync();}
          });
        }
      }

      async function beginEnemyRound(){
        phase='enemy';
        enemyTurnIndex=0;
        actionLocked=true;
        updateCardStates();
        await runNextEnemyTurn();
      }

      async function runNextEnemyTurn(){
        const activeEnemies=livingEnemies();
        if(!activeEnemies.length){victory();return;}
        if(enemyTurnIndex>=activeEnemies.length){
          actedAllies.clear();
          actionLocked=false;
          showAllySelection();
          return;
        }

        const enemy=activeEnemies[enemyTurnIndex];
        const targets=livingAllies();
        if(!targets.length){defeat();return;}
        const target=targets[Math.floor(Math.random()*targets.length)];
        label.textContent=`적 ${enemyTurnIndex+1} · ${enemy.name}`;
        await effects.wait(220);
        await effects.playAttack({
          attacker:document.getElementById(`enemy-${enemy.id}`),
          target:document.getElementById(`ally-${target.id}`),
          type:enemy.attackType,
          damage:enemy.damage,
          onImpact:()=>{
            target.hp-=enemy.damage;
            line.textContent=`${enemy.name}의 공격. ${target.name}에게 ${enemy.damage}의 피해.`;
            sync();
          }
        });
        enemyTurnIndex+=1;
        await effects.wait(220);
        runNextEnemyTurn();
      }

      async function allyAttack(index){
        if(actionLocked||phase!=='ally')return;
        const attacker=allies[index];
        if(!attacker||attacker.hp<=0||actedAllies.has(attacker.id))return;
        const target=firstLivingEnemy();
        if(!target){victory();return;}

        actionLocked=true;
        updateCardStates();
        line.textContent=attacker.id==='player'
          ?`${attacker.name}이 맨손으로 파고들었다. ${attacker.damage}의 피해.`
          :`${attacker.name}의 빛의 화살이 적을 꿰뚫었다.`;

        await effects.playAttack({
          attacker:document.getElementById(`ally-${attacker.id}`),
          target:document.getElementById(`enemy-${target.id}`),
          type:attacker.attackType,
          projectileType:attacker.projectileType,
          damage:attacker.damage,
          onImpact:()=>{target.hp-=attacker.damage;sync();}
        });
        actedAllies.add(attacker.id);
        if(!livingEnemies().length){victory();return;}

        await effects.wait(160);
        await tryHaruSpecial(attacker);
        if(!livingEnemies().length){victory();return;}

        await effects.wait(160);
        if(remainingAllies().length){
          actionLocked=false;
          showAllySelection();
        }else{
          await effects.wait(220);
          beginEnemyRound();
        }
      }

      allyCards.forEach((card,index)=>{
        const handler=()=>allyAttack(index);
        card.addEventListener('click',handler);
        card.addEventListener('keydown',event=>{
          if(event.key==='Enter'||event.key===' '){event.preventDefault();handler();}
        });
      });

      sync();
      showAllySelection();
    });
  };
})();