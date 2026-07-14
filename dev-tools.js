(()=>{
  const app=document.getElementById('app');
  if(!app)return;

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
        event.stopPropagation();
        sessionStorage.setItem('mongyeong.devLobby','1');
        location.reload();
      });
      document.body.appendChild(button);
    }
  }

  const observer=new MutationObserver(decorate);
  observer.observe(app,{childList:true,subtree:true});
  decorate();

  if(window.__MONGYEONG_DEV_LOBBY__===true){
    sessionStorage.removeItem('mongyeong.devLobby');
    try{
      index=0;
      locked=false;
      renderScene(scenes[0]);
    }catch(error){
      console.error('개발자 로비 진입 실패:',error);
      app.innerHTML='<main class="screen black"><section class="box"><div class="text">개발자 로비 진입 중 오류가 발생했습니다.</div></section></main>';
    }
  }
})();