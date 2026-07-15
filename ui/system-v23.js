(()=>{
  const VERSION='2.4';
  const levelTargets={1:3,2:4,3:5};

  if(!localStorage.getItem('mongyeong.levelBaselineV23')){
    if(state.level<2&&!localStorage.getItem('mongyeong.chapterClear.1')){
      state.level=2;
      state.exp=0;
      save();
    }
    localStorage.setItem('mongyeong.levelBaselineV23','1');
  }

  renderLevelUp=function(){
    const chapter=Number(window.SELECTED_CHAPTER||state.chapter||1);
    const target=levelTargets[chapter]||state.level+1;
    const clearKey=`mongyeong.chapterClear.${chapter}`;
    const alreadyCleared=localStorage.getItem(clearKey)==='1';

    if(alreadyCleared||state.level>=target){
      localStorage.setItem(clearKey,'1');
      mount(`<main class="screen status ${levelTheme(state.level)}">
        <section class="box">
          <div class="chapter-title">CLEAR</div>
          <div class="text" style="margin-top:18px">이미 완료한 챕터입니다.<br>레벨은 추가로 상승하지 않습니다.</div>
        </section>
        <div class="hint">터치하여 계속</div>
        <div class="version">Ver. ${VERSION}</div>
      </main>`,()=>app.firstElementChild.onclick=next);
      return;
    }

    const from=state.level;
    state.exp=100;
    save();
    mount(`<main class="screen status ${levelTheme(target)}">
      <section class="box">
        <div class="chapter-title">EXP MAX</div>
        <div class="exp-track"><span style="width:100%"></span></div>
        <div class="text" style="margin-top:18px">남은 경험치가 채워졌습니다.</div>
      </section>
      <div class="hint">터치하여 계속</div>
      <div class="version">Ver. ${VERSION}</div>
    </main>`,()=>{
      app.firstElementChild.onclick=()=>{
        state.level=target;
        state.exp=0;
        localStorage.setItem(clearKey,'1');
        save();
        mount(`<main class="screen status ${levelTheme(target)}">
          <section class="box">
            <div class="chapter-title">LEVEL UP</div>
            <div class="text" style="margin-top:18px">Lv. ${from} → Lv. ${target}</div>
          </section>
          <div class="hint">터치하여 계속</div>
          <div class="version">Ver. ${VERSION}</div>
        </main>`,()=>app.firstElementChild.onclick=next);
      };
    });
  };

  renderBattle=function(){
    const allies=[
      {id:'player',name:state.playerName,hp:42,maxHp:42,damage:8,dodge:.10,defense:.20,specialChance:0,specialUsed:false},
      {id:'haru',name:'하루',hp:48,maxHp:48,damage:16,dodge:.15,defense:.18,specialChance:.35,specialUsed:false}
    ];

    const enemies=[
      {id:'enemy1',name:'정체불명의 생명체',hp:90,maxHp:90,damage:8,isBoss:false}
    ];
    const maxEnemySlots=5;
    let selectedEnemyId=enemies[0].id;
    const acted=new Set();
    let enemyActing=false;

    const enemySlots=Array.from({length:maxEnemySlots},(_,index)=>{
      const enemy=enemies[index];
      if(!enemy)return `<div class="battle-enemy-card is-empty"><span>적 ${index+1}</span></div>`;
      return `<button class="battle-enemy-card ${enemy.isBoss?'is-boss':''}" data-enemy="${enemy.id}">
        ${enemy.isBoss?'<b class="boss-mark">BOSS</b>':''}
        <strong>${enemy.name}</strong>
        <div class="hp enemy-hp"><span id="${enemy.id}Hp"></span></div>
        <em id="${enemy.id}Text">${enemy.hp} / ${enemy.maxHp}</em>
      </button>`;
    }).join('');

    mount(`<main class="screen battle-screen">
      <div class="battle-controls"><button class="control-btn locked">🔒 ×1</button><button class="control-btn locked">🔒 AUTO</button></div>
      <div class="battle-layout battle-layout-v24">
        <section class="enemy-formation" id="enemyFormation">${enemySlots}</section>
        <section class="battle-middle">
          <div class="turn-label" id="turnLabel">아군 턴 · 원하는 순서로 선택</div>
          <div class="battle-line" id="battleLine">행동할 캐릭터 카드를 터치하세요.</div>
        </section>
        <section class="battle-cards" id="battleCards">
          ${allies.map(ally=>`<button class="battle-character-card" data-ally="${ally.id}">
            <span class="battle-card-order"></span>
            <strong>${ally.name}</strong>
            <small>기본 공격 ${ally.damage}</small>
            <div class="hp"><span id="${ally.id}Hp"></span></div>
            <em id="${ally.id}Text">${ally.hp} / ${ally.maxHp}</em>
          </button>`).join('')}
          ${[3,4].map(slot=>`<div class="battle-character-card is-locked"><strong>슬롯 ${slot}</strong><small>파티원 미합류</small></div>`).join('')}
        </section>
      </div>
      <div class="battle-version">Ver. ${VERSION}</div>
    </main>`,()=>{
      const line=document.getElementById('battleLine');
      const label=document.getElementById('turnLabel');
      const allyCards=Array.from(document.querySelectorAll('.battle-character-card[data-ally]'));
      const enemyCards=Array.from(document.querySelectorAll('.battle-enemy-card[data-enemy]'));

      const livingEnemies=()=>enemies.filter(enemy=>enemy.hp>0);
      const selectedEnemy=()=>enemies.find(enemy=>enemy.id===selectedEnemyId&&enemy.hp>0)||livingEnemies()[0];

      function sync(){
        enemies.forEach(enemy=>{
          const hp=document.getElementById(`${enemy.id}Hp`);
          const text=document.getElementById(`${enemy.id}Text`);
          if(hp)hp.style.width=`${Math.max(0,enemy.hp)/enemy.maxHp*100}%`;
          if(text)text.textContent=`${Math.max(0,enemy.hp)} / ${enemy.maxHp}`;
          const card=document.querySelector(`[data-enemy="${enemy.id}"]`);
          if(card){
            card.classList.toggle('is-defeated',enemy.hp<=0);
            card.classList.toggle('is-targeted',enemy.id===selectedEnemyId&&enemy.hp>0);
            card.disabled=enemy.hp<=0||enemyActing;
          }
        });
        allies.forEach(ally=>{
          document.getElementById(`${ally.id}Hp`).style.width=`${Math.max(0,ally.hp)/ally.maxHp*100}%`;
          document.getElementById(`${ally.id}Text`).textContent=`${Math.max(0,ally.hp)} / ${ally.maxHp}`;
        });
      }

      function victory(){
        allyCards.forEach(card=>card.disabled=true);
        enemyCards.forEach(card=>card.disabled=true);
        label.textContent='VICTORY';
        line.textContent='화면을 터치하여 계속';
        app.firstElementChild.addEventListener('click',next,{once:true});
      }

      function resetAllyTurn(){
        acted.clear();
        enemyActing=false;
        allyCards.forEach(card=>{
          card.disabled=false;
          card.classList.remove('is-acted');
          card.querySelector('.battle-card-order').textContent='';
        });
        enemyCards.forEach(card=>card.disabled=card.classList.contains('is-defeated'));
        label.textContent='아군 턴 · 원하는 순서로 선택';
        line.textContent='행동할 캐릭터 카드를 터치하세요.';
        sync();
      }

      function enemyTurn(){
        enemyActing=true;
        allyCards.forEach(card=>card.disabled=true);
        enemyCards.forEach(card=>card.disabled=true);
        label.textContent='적 턴';
        const attackers=livingEnemies();
        let enemyIndex=0;

        const act=()=>{
          if(enemyIndex>=attackers.length){
            setTimeout(resetAllyTurn,700);
            return;
          }
          const attacker=attackers[enemyIndex++];
          const livingAllies=allies.filter(ally=>ally.hp>0);
          const target=livingAllies[Math.floor(Math.random()*livingAllies.length)];
          label.textContent=`적 ${enemyIndex} · ${attacker.name}`;
          setTimeout(()=>{
            const roll=Math.random();
            if(roll<target.dodge){
              line.textContent=`${target.name}이 ${attacker.name}의 공격을 회피했습니다!`;
            }else{
              const defended=Math.random()<target.defense;
              const damage=defended?Math.ceil(attacker.damage/2):attacker.damage;
              target.hp-=damage;
              line.textContent=defended?`${target.name}이 공격을 방어했습니다. ${damage}의 피해.`:`${target.name}이 ${damage}의 피해를 받았습니다.`;
            }
            sync();
            setTimeout(act,650);
          },500);
        };
        act();
      }

      function trySpecial(ally){
        if(ally.specialUsed||ally.specialChance<=0||Math.random()>=ally.specialChance)return false;
        ally.specialUsed=true;
        if(ally.id==='haru'){
          livingEnemies().forEach(enemy=>enemy.hp-=24);
          label.textContent='SPECIAL SKILL';
          line.innerHTML='<strong>하루 — 천체낙하</strong><br>푸른 천체의 빛이 살아 있는 모든 적을 덮쳤다. 24의 광역 피해!';
          const nextTarget=livingEnemies()[0];
          if(nextTarget)selectedEnemyId=nextTarget.id;
          sync();
          return true;
        }
        return false;
      }

      enemyCards.forEach(card=>{
        card.onclick=()=>{
          if(enemyActing||card.disabled)return;
          selectedEnemyId=card.dataset.enemy;
          line.textContent=`${enemies.find(enemy=>enemy.id===selectedEnemyId).name}을 대상으로 지정했습니다.`;
          sync();
        };
      });

      allyCards.forEach(card=>{
        card.onclick=()=>{
          if(enemyActing||card.disabled)return;
          const ally=allies.find(item=>item.id===card.dataset.ally);
          const target=selectedEnemy();
          if(!ally||!target||acted.has(ally.id))return;
          acted.add(ally.id);
          target.hp-=ally.damage;
          card.classList.add('is-acted');
          card.disabled=true;
          card.querySelector('.battle-card-order').textContent=`${acted.size}번째 행동`;
          line.textContent=`${ally.name}이 ${target.name}을 공격했습니다. ${ally.damage}의 피해.`;
          if(target.hp<=0){
            const nextTarget=livingEnemies()[0];
            if(nextTarget)selectedEnemyId=nextTarget.id;
          }
          sync();
          if(livingEnemies().length===0){victory();return;}

          setTimeout(()=>{
            const special=trySpecial(ally);
            if(livingEnemies().length===0){setTimeout(victory,special?850:0);return;}
            if(acted.size===allies.length){
              setTimeout(enemyTurn,special?1000:450);
            }else if(!special){
              label.textContent='아군 턴 · 남은 캐릭터 선택';
              line.textContent='다음 행동할 캐릭터 카드를 터치하세요.';
            }
          },450);
        };
      });

      sync();
      resetAllyTurn();
    });
  };
})();