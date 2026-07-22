(() => {
  const SAVE_KEY = 'mongyeong-vn-save-v2';
  const CHAPTER_START_KEY = 'mongyeong-vn-chapter-start-v1';
  const RESTART_PENDING_KEY = 'mongyeong-vn-chapter-restart-pending';
  const originalSetItem = Storage.prototype.setItem;
  const characterNames = { haru: '하루', momo: '모모', sena: '세나' };
  const traitNames = {
    cautious: '신중함',
    brave: '용기',
    considerate: '배려',
    justice: '정의감',
    calm: '냉정함',
  };

  function parseJson(value, fallback = null) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function clone(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function readSave() {
    return parseJson(localStorage.getItem(SAVE_KEY));
  }

  function readChapterStart() {
    return parseJson(localStorage.getItem(CHAPTER_START_KEY));
  }

  function writeDirect(key, value) {
    originalSetItem.call(localStorage, key, value);
  }

  function subtractValues(target, changes, nameMap = {}) {
    Object.entries(changes || {}).forEach(([name, amount]) => {
      const resolvedName = nameMap[name] || name;
      target[resolvedName] = (Number(target[resolvedName]) || 0) - Number(amount || 0);
    });
  }

  function rewindCurrentChapterChoices(savedState, currentChapterId) {
    const state = clone(savedState) || {};
    const history = Array.isArray(state.choiceHistory) ? state.choiceHistory : [];
    const currentChoices = history.filter((choice) => String(choice?.chapter) === String(currentChapterId));
    const previousChoices = history.filter((choice) => String(choice?.chapter) !== String(currentChapterId));

    state.affection = { ...(state.affection || {}) };
    state.trust = { ...(state.trust || {}) };
    state.traits = { ...(state.traits || {}) };
    state.flags = { ...(state.flags || {}) };

    currentChoices.forEach((choice) => {
      subtractValues(state.affection, choice.affection, characterNames);
      subtractValues(state.trust, choice.trust, characterNames);
      subtractValues(state.traits, choice.traits, traitNames);
    });

    const flagsStillUsed = new Set(previousChoices.flatMap((choice) => choice?.flags || []));
    currentChoices.flatMap((choice) => choice?.flags || []).forEach((flag) => {
      if (!flagsStillUsed.has(flag)) delete state.flags[flag];
    });

    state.choiceHistory = previousChoices;
    state.currentScene = '';
    return state;
  }

  function createChapterStartSnapshot(save) {
    const currentChapterId = save?.gameState?.currentChapter;
    const previousDialogueLog = Array.isArray(save?.dialogueLog)
      ? save.dialogueLog.filter((entry) => String(entry?.chapter) !== String(currentChapterId))
      : [];

    return {
      chapterIndex: save.chapterIndex,
      index: 0,
      gameState: rewindCurrentChapterChoices(save.gameState, currentChapterId),
      dialogueLog: previousDialogueLog,
      savedAt: Date.now(),
      chapterCleared: false,
    };
  }

  Storage.prototype.setItem = function patchedSetItem(key, value) {
    if (this === localStorage && key === SAVE_KEY) {
      const nextSave = parseJson(value);

      if (nextSave && Number.isInteger(nextSave.chapterIndex)) {
        const storedStart = readChapterStart();
        const chapterChanged = !storedStart || storedStart.chapterIndex !== nextSave.chapterIndex;
        const sceneId = String(nextSave?.gameState?.currentScene || '');

        if (chapterChanged) {
          writeDirect(CHAPTER_START_KEY, JSON.stringify(createChapterStartSnapshot(nextSave)));
        } else if (/clear/i.test(sceneId) && !storedStart.chapterCleared) {
          storedStart.chapterCleared = true;
          writeDirect(CHAPTER_START_KEY, JSON.stringify(storedStart));
        }
      }
    }

    return originalSetItem.call(this, key, value);
  };

  function updateRestartLabel() {
    const restartButton = document.querySelector('#restart');
    if (restartButton && restartButton.textContent !== '챕터 다시하기') {
      restartButton.textContent = '챕터 다시하기';
      restartButton.setAttribute('aria-label', '현재 챕터 다시하기');
    }
  }

  function handleNewGame(event) {
    const startButton = event.target.closest('#startButton');
    if (!startButton || !localStorage.getItem(SAVE_KEY)) return;

    const confirmed = window.confirm(
      '새 게임을 시작하시겠습니까?\n\n현재 자동저장된 진행 데이터가 모두 삭제됩니다.\n이 작업은 되돌릴 수 없습니다.'
    );

    if (!confirmed) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  function handleChapterRestart(event) {
    const restartButton = event.target.closest('#restart');
    if (!restartButton) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    const save = readSave();
    const chapterStart = readChapterStart();

    if (!save || !chapterStart || chapterStart.chapterIndex !== save.chapterIndex) {
      window.alert('현재 챕터의 시작 지점을 찾을 수 없습니다. 이어하기로 다시 진입한 뒤 시도해 주세요.');
      return;
    }

    if (chapterStart.chapterCleared) {
      window.alert('이미 클리어한 챕터는 진행 데이터를 되돌릴 수 없습니다.');
      return;
    }

    const confirmed = window.confirm(
      '현재 챕터를 처음부터 다시 진행하시겠습니까?\n\n이 챕터에서 선택한 내용과 진행 상황이 초기화됩니다.'
    );

    if (!confirmed) return;

    const restartSave = {
      chapterIndex: chapterStart.chapterIndex,
      index: 0,
      gameState: chapterStart.gameState,
      dialogueLog: chapterStart.dialogueLog,
      savedAt: Date.now(),
    };

    writeDirect(SAVE_KEY, JSON.stringify(restartSave));
    writeDirect(RESTART_PENDING_KEY, '1');
    window.location.reload();
  }

  function resumeRestartedChapter() {
    if (localStorage.getItem(RESTART_PENDING_KEY) !== '1') return;

    const continueButton = document.querySelector('#continueButton');
    if (!continueButton || continueButton.classList.contains('vn-hidden')) return;

    localStorage.removeItem(RESTART_PENDING_KEY);
    window.setTimeout(() => continueButton.click(), 50);
  }

  document.addEventListener('click', handleNewGame, true);
  document.addEventListener('click', handleChapterRestart, true);

  const observer = new MutationObserver(() => {
    updateRestartLabel();
    resumeRestartedChapter();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      updateRestartLabel();
      resumeRestartedChapter();
    }, { once: true });
  } else {
    updateRestartLabel();
    resumeRestartedChapter();
  }
})();