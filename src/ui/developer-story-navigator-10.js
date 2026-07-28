import { chapter001 } from '../chapters/001-010/chapter-001.js';
import { chapter002 } from '../chapters/001-010/chapter-002.js';
import { chapter003 } from '../chapters/001-010/chapter-003.js';
import { chapter004 } from '../chapters/001-010/chapter-004.js';
import { chapter005 } from '../chapters/001-010/chapter-005.js';
import { chapter006 } from '../chapters/001-010/chapter-006.js';
import { chapter007 } from '../chapters/001-010/chapter-007.js';
import { chapter008 } from '../chapters/001-010/chapter-008.js';
import { chapter009 } from '../chapters/001-010/chapter-009.js';
import { chapter010 } from '../chapters/001-010/chapter-010.js';
import { chapter011 } from '../chapters/011-020/chapter-011.js';
import { chapter012 } from '../chapters/011-020/chapter-012.js';
import { chapter013 } from '../chapters/011-020/chapter-013.js';
import { chapter014 } from '../chapters/011-020/chapter-014.js';
import { createInitialGameState } from '../config/game-state.js';
import { createDeveloperTapDetector } from '../config/developer-mode.js';
import { createChapterNavigator, openChapterNavigator } from './developer-panel.js';

const chapters = [chapter001, chapter002, chapter003, chapter004, chapter005, chapter006, chapter007, chapter008, chapter009, chapter010, chapter011, chapter012, chapter013, chapter014];
const SAVE_KEY = 'mongyeong-vn-save-v2';
const PREVIEW_KEY = 'mongyeong-developer-story-preview';
const BACKUP_KEY = 'mongyeong-developer-save-backup';
const NO_SAVE = '__NO_SAVE__';

const originalSetItem = Storage.prototype.setItem;
const originalRemoveItem = Storage.prototype.removeItem;

function createPreviewSave(chapterIndex) {
  const chapter = chapters[chapterIndex];
  const gameState = createInitialGameState();
  gameState.currentChapter = chapter.id;
  gameState.currentScene = chapter.scenes[0]?.id || '';
  if (gameState.status) gameState.status.레벨 = chapter.id;

  return JSON.stringify({
    chapterIndex,
    index: 0,
    gameState,
    dialogueLog: [],
    chapterStartSnapshot: null,
    savedAt: Date.now(),
  });
}

function restorePlayerSave() {
  const backup = sessionStorage.getItem(BACKUP_KEY);
  if (backup === NO_SAVE) originalRemoveItem.call(localStorage, SAVE_KEY);
  else if (backup !== null) originalSetItem.call(localStorage, SAVE_KEY, backup);
  sessionStorage.removeItem(BACKUP_KEY);
  sessionStorage.removeItem(PREVIEW_KEY);
}

function startPreviewAfterReload() {
  if (sessionStorage.getItem(PREVIEW_KEY) !== '1') return;

  Storage.prototype.setItem = function setItem(key, value) {
    if (this === localStorage && key === SAVE_KEY) return;
    return originalSetItem.call(this, key, value);
  };
  Storage.prototype.removeItem = function removeItem(key) {
    if (this === localStorage && key === SAVE_KEY) return;
    return originalRemoveItem.call(this, key);
  };

  const continueButton = document.querySelector('#continueButton');
  continueButton?.click();
  restorePlayerSave();

  const badge = document.createElement('div');
  badge.className = 'developer-preview-badge';
  badge.textContent = '개발자 스토리 점검 모드 · 저장되지 않음';
  document.querySelector('.vn-shell')?.appendChild(badge);
}

function moveToChapter(chapterIndex) {
  const currentSave = localStorage.getItem(SAVE_KEY);
  sessionStorage.setItem(BACKUP_KEY, currentSave ?? NO_SAVE);
  sessionStorage.setItem(PREVIEW_KEY, '1');
  originalSetItem.call(localStorage, SAVE_KEY, createPreviewSave(chapterIndex));
  window.location.reload();
}

function installChapterNavigator() {
  const shell = document.querySelector('.vn-shell');
  const title = document.querySelector('.vn-title-mark');
  if (!shell || !title) return;

  title.setAttribute('role', 'button');
  title.setAttribute('aria-label', '게임 제목');

  const panel = createChapterNavigator({
    chapters,
    onSelectChapter: moveToChapter,
  });
  shell.appendChild(panel);

  const detectTitleTap = createDeveloperTapDetector({
    onUnlock: () => openChapterNavigator(panel),
  });

  title.addEventListener('click', (event) => {
    event.stopPropagation();
    detectTitleTap();
  });
}

startPreviewAfterReload();
installChapterNavigator();