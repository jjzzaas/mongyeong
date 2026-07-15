(()=>{
  const selected=[1,2,3,4].includes(window.SELECTED_CHAPTER)?window.SELECTED_CHAPTER:1;
  const adSlot=document.createElement('div');
  adSlot.className='bottom-ad-slot';
  adSlot.setAttribute('aria-hidden','true');
  adSlot.textContent='ADVERTISEMENT';

  const map=document.createElement('nav');
  map.className='chapter-map';
  map.setAttribute('aria-label','챕터 선택');
  map.innerHTML=`
    <div class="chapter-map__line"></div>
    <a class="chapter-map__node ${selected===1?'is-active':''}" href="?chapter=1" aria-label="챕터 1 낯선 숲"><span>1</span><small>낯선 숲</small></a>
    <a class="chapter-map__node ${selected===2?'is-active':''}" href="?chapter=2" aria-label="챕터 2 기록되지 않은 사람"><span>2</span><small>기록되지 않은 사람</small></a>
    <a class="chapter-map__node ${selected===3?'is-active':''}" href="?chapter=3" aria-label="챕터 3 낯선 동침자"><span>3</span><small>낯선 동침자</small></a>
    <a class="chapter-map__node ${selected===4?'is-active':''}" href="?chapter=4" aria-label="챕터 4 첫 번째 성장"><span>4</span><small>첫 번째 성장</small></a>`;

  document.body.appendChild(adSlot);
  document.body.appendChild(map);

  function syncVisibility(){
    const hide=Boolean(document.querySelector('.battle-screen,.battle-intro,.title,.main-lobby'));
    map.classList.toggle('is-hidden',hide);
    if(hide)adSlot.classList.remove('is-active');
  }

  const app=document.getElementById('app');
  if(app)new MutationObserver(syncVisibility).observe(app,{childList:true,subtree:true});
  syncVisibility();

  window.setBottomAdVisible=enabled=>{
    const blocked=Boolean(document.querySelector('.battle-screen,.battle-intro,.title,.main-lobby'));
    const active=Boolean(enabled)&&!blocked;
    adSlot.classList.toggle('is-active',active);
    adSlot.setAttribute('aria-hidden',active?'false':'true');
  };
})();
