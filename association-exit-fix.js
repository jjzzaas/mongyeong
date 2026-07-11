(()=>{
  const $=s=>document.querySelector(s);
  let handled=false;

  document.addEventListener('click',e=>{
    const button=e.target.closest('.farewell-choice button[data-choice]');
    if(!button||handled)return;
    handled=true;

    setTimeout(()=>{
      const choicePanel=$('.farewell-choice');
      const association=$('.association-scene');
      const lobby=$('#main-lobby');
      const lodging=$('.lobby-menu button:nth-child(4)');
      const quest=$('.quest-toast b');

      if(choicePanel)choicePanel.classList.remove('show');
      if(association)association.classList.remove('show');

      if(lodging){
        lodging.classList.remove('locked');
        lodging.classList.add('unlocked','guided');
        const label=lodging.querySelector('span');
        if(label)label.textContent='이동 가능';
      }

      if(quest)quest.textContent='숙소로 이동해 휴식을 취하세요.';
      if(lobby)lobby.classList.add('show');
    },900);
  },true);
})();