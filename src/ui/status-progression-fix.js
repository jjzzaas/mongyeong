import { getStatusForLevel } from '../config/game-state.js';

const SAVE_KEY = 'mongyeong-vn-save-v2';
const originalSetItem = Storage.prototype.setItem;

function expectedLevelForState(gameState = {}) {
  const chapter = Math.max(1, Number(gameState.currentChapter) || 1);
  const confirmed = Boolean(gameState.flags?.[`chapter_${chapter}_confirmed`]);

  if (chapter === 1) return confirmed ? 2 : 1;
  if (confirmed) return chapter;
  return Math.max(2, chapter - 1);
}

function normalizeSaveValue(value) {
  try {
    const saved = JSON.parse(value);
    if (!saved?.gameState) return value;

    const level = expectedLevelForState(saved.gameState);
    saved.gameState.status = {
      ...(saved.gameState.status || {}),
      ...getStatusForLevel(level),
    };

    return JSON.stringify(saved);
  } catch {
    return value;
  }
}

Storage.prototype.setItem = function setItem(key, value) {
  if (this === localStorage && key === SAVE_KEY) {
    return originalSetItem.call(this, key, normalizeSaveValue(value));
  }
  return originalSetItem.call(this, key, value);
};

function readCurrentStatus() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
    const gameState = saved.gameState || {};
    const level = expectedLevelForState(gameState);
    return {
      name: gameState.status?.이름 || '미상',
      skill: Array.isArray(gameState.status?.스킬) && gameState.status.스킬.length
        ? gameState.status.스킬.join(', ')
        : '없음',
      weapon: gameState.status?.구현무기 || '없음',
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

const centerText = document.querySelector('#centerText');
if (centerText) {
  const observer = new MutationObserver(() => queueMicrotask(replaceLegacyStatusText));
  observer.observe(centerText, { childList: true, subtree: true, characterData: true, attributes: true });
  replaceLegacyStatusText();
}
