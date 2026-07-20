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

    let allyTurnIndex=0;
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

    mount(`<main class="screen battle-screen chapter1-effect-battle">
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
      const enemyCards=enemies.map(unit=>document.getElementById(`enemy-${unit.id}`));

      const livingAllies=()=>allies.filter(unit=>unit.hp>0);
      const livingEnemies=()=>enemies.filter(unit=>unit.hp>0);
      const firstLivingEnemy=()=>enemies.find(unit=>unit.hp>0);

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
          if(unit.hp<=0||actionLocked){
            card.classList.add('disabled-turn');
          }else if(actedAllies.has(unit.id)){
            card.classList.add('turn-complete');
          }else if(index===allyTurnIndex){
            card.classList.add('active-turn');
          }else{
            card.classList.add('disabled-turn');
          }
        });
      }

      function showAllyTurn(){
        const unit=allies[allyTurnIndex];
        label.textContent=`아군 ${allyTurnIndex+1} · ${unit.name}`;
        line.textContent=`${unit.name}의 차례입니다. 카드를 터치하세요.`;
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

      async function tryHaruSpecial(attacker,target){
        if(attacker.special!=='celestial'||haruSpecialUsed||Math.random()>=0.35)return;
        haruSpecialUsed=true;
        label.textContent='SPECIAL SKILL';
        line.innerHTML='<strong>하루 — 천체낙하</strong><br>푸른 천체의 빛이 적 전체를 덮쳤다.';
        const targets=livingEnemies();
        for(const enemy of targets){
          const targetElement=document.getElementById(`enemy-${enemy.id}`);
          await effects.playAttack({
            attacker:document.getElementById(`ally-${attacker.id}`),
            target:targetElement,
            type:'energy',projectileType:'energy',damage:24,heavy:true,
            onImpact:()=>{enemy.hp-=24;sync();}
          });
        }
      }

      async function beginEnemyRound(){
        enemyTurnIndex=0;
        await runNextEnemyTurn();
      }

      async function runNextEnemyTurn(){
        const activeEnemies=livingEnemies();
        if(!activeEnemies.length){victory();return;}
        if(enemyTurnIndex>=activeEnemies.length){
          actedAllies.clear();
          allyTurnIndex=allies.findIndex(unit=>unit.hp>0);
          actionLocked=false;
          showAllyTurn();
          return;
        }

        actionLocked=true;
        updateCardStates();
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
        if(actionLocked||index!==allyTurnIndex)return;
        const attacker=allies[index];
        if(!attacker||attacker.hp<=0||actedAllies.has(attacker.id))return;
        const target=firstLivingEnemy();
        if(!target){victory();return;}

        actionLocked=true;
        updateCardStates();
        const attackerElement=document.getElementById(`ally-${attacker.id}`);
        const targetElement=document.getElementById(`enemy-${target.id}`);
        line.textContent=attacker.id==='player'
          ?`${attacker.name}이 맨손으로 파고들었다. ${attacker.damage}의 피해.`
          :`${attacker.name}의 빛의 화살이 적을 꿰뚫었다.`;

        await effects.playAttack({
          attacker:attackerElement,
          target:targetElement,
          type:attacker.attackType,
          projectileType:attacker.projectileType,
          damage:attacker.damage,
          onImpact:()=>{target.hp-=attacker.damage;sync();}
        });
        actedAllies.add(attacker.id);
        if(!livingEnemies().length){victory();return;}

        await effects.wait(160);
        await tryHaruSpecial(attacker,target);
        if(!livingEnemies().length){victory();return;}

        let nextIndex=index+1;
        while(nextIndex<allies.length&&(allies[nextIndex].hp<=0||actedAllies.has(allies[nextIndex].id)))nextIndex+=1;
        if(nextIndex<allies.length){
          allyTurnIndex=nextIndex;
          actionLocked=false;
          showAllyTurn();
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
      showAllyTurn();
    });
  };
})();