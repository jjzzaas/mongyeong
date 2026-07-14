(()=>{
  const app=document.getElementById('app');
  if(!app)return;

  function goToLobby(){
    try{
      const lobbyIndex=scenes.findIndex(scene=>scene.type==='mainLobby');
      if(lobbyIndex<0)throw new Error('mainLobby 장면을 찾지 못했습니다.');
      index=lobbyIndex;
      locked=false;
      renderScene(scenes[index]);
    }catch(error){
      console.error('개발자 로비 진입 실패:',error);
      alert('개발자 로비 진입 실패');
    }
  }

  function decorate(){
    document.querySelectorAll('.version,.battle-version').forEach(el=>{
      el.textContent='Ver. 0.9';
    });

    const chapterTitle=document.querySelector('.chapter-title');
    if(chapterTitle?.textContent?.trim()==='CHAPTER 1'&&!document.querySelector('.chapter-sub')){
      const sub=document.createElement('div');
      sub.className='chapter-sub';
      sub.textContent='낯선 숲';
      chapterTitle.insertAdjacentElement('afterend',sub);
    }

    if(!document.querySelector('.dev-lobby-button')){
      const button=document.createElement('button');
      button.type='button';
      button.className='dev-lobby-button';
      button.textContent='DEV · 메인 로비';
      button.addEventListener('click',event=>{
        event.preventDefault();
        event.stopPropagation();
        goToLobby();
      });
      document.body.appendChild(button);
    }
  }

  const observer=new MutationObserver(decorate);
  observer.observe(app,{childList:true,subtree:true});
  decorate();
})();