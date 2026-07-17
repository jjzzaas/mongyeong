(()=>{
  const nativeSetTimeout=window.setTimeout.bind(window);
  const CUTIN_DURATION=1900;
  let activeKey='';

  const skillDetails={
    '모모 — 다크사이트':'3턴 동안 적의 공격 대상이 되지 않습니다.\n효과가 유지되는 동안 행동할 수 없습니다.',
    '하루 — 천체낙하':'푸른 천체의 빛이 적 전체를 덮칩니다.\n적 전체에 강한 피해를 줍니다.'
  };

  function escapeHtml(value){
    return String(value).replace(/[&<>'"]/g,char=>({
      '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
    })[char]);
  }

  function readSpecial(){
    const banner=document.querySelector('.special-skill-banner');
    const label=document.getElementById('turnLabel');
    const line=document.getElementById('battleLine');
    const isSpecial=Boolean(banner)||label?.textContent?.trim()==='SPECIAL SKILL';
    if(!isSpecial)return null;

    const bannerName=banner?.querySelector('strong')?.textContent?.trim();
    const lineStrong=line?.querySelector('strong')?.textContent?.trim();
    const name=bannerName||lineStrong||'';
    if(!skillDetails[name])return null;

    const detail=skillDetails[name];
    return {name,detail,key:`${name}|${detail}`};
  }

  function showCutin(skill){
    if(skill.key===activeKey)return;
    activeKey=skill.key;

    document.querySelector('.brief-skill-cutin')?.remove();
    const overlay=document.createElement('div');
    overlay.className='brief-skill-cutin';
    overlay.innerHTML=`
      <div class="brief-skill-cutin__panel">
        <span>SPECIAL SKILL</span>
        <strong>${escapeHtml(skill.name)}</strong>
        <p>${escapeHtml(skill.detail).replace(/\n/g,'<br>')}</p>
      </div>`;
    document.body.appendChild(overlay);
    document.documentElement.classList.add('skill-cutin-active');

    nativeSetTimeout(()=>{
      overlay.classList.add('is-leaving');
      nativeSetTimeout(()=>overlay.remove(),220);
      document.documentElement.classList.remove('skill-cutin-active');
    },CUTIN_DURATION);
  }

  function syncCutin(){
    const skill=readSpecial();
    if(!skill){
      activeKey='';
      return;
    }
    showCutin(skill);
  }

  const observer=new MutationObserver(syncCutin);
  observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
})();