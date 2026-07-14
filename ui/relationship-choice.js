(()=>{
  window.renderRelationshipChoice=function(scene){
    const screenType=scene.screenType||'lodging-front';
    mount(`<main class="screen ${screenType}"><section class="box relationship-box"><div class="speaker">${scene.speaker||'하루'}</div><div class="text">${scene.text.replace(/\n/g,'<br>')}</div><div class="relationship-choices">${scene.choices.map((choice,i)=>`<button class="relationship-choice" data-index="${i}">${choice.text}</button>`).join('')}</div></section><div class="version">Ver. 1.9</div></main>`,()=>{
      document.querySelectorAll('.relationship-choice').forEach(button=>{
        button.onclick=()=>{
          const choice=scene.choices[Number(button.dataset.index)];
          const affinityKey=scene.affinityKey||'haruAffinity';
          const storageKey=`mongyeong.${affinityKey}`;
          state[affinityKey]=(state[affinityKey]||Number(localStorage.getItem(storageKey)||0))+choice.affinity;
          localStorage.setItem(storageKey,String(state[affinityKey]));
          scene.selectedResponse=choice.response;
          next();
        };
      });
    });
  };

  window.renderRelationshipResponse=function(scene){
    const previous=scenes[index-1];
    const response=previous?.selectedResponse||scene.fallback;
    const screenType=scene.screenType||'lodging-front';
    mount(`<main class="screen ${screenType}"><section class="box"><div class="speaker">${scene.speaker||'하루'}</div><div class="text">${response.replace(/\n/g,'<br>')}</div></section><div class="hint">터치하여 계속</div><div class="version">Ver. 1.9</div></main>`,()=>app.firstElementChild.onclick=next);
  };

  const originalRenderScene=renderScene;
  renderScene=function(scene){
    if(scene.type==='relationshipChoice'){renderRelationshipChoice(scene);return;}
    if(scene.type==='relationshipResponse'){renderRelationshipResponse(scene);return;}
    originalRenderScene(scene);
  };
})();
