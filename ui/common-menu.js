(()=>{
  const root=document.getElementById('app');
  if(!root)return;

  const saveApi=window.MONGYEONG_SAVE;
  const blockedSelectors='.title,.main-lobby,.battle-screen,.battle-intro,.reward-screen,.status,.cinematic-chapter,.relationship-choice,.relationship-unlock,.chapter-complete-screen';
  const MAX_CHAPTER=100;
  const CHAPTER_GROUP_SIZE=25;

  function currentScene(){
    try{return Array.isArray(scenes)&&typeof index==='number'?scenes[index]:null;}catch{return null;}
  }

  function currentChapter(){
    const saved=saveApi?.readSave?.();
    const scene=currentScene();
    return Math.max(1,Math.min(MAX_CHAPTER,Number(state?.chapter||scene?.chapter||saved?.progress?.chapter||1)));
  }

  function completedChapter(){
    return Math.max(0,currentChapter()-1);
  }

  function saveCheckpoint(){
    if(!saveApi?.writeSave)return;
    const scene=currentScene();
    if(!scene||typeof index!=='number'||index<0)return;
    const previous=saveApi.readSave?.()||saveApi.createDefaultSave?.()||{};
    saveApi.writeSave({
      ...previous,
      progress:{
        ...(previous.progress||{}),
        chapter:currentChapter(),
        sceneId:scene.id||scene.type||null,
        sceneIndex:index
      }
    });
  }

  function chapterTitle(chapter){
    const titles={1:'몽환 숲',2:'헌터 등록',3:'첫 임무',4:'훈련',5:'정식 의뢰',6:'첫 정식 의뢰'};
    return titles[chapter]||`Chapter ${chapter}`;
  }

  function chapterState(chapter,current){
    if(chapter<current)return 'complete';
    if(chapter===current)return 'current';
    return 'locked';
  }

  function renderStory(panel){
    const current=currentChapter();
    const groups=Array.from({length:MAX_CHAPTER/CHAPTER_GROUP_SIZE},(_,groupIndex)=>{
      const start=groupIndex*CHAPTER_GROUP_SIZE+1;
      const end=start+CHAPTER_GROUP_SIZE-1;
      const containsCurrent=current>=start&&current<=end;
      const rows=Array.from({length:CHAPTER_GROUP_SIZE},(_,i)=>start+i).map(chapter=>{
        const status=chapterState(chapter,current);
        const label=status==='complete'?'완료':status==='current'?'진행 중':'잠김';
        const icon=status==='complete'?'✓':status==='current'?'▶':'🔒';
        return `<button class="common-menu__chapter is-${status}" type="button" ${status==='current'?'data-resume="true"':'disabled'}>
          <span class="common-menu__chapter-number">CHAPTER ${chapter}</span>
          <strong>${chapterTitle(chapter)}</strong>
          <i><b>${icon}</b>${label}</i>
        </button>${chapter<end?'<div class="common-menu__line"></div>':''}`;
      }).join('');
      return `<section class="common-menu__story-group ${containsCurrent?'is-open':''}">
        <button class="common-menu__group-toggle" type="button" aria-expanded="${containsCurrent}">
          <span>CHAPTER ${start} — ${end}</span><i>${containsCurrent?'−':'＋'}</i>
        </button>
        <div class="common-menu__group-body">${rows}</div>
      </section>`;
    }).join('');

    panel.innerHTML=`<div class="common-menu__page-head"><button class="common-menu__back" type="button">‹</button><h2>메인 스토리</h2></div><div class="common-menu__story-map">${groups}</div>`;
    panel.querySelector('.common-menu__back').onclick=()=>renderHome(panel);
    panel.querySelector('[data-resume="true"]')?.addEventListener('click',closeMenu);
    panel.querySelectorAll('.common-menu__group-toggle').forEach(toggle=>{
      toggle.onclick=()=>{
        const group=toggle.closest('.common-menu__story-group');
        const open=group.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded',String(open));
        toggle.querySelector('i').textContent=open?'−':'＋';
      };
    });
  }

  function memoirData(chapter){
    const library=window.MONGYEONG_MEMOIRS||{};
    return library[chapter]||null;
  }

  function renderMemoirBook(panel,chapter){
    const memoir=memoirData(chapter);
    const title=memoir?.title||chapterTitle(chapter);
    const body=memoir?.body||'';
    panel.innerHTML=`<div class="common-menu__page-head"><button class="common-menu__back" type="button">‹</button><h2>회상록</h2></div>
      <article class="common-menu__memoir-reader">
        <small>CHAPTER ${chapter}</small>
        <h3>${title}</h3>
        ${body?`<div class="common-menu__memoir-body">${String(body).replace(/</g,'&lt;').replace(/\n/g,'<br>')}</div>`:'<div class="common-menu__memoir-pending"><strong>회상록 검수 전</strong><p>이 챕터의 플레이 점검이 끝난 뒤, 확정된 사건과 선택 결과만으로 함께 작성합니다.</p></div>'}
      </article>`;
    panel.querySelector('.common-menu__back').onclick=()=>renderMemoirs(panel);
  }

  function renderMemoirs(panel){
    const completed=completedChapter();
    const books=completed>0?Array.from({length:completed},(_,i)=>i+1).reverse().map(chapter=>{
      const memoir=memoirData(chapter);
      return `<button class="common-menu__memoir-book ${memoir?'is-written':'is-pending'}" type="button" data-chapter="${chapter}">
        <span class="common-menu__memoir-spine">${String(chapter).padStart(2,'0')}</span>
        <div><small>CHAPTER ${chapter}</small><strong>${memoir?.title||chapterTitle(chapter)}</strong><p>${memoir?'기록 완료':'플레이 검수 후 작성'}</p></div>
        <i>›</i>
      </button>`;
    }).join(''):'<p class="common-menu__empty">챕터를 클리어하면 회상록이 열립니다.</p>';

    panel.innerHTML=`<div class="common-menu__page-head"><button class="common-menu__back" type="button">‹</button><h2>회상록</h2></div><div class="common-menu__scroll"><div class="common-menu__memoir-guide">완료한 챕터를 한 권의 이야기로 다시 읽습니다.</div>${books}</div>`;
    panel.querySelector('.common-menu__back').onclick=()=>renderHome(panel);
    panel.querySelectorAll('[data-chapter]').forEach(book=>book.onclick=()=>renderMemoirBook(panel,Number(book.dataset.chapter)));
  }

  function relationStage(value){
    if(value>=8)return '신뢰';
    if(value>=4)return '조금 가까워짐';
    if(value>=1)return '관심';
    if(value<=-3)return '경계';
    return '낯섦';
  }

  function relationCard(name,key){
    const value=Number(localStorage.getItem(`mongyeong.${key}`)||state?.[key]||0);
    return `<div class="common-menu__relation"><div><span>${name}</span><strong>${relationStage(value)}</strong></div><div class="common-menu__relation-bar"><i style="width:${Math.max(12,Math.min(100,36+value*6))}%"></i></div></div>`;
  }

  function renderRelationship(panel){
    panel.innerHTML=`<div class="common-menu__page-head"><button class="common-menu__back" type="button">‹</button><h2>호감도</h2></div><div class="common-menu__relations">${relationCard('하루','haruAffinity')}${relationCard('모모','momoAffinity')}<p>관계 수치는 공개되지 않습니다.</p></div>`;
    panel.querySelector('.common-menu__back').onclick=()=>renderHome(panel);
  }

  function renderSettings(panel){
    const textSpeed=localStorage.getItem('mongyeong.textSpeed')||'normal';
    const sound=localStorage.getItem('mongyeong.sound')!=='off';
    const vibration=localStorage.getItem('mongyeong.vibration')!=='off';
    panel.innerHTML=`<div class="common-menu__page-head"><button class="common-menu__back" type="button">‹</button><h2>설정</h2></div><div class="common-menu__settings">
      <label><span>텍스트 속도</span><select id="menuTextSpeed"><option value="slow">느림</option><option value="normal">보통</option><option value="fast">빠름</option></select></label>
      <label><span>효과음</span><input id="menuSound" type="checkbox" ${sound?'checked':''}></label>
      <label><span>진동</span><input id="menuVibration" type="checkbox" ${vibration?'checked':''}></label>
    </div>`;
    panel.querySelector('.common-menu__back').onclick=()=>renderHome(panel);
    const speed=panel.querySelector('#menuTextSpeed');
    speed.value=textSpeed;
    speed.onchange=()=>localStorage.setItem('mongyeong.textSpeed',speed.value);
    panel.querySelector('#menuSound').onchange=e=>localStorage.setItem('mongyeong.sound',e.target.checked?'on':'off');
    panel.querySelector('#menuVibration').onchange=e=>localStorage.setItem('mongyeong.vibration',e.target.checked?'on':'off');
  }

  function renderHome(panel){
    panel.innerHTML=`<div class="common-menu__brand"><small>夢境</small><h2>메뉴</h2></div><nav class="common-menu__nav">
      <button type="button" data-page="story"><span>01</span><strong>메인 스토리</strong><i>›</i></button>
      <button type="button" data-page="memoirs"><span>02</span><strong>회상록</strong><i>›</i></button>
      <button type="button" data-page="relationship"><span>03</span><strong>호감도</strong><i>›</i></button>
      <button type="button" data-page="settings"><span>04</span><strong>설정</strong><i>›</i></button>
    </nav><button class="common-menu__resume" type="button">게임으로 복귀</button>`;
    panel.querySelector('[data-page="story"]').onclick=()=>renderStory(panel);
    panel.querySelector('[data-page="memoirs"]').onclick=()=>renderMemoirs(panel);
    panel.querySelector('[data-page="relationship"]').onclick=()=>renderRelationship(panel);
    panel.querySelector('[data-page="settings"]').onclick=()=>renderSettings(panel);
    panel.querySelector('.common-menu__resume').onclick=closeMenu;
  }

  function closeMenu(){document.querySelector('.common-menu-overlay')?.remove();}

  function openMenu(event){
    event?.preventDefault();event?.stopPropagation();
    if(document.querySelector('.common-menu-overlay'))return;
    saveCheckpoint();
    document.querySelector('.story-lobby-overlay')?.remove();
    const overlay=document.createElement('section');
    overlay.className='common-menu-overlay';
    overlay.innerHTML='<div class="common-menu__panel"></div>';
    document.body.appendChild(overlay);
    renderHome(overlay.querySelector('.common-menu__panel'));
  }

  function canShow(){
    const screen=root.firstElementChild;
    if(!screen||screen.matches(blockedSelectors))return false;
    return Boolean(currentScene());
  }

  function syncButton(){
    document.querySelectorAll('.story-lobby-button').forEach(el=>el.remove());
    document.querySelector('.story-lobby-overlay')?.remove();
    const screen=root.firstElementChild;
    if(!screen)return;
    const existing=screen.querySelector(':scope > .common-menu-button');
    if(!canShow()){existing?.remove();closeMenu();return;}
    if(existing)return;
    const button=document.createElement('button');
    button.type='button';button.className='common-menu-button';button.setAttribute('aria-label','공용 메뉴 열기');
    button.innerHTML='<span></span><span></span><span></span>';
    button.onclick=openMenu;
    screen.appendChild(button);
  }

  const observer=new MutationObserver(()=>queueMicrotask(syncButton));
  observer.observe(root,{childList:true,subtree:false});
  syncButton();
})();