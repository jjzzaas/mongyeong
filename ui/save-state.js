(()=>{
  const STORAGE_KEY='mongyeong.save';
  const SAVE_SCHEMA_VERSION=1;

  const createDefaultSave=()=>({
    schemaVersion:SAVE_SCHEMA_VERSION,
    gameVersion:window.GAME_VERSION||'4.0',
    player:{
      name:'여행자',
      level:1,
      exp:0,
      stamina:200,
      maxStamina:200,
      credits:0,
      nightmareEssence:0
    },
    progress:{
      chapter:1,
      sceneId:null,
      sceneIndex:-1,
      completedChapters:[]
    },
    relationships:{
      haru:0,
      momo:0
    },
    flags:{},
    savedAt:null
  });

  const isPlainObject=value=>Boolean(value)&&typeof value==='object'&&!Array.isArray(value);

  const normalizeSave=value=>{
    const defaults=createDefaultSave();
    if(!isPlainObject(value))return defaults;

    return {
      ...defaults,
      ...value,
      schemaVersion:SAVE_SCHEMA_VERSION,
      player:{...defaults.player,...(isPlainObject(value.player)?value.player:{})},
      progress:{...defaults.progress,...(isPlainObject(value.progress)?value.progress:{})},
      relationships:{...defaults.relationships,...(isPlainObject(value.relationships)?value.relationships:{})},
      flags:isPlainObject(value.flags)?{...value.flags}:{}
    };
  };

  window.MONGYEONG_SAVE={
    STORAGE_KEY,
    SAVE_SCHEMA_VERSION,
    createDefaultSave,
    normalizeSave
  };
})();
