(()=>{
  const VERSION='2.3';
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
      {id:'player',name:state.playerName,hp:42,maxHp:42,damage:12,dodge:.10,defense:.20,specialChance:0,specialUsed:false},
      {id:'haru',name:'하루',hp:48,maxHp:48,damage:16,dodge:.15,defense:.18,specialChance:.35,specialUsed:false}
    ];
    const enemy={name:'정체불명의 생명체',hp:90,maxHp:90,damage:8};
    const acted=new Set();
    let enemyActing=false;

    mount(`<main class="screen battle-screen">
      <div class="battle-controls"><button class="control-btn locked">🔒 ×1</button><button class="control-btn locked">🔒 AUTO</button></div>
      <div class="battle-layout">
        <section class="battle-top">
          <div class="unit-head"><span>${enemy.name}</span><span id="enemyText">${enemy.hp} / ${enemy.maxHp}</span></div>
          <div class="hp enemy-hp"><span id="enemyHp"></span></div>
        </section>
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
      const cards=Array.from(document.querySelectorAll('.battle-character-card[data-ally]'));

      function sync(){
        document.getElementById('enemyHp').style.width=`${Math.max(0,enemy.hp)/enemy.maxHp*100}%`;
        document.getElementById('enemyText').textContent=`${Math.max(0,enemy.hp)} / ${enemy.maxHp}`;
        allies.forEach(ally=>{
          document.getElementById(`${ally.id}Hp`).style.width=`${Math.max(0,ally.hp)/ally.maxHp*100}%`;
          document.getElementById(`${ally.id}Text`).textContent=`${Math.max(0,ally.hp)} / ${ally.maxHp}`;
        });
      }

      function victory(){
        cards.forEach(card=>card.disabled=true);
        label.textContent='VICTORY';
        line.textContent='화면을 터치하여 계속';
        app.firstElementChild.addEventListener('click',next,{once:true});
      }

      function resetAllyTurn(){
        acted.clear();
        enemyActing=false;
        cards.forEach(card=>{
          card.disabled=false;
          card.classList.remove('is-acted');
          card.querySelector('.battle-card-order').textContent='';
        });
        label.textContent='아군 턴 · 원하는 순서로 선택';
        line.textContent='행동할 캐릭터 카드를 터치하세요.';
      }

      function enemyTurn(){
        enemyActing=true;
        cards.forEach(card=>card.disabled=true);
        label.textContent='적 턴';
        setTimeout(()=>{
          const living=allies.filter(ally=>ally.hp>0);
          const target=living[Math.floor(Math.random()*living.length)];
          const roll=Math.random();
          if(roll<target.dodge){
            line.textContent=`${target.name}이 공격을 회피했습니다!`;
          }else{
            const defended=Math.random()<target.defense;
            const damage=defended?Math.ceil(enemy.damage/2):enemy.damage;
            target.hp-=damage;
            line.textContent=defended?`${target.name}이 공격을 방어했습니다. ${damage}의 피해.`:`${target.name}이 ${damage}의 피해를 받았습니다.`;
          }
          sync();
          setTimeout(resetAllyTurn,800);
        },650);
      }

      function trySpecial(ally){
        if(ally.specialUsed||ally.specialChance<=0||Math.random()>=ally.specialChance)return false;
        ally.specialUsed=true;
        if(ally.id==='haru'){
          enemy.hp-=24;
          label.textContent='SPECIAL SKILL';
          line.innerHTML='<strong>하루 — 천체낙하</strong><br>푸른 천체의 빛이 적 전체를 덮쳤다. 24의 광역 피해!';
          sync();
          return true;
        }
        return false;
      }

      cards.forEach(card=>{
        card.onclick=()=>{
          if(enemyActing||card.disabled)return;
          const ally=allies.find(item=>item.id===card.dataset.ally);
          if(!ally||acted.has(ally.id))return;
          acted.add(ally.id);
          enemy.hp-=ally.damage;
          card.classList.add('is-acted');
          card.disabled=true;
          card.querySelector('.battle-card-order').textContent=`${acted.size}번째 행동`;
          line.textContent=`${ally.name}의 공격. ${ally.damage}의 피해.`;
          sync();
          if(enemy.hp<=0){victory();return;}

          setTimeout(()=>{
            const special=trySpecial(ally);
            if(enemy.hp<=0){setTimeout(victory,special?850:0);return;}
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