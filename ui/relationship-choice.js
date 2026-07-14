(()=>{
  window.renderRelationshipChoice=function(scene){
    mount(`<main class="screen lodging-front"><section class="box relationship-box"><div class="speaker">${scene.speaker||'하루'}</div><div class="text">${scene.text.replace(/\n/g,'<br>')}</div><div class="relationship-choices">${scene.choices.map((choice,i)=>`<button class="relationship-choice" data-index="${i}">${choice.text}</button>`).join('')}</div></section><div class="version">Ver. 1.2</div></main>`,()=>{
      document.querySelectorAll('.relationship-choice').forEach(button=>{
        button.onclick=()=>{
          const choice=scene.choices[Number(button.dataset.index)];
          state.haruAffinity=(state.haruAffinity||0)+choice.affinity;
          localStorage.setItem('mongyeong.haruAffinity',String(state.haruAffinity));
          scene.selectedResponse=choice.response;
          next();
        };
      });
    });
  };

  window.renderRelationshipResponse=function(scene){
    const previous=scenes[index-1];
    const response=previous?.selectedResponse||scene.fallback;
    mount(`<main class="screen lodging-front"><section class="box"><div class="speaker">하루</div><div class="text">${response.replace(/\n/g,'<br>')}</div></section><div class="hint">터치하여 계속</div><div class="version">Ver. 1.2</div></main>`,()=>app.firstElementChild.onclick=next);
  };

  const originalRenderScene=renderScene;
  renderScene=function(scene){
    if(scene.type==='relationshipChoice'){renderRelationshipChoice(scene);return;}
    if(scene.type==='relationshipResponse'){renderRelationshipResponse(scene);return;}
    originalRenderScene(scene);
  };
})();