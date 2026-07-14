(()=>{
  const selected=[1,2,3].includes(window.SELECTED_CHAPTER)?window.SELECTED_CHAPTER:1;
  const map=document.createElement('nav');
  map.className='chapter-map';
  map.setAttribute('aria-label','챕터 선택');
  map.innerHTML=`
    <div class="chapter-map__line"></div>
    <a class="chapter-map__node ${selected===1?'is-active':''}" href="?chapter=1" aria-label="챕터 1 낯선 숲">
      <span>1</span><small>낯선 숲</small>
    </a>
    <a class="chapter-map__node ${selected===2?'is-active':''}" href="?chapter=2" aria-label="챕터 2 기록되지 않은 사람">
      <span>2</span><small>기록되지 않은 사람</small>
    </a>
    <a class="chapter-map__node ${selected===3?'is-active':''}" href="?chapter=3" aria-label="챕터 3 낯선 동침자">
      <span>3</span><small>낯선 동침자</small>
    </a>`;
  document.body.appendChild(map);
})();
