#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, 'data', 'asset-registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

const EPISODES = {
  1: {
    title: '눈을 뜬 숲',
    durationSec: 60,
    format: '9:16 motion visual novel',
    continuity: {
      playerFaceVisible: false,
      playerMemory: '상실',
      worldSecretDisclosure: false,
      monsterGrade: 'D',
      firstCompanion: '하루'
    },
    cuts: [
      {id:1, sec:[0,4], scene:'타이틀', assets:['BRAND_TITLE'], subtitle:'夢境 : 잠든 세계', sfx:['low_whoosh'], bgm:'mystery_intro', motion:'slow zoom in'},
      {id:2, sec:[4,9], scene:'숲에서 눈을 뜬다', assets:['BG_FOREST','PLAYER_POV'], subtitle:'여긴… 어디지?', sfx:['forest_wind','breath'], bgm:'mystery_intro', motion:'first-person sway'},
      {id:3, sec:[9,14], scene:'기억을 더듬는다', assets:['BG_FOREST','PLAYER_POV'], subtitle:'아무것도 기억나지 않아.', sfx:['heartbeat_soft'], bgm:'mystery_intro', motion:'slow push in'},
      {id:4, sec:[14,19], scene:'수풀 너머의 기척', assets:['BG_FOREST','MON_D_HOUND'], subtitle:'…뭔가 있어.', sfx:['bush_rustle','monster_growl'], bgm:'tension_rise', motion:'quick pan'},
      {id:5, sec:[19,24], scene:'D급 악몽이 돌진한다', assets:['MON_D_HOUND','PLAYER_POV'], subtitle:'피해야 해!', sfx:['monster_charge','footstep_fast'], bgm:'tension_rise', motion:'camera shake'},
      {id:6, sec:[24,29], scene:'주인공이 넘어져 공격을 막는다', assets:['PLAYER_POV','MON_D_HOUND'], subtitle:'큭…!', sfx:['impact_heavy','cloth_fall'], bgm:'battle_short', motion:'hard shake + tilt'},
      {id:7, sec:[29,34], scene:'손끝에 구현검이 생성된다', assets:['PLAYER_POV'], subtitle:'이건… 내 무기인가?', sfx:['energy_form','blade_ring'], bgm:'battle_short', motion:'light flash'},
      {id:8, sec:[34,40], scene:'검으로 반격하지만 밀린다', assets:['PLAYER_POV','MON_D_HOUND'], subtitle:'한 번 더…!', sfx:['sword_slash','monster_hit'], bgm:'battle_short', motion:'slash transition'},
      {id:9, sec:[40,45], scene:'악몽의 마지막 공격', assets:['MON_D_HOUND','PLAYER_POV'], subtitle:'안 돼…!', sfx:['monster_roar','heartbeat_fast'], bgm:'tension_peak', motion:'rapid zoom'},
      {id:10, sec:[45,50], scene:'빛의 화살이 악몽을 꿰뚫는다', assets:['CHAR_HARU_KEY','MON_D_HOUND'], subtitle:'거기서 물러나세요!', sfx:['light_arrow','impact_magic'], bgm:'hero_entry', motion:'white flash'},
      {id:11, sec:[50,56], scene:'하루가 주인공 앞을 막아선다', assets:['CHAR_HARU_KEY','BG_FOREST'], subtitle:'괜찮으세요?', sfx:['cape_flutter','forest_wind'], bgm:'hero_entry', motion:'slow reveal'},
      {id:12, sec:[56,60], scene:'주인공 시점으로 하루를 바라본다', assets:['CHAR_HARU_KEY','PLAYER_POV','BG_FOREST'], subtitle:'…당신은 누구죠?', sfx:['soft_chime'], bgm:'ending_hook', motion:'fade to black'}
    ]
  }
};

function validateEpisode(ep) {
  const errors = [];
  for (const cut of ep.cuts) {
    for (const assetId of cut.assets) {
      if (!registry.assets[assetId]) errors.push(`컷 ${cut.id}: 등록되지 않은 자산 ${assetId}`);
    }
  }
  if (ep.continuity.playerFaceVisible) errors.push('주인공 얼굴 노출 금지 규칙 위반');
  if (ep.continuity.worldSecretDisclosure) errors.push('초반 세계 비밀 공개 금지 규칙 위반');
  return errors;
}

function buildProductionPackage(episodeNo) {
  const ep = EPISODES[episodeNo];
  if (!ep) throw new Error(`Episode ${episodeNo}은 아직 등록되지 않았습니다.`);
  const validationErrors = validateEpisode(ep);
  const usedAssetIds = [...new Set(ep.cuts.flatMap(c => c.assets))];
  const usedAssets = usedAssetIds.map(id => ({id, ...registry.assets[id]}));
  const missingVisuals = [
    {id:'CG_EP001_HOUND_CHARGE', reason:'설정시트가 아닌 실제 돌진 장면 필요', priority:'HIGH'},
    {id:'CG_EP001_PLAYER_FALL', reason:'1인칭 피격·넘어짐 장면 필요', priority:'HIGH'},
    {id:'CG_EP001_LIGHT_ARROW_HIT', reason:'하루의 구원 장면 이벤트 CG 필요', priority:'HIGH'},
    {id:'CG_EP001_HARU_FIRST_MEET', reason:'숲에서 하루를 올려다보는 1인칭 장면 필요', priority:'MEDIUM'}
  ];
  return {
    engine:'Dream Studio Story Engine',
    engineVersion:'1.0.0',
    command:`${episodeNo}화 제작`,
    episode:episodeNo,
    title:ep.title,
    format:ep.format,
    durationSec:ep.durationSec,
    status: validationErrors.length ? 'BLOCKED' : 'STORY_PACKAGE_READY',
    validation:{passed:validationErrors.length===0, errors:validationErrors},
    continuity:ep.continuity,
    existingAssets:usedAssets,
    missingVisuals,
    cuts:ep.cuts,
    nextStage:'missingVisuals 이미지 생성 후 영상 편집 패키지 생성'
  };
}

const episodeNo = Number(process.argv[2] || 1);
try {
  const result = buildProductionPackage(episodeNo);
  const outDir = path.join(__dirname, 'output');
  fs.mkdirSync(outDir, {recursive:true});
  const outPath = path.join(outDir, `episode-${String(episodeNo).padStart(3,'0')}-production.json`);
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(JSON.stringify(result, null, 2));
  console.error(`\nSaved: ${outPath}`);
} catch (error) {
  console.error(`[StoryEngine] ${error.message}`);
  process.exit(1);
}
