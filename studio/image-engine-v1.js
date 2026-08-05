#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const episodePath = path.join(__dirname, 'output', 'episode-001-production.json');
const queuePath = path.join(__dirname, 'output', 'episode-001-image-queue.json');

const episode = JSON.parse(fs.readFileSync(episodePath, 'utf8'));

const rules = {
  aspectRatio: '9:16',
  resolution: '1080x1920',
  style: 'high-quality anime visual novel cinematic illustration',
  playerFaceVisible: false,
  preserveCharacterDesign: true,
  preserveWeaponsAndCostume: true,
  textInsideImage: false,
  outputFormat: 'png'
};

const jobs = [
  {
    jobId: 'EP001_IMG_01',
    cutIds: [5],
    assetId: 'CG_EP001_HOUND_CHARGE_v1',
    subject: 'D급 악몽 들개 돌진',
    references: ['MON_D_HOUND', 'BG_FOREST', 'PLAYER_POV'],
    prompt: 'First-person view in a dark fantasy forest. The official D-grade Nightmare Hound lunges directly toward the camera with jaws open, matching the registered monster master sheet exactly. The protagonist face is never visible; only forearms at the lower edge are allowed. Strong forward motion, cinematic tension, vertical composition, no text.',
    status: 'READY_TO_GENERATE'
  },
  {
    jobId: 'EP001_IMG_02',
    cutIds: [6],
    assetId: 'CG_EP001_PLAYER_FALL_v1',
    subject: '주인공이 넘어져 공격을 막는 1인칭 장면',
    references: ['PLAYER_POV', 'MON_D_HOUND', 'BG_FOREST'],
    prompt: 'First-person ground-level view after falling backward in a fantasy forest. The protagonist blocks a Nightmare Hound attack with both forearms and a partially formed curved blade. No protagonist face. Preserve the official first-person clothing and weapon design. Dynamic impact, tilted camera, cinematic anime visual novel style, vertical composition, no text.',
    status: 'READY_TO_GENERATE'
  },
  {
    jobId: 'EP001_IMG_03',
    cutIds: [10],
    assetId: 'CG_EP001_LIGHT_ARROW_HIT_v1',
    subject: '하루의 빛의 화살이 악몽에 명중',
    references: ['CHAR_HARU_SHEET', 'MON_D_HOUND', 'BG_FOREST'],
    prompt: 'A brilliant sky-blue light arrow strikes the official D-grade Nightmare Hound from the side in a dark forest. The arrow design and warm celestial light must match Haru official master sheet. Haru herself may remain off-screen. Explosive light impact, clear silhouette, cinematic anime action illustration, vertical composition, no text.',
    status: 'READY_TO_GENERATE'
  },
  {
    jobId: 'EP001_IMG_04',
    cutIds: [11,12],
    assetId: 'CG_EP001_HARU_FIRST_MEETING_v1',
    subject: '하루와 주인공의 첫 대면',
    references: ['CHAR_HARU_KEY', 'CHAR_HARU_SHEET', 'BG_FOREST', 'PLAYER_POV'],
    prompt: 'First-person view in a forest after battle. Haru stands a few steps away, lowering her luminous bow and looking calmly toward the viewer. Match Haru official face, long blonde hair, white-and-sky-blue hunter outfit, body proportions, boots and bow exactly. The protagonist face is not visible. Soft dawn-like blue light, gentle but mysterious mood, cinematic anime visual novel illustration, vertical composition, no text.',
    status: 'READY_TO_GENERATE'
  }
];

const queue = {
  engine: 'Dream Studio Image Engine v1',
  episode: 1,
  generatedAt: new Date().toISOString(),
  rules,
  totalJobs: jobs.length,
  jobs,
  completionPolicy: {
    afterGeneration: ['quality_check', 'rename', 'upload_to_drive', 'register_asset_db', 'mark_complete'],
    rejectIf: ['wrong character face', 'wrong costume', 'wrong weapon', 'player face visible', 'text rendered in image', 'landscape aspect ratio']
  }
};

fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
console.log(`Image queue written: ${queuePath}`);
console.log(`Ready jobs: ${jobs.length}`);
