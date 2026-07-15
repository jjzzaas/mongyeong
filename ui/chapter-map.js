(()=>{
  const MAX_CHAPTER=100;
  const UNLOCKED_CHAPTER=4;
  const selected=[1,2,3,4].includes(window.SELECTED_CHAPTER)?window.SELECTED_CHAPTER:1;
  const chapterTitles={1:'낯선 숲',2:'기록되지 않은 사람',3:'낯선 동침자',4:'첫 번째 성장'};

  const adSlot=document.createElement('div');
  adSlot.className='bottom-ad-slot';
  adSlot.setAttribute('aria-hidden','true');
  adSlot.textContent='ADVERTISEMENT';

  const map=document.createElement('nav');
  map.className='chapter-map';
  map.setAttribute('aria-label','스토리맵');

  const track=document.createElement('div');
  track.className='chapter-map__track';
  track.innerHTML=Array.from({length:MAX_CHAPTER},(_,index)=>{
    const chapter=index+1;
    const unlocked=chapter<=UNLOCKED_CHAPTER;
    const active=chapter===selected;
    const title=chapterTitles[chapter]||'잠김';
    if(unlocked)return `<a class="chapter-map__node ${active?'is-active':''}" href="?chapter=${chapter}" aria-label="챕터 ${chapter} ${title}"><span>${chapter}</span><small>${title}</small></a>`;
    return `<button class="chapter-map__node is-locked" type="button" disabled aria-label="챕터 ${chapter} 잠김"><span>${chapter}</span><small>잠김</small></button>`;
  }).join('');

  map.appendChild(track);
  document.body.appendChild(adSlot);
  document.body.appendChild(map);

  requestAnimationFrame(()=>{
    const activeNode=track.querySelector('.is-active');
    if(activeNode)activeNode.scrollIntoView({behavior:'instant',inline:'center',block:'nearest'});
  });

  const blockedSelector='.battle-screen,.battle-intro,.title,.main-lobby,.hunter-district-screen,.training-map-screen';
  function syncVisibility(){
    const hide=Boolean(document.querySelector(blockedSelector));
    map.classList.toggle('is-hidden',hide);
    if(hide)adSlot.classList.remove('is-active');
  }

  const app=document.getElementById('app');
  if(app)new MutationObserver(syncVisibility).observe(app,{childList:true,subtree:true});
  syncVisibility();

  window.setBottomAdVisible=enabled=>{
    const blocked=Boolean(document.querySelector(blockedSelector));
    const active=Boolean(enabled)&&!blocked;
    adSlot.classList.toggle('is-active',active);
    adSlot.setAttribute('aria-hidden',active?'false':'true');
  };
})();
