(()=>{
  const selectedChapter=window.__MONGYEONG_SELECTED_CHAPTER__===2?2:1;

  const map=document.createElement('nav');
  map.className='chapter-map';
  map.setAttribute('aria-label','챕터 선택');
  map.innerHTML=`
    <div class="chapter-map-line"></div>
    <button type="button" class="chapter-node ${selectedChapter===1?'active':''}" data-chapter="1" aria-label="챕터 1 낯선 숲"><span>1</span><small>낯선 숲</small></button>
    <button type="button" class="chapter-node ${selectedChapter===2?'active':''}" data-chapter="2" aria-label="챕터 2 기록되지 않은 사람"><span>2</span><small>기록되지 않은 사람</small></button>`;

  map.querySelectorAll('.chapter-node').forEach(button=>{
    button.addEventListener('click',event=>{
      event.preventDefault();
      event.stopPropagation();
      const chapter=button.dataset.chapter;
      const url=new URL(location.href);
      url.searchParams.set('chapter',chapter);
      url.searchParams.set('_',String(Date.now()));
      location.assign(url.toString());
    });
  });

  document.body.appendChild(map);

  document.querySelectorAll('.version,.battle-version').forEach(el=>{
    el.textContent='Ver. 1.0';
  });

  const title=document.querySelector('.chapter-title');
  if(title?.textContent?.trim()==='CHAPTER 1'&&!title.parentElement?.querySelector('.chapter-sub')){
    const sub=document.createElement('div');
    sub.className='chapter-sub';
    sub.textContent='낯선 숲';
    title.insertAdjacentElement('afterend',sub);
  }
})();