import { getStatusForLevel } from '../config/game-state.js';

const SAVE_KEY = 'mongyeong-vn-save-v2';
const IMPLEMENTED_WEAPON = '짧은 검';
const originalSetItem = Storage.prototype.setItem;

function expectedLevelForState(gameState = {}) {
  const chapter = Math.max(1, Number(gameState.currentChapter) || 1);
  const confirmed = Boolean(gameState.flags?.[`chapter_${chapter}_confirmed`]);

  if (chapter === 1) return confirmed ? 2 : 1;
  if (confirmed) return chapter;
  return Math.max(2, chapter - 1);
}

function hasCompletedWeaponManifestation(gameState = {}) {
  const chapter = Math.max(1, Number(gameState.currentChapter) || 1);
  if (chapter > 6) return true;
  if (chapter < 6) return false;

  const completedScenes = new Set([
    'c6-status-after',
    'c6-momo-success',
    'c6-momo-breath',
    'c6-haru-end',
    'c6-choice-end',
    'c6-final-monologue',
    'c6-clear',
    'c6-end',
  ]);

  return completedScenes.has(gameState.currentScene)
    || Boolean(gameState.flags?.chapter_6_confirmed);
}

function normalizeSaveValue(value) {
  try {
    const saved = JSON.parse(value);
    if (!saved?.gameState) return value;

    const level = expectedLevelForState(saved.gameState);
    const previousStatus = saved.gameState.status || {};
    saved.gameState.status = {
      ...previousStatus,
      ...getStatusForLevel(level),
      구현무기: hasCompletedWeaponManifestation(saved.gameState)
        ? IMPLEMENTED_WEAPON
        : (previousStatus.구현무기 || '없음'),
    };

    return JSON.stringify(saved);
  } catch {
    return value;
  }
}

function getSavedGameState() {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || '{}').gameState || {};
  } catch {
    return {};
  }
}

function updateChapterIndicator(gameState = getSavedGameState()) {
  const titleMark = document.querySelector('.vn-title-mark');
  if (!titleMark) return;

  const chapter = Math.max(1, Number(gameState.currentChapter) || 1);
  titleMark.innerHTML = `
    <span class="vn-title-mark__name">夢境 : 잠든 세계</span>
    <span class="vn-title-mark__chapter">CHAPTER ${chapter}</span>
  `;
  titleMark.setAttribute('aria-label', `夢境 : 잠든 세계, 현재 챕터 ${chapter}`);
}

Storage.prototype.setItem = function setItem(key, value) {
  if (this === localStorage && key === SAVE_KEY) {
    const normalizedValue = normalizeSaveValue(value);
    const result = originalSetItem.call(this, key, normalizedValue);
    try {
      updateChapterIndicator(JSON.parse(normalizedValue).gameState || {});
    } catch {
      updateChapterIndicator();
    }
    return result;
  }
  return originalSetItem.call(this, key, value);
};

function readCurrentStatus() {
  try {
    const gameState = getSavedGameState();
    const level = expectedLevelForState(gameState);
    return {
      name: gameState.status?.이름 || '미상',
      skill: Array.isArray(gameState.status?.스킬) && gameState.status.스킬.length
        ? gameState.status.스킬.join(', ')
        : '없음',
      weapon: hasCompletedWeaponManifestation(gameState)
        ? IMPLEMENTED_WEAPON
        : (gameState.status?.구현무기 || '없음'),
      ...getStatusForLevel(level),
    };
  } catch {
    return { name: '미상', skill: '없음', weapon: '없음', ...getStatusForLevel(1) };
  }
}

function replaceLegacyStatusText() {
  const centerText = document.querySelector('#centerText');
  if (!centerText || centerText.classList.contains('vn-hidden')) return;

  const plainText = centerText.innerText.trim();
  if (!plainText.startsWith('스테이터스')) return;

  const status = readCurrentStatus();
  centerText.textContent = [
    '스테이터스',
    '',
    `이름  ${status.name}`,
    `레벨  ${status.레벨}`,
    `힘  ${status.힘}   민첩  ${status.민첩}`,
    `체력  ${status.체력}   정신력  ${status.정신력}`,
    '',
    `스킬  ${status.skill}`,
    `구현 무기  ${status.weapon}`,
  ].join('\n');
}

function installChapterIndicatorStyle() {
  if (document.querySelector('#chapter-indicator-style')) return;
  const style = document.createElement('style');
  style.id = 'chapter-indicator-style';
  style.textContent = `
    .vn-title-mark {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      line-height: 1.15;
    }
    .vn-title-mark__name {
      display: block;
    }
    .vn-title-mark__chapter {
      display: block;
      color: #66bfff;
      font-size: 0.68em;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-shadow: 0 0 12px rgba(74, 174, 255, 0.28);
    }
  `;
  document.head.appendChild(style);
}

installChapterIndicatorStyle();
updateChapterIndicator();

const app = document.querySelector('#app');
if (app) {
  const observer = new MutationObserver(() => {
    queueMicrotask(() => {
      replaceLegacyStatusText();
      updateChapterIndicator();
    });
  });
  observer.observe(app, { childList: true, subtree: true, characterData: true, attributes: true });
  replaceLegacyStatusText();
}
