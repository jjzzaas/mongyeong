(()=>{
  const selected=window.SELECTED_CHAPTER===2?2:1;
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
    </a>`;
  document.body.appendChild(map);
})();