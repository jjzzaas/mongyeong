export const DEVELOPER_MODE_CONFIG = {
  enabled: true,
  versionTapCount: 5,
  versionTapTimeLimitMs: 3000,
  visibleToPlayers: false,
};

export const createDeveloperTapDetector = ({ onUnlock }) => {
  let taps = [];

  return () => {
    const now = Date.now();
    const limit = DEVELOPER_MODE_CONFIG.versionTapTimeLimitMs;

    taps = taps.filter((time) => now - time <= limit);
    taps.push(now);

    if (taps.length >= DEVELOPER_MODE_CONFIG.versionTapCount) {
      taps = [];
      onUnlock?.();
      return true;
    }

    return false;
  };
};

export const getDeveloperSnapshot = (state) => ({
  currentChapter: state.currentChapter,
  currentScene: state.currentScene,
  affection: state.affection,
  trust: state.trust,
  traits: state.traits,
  flags: state.flags,
  choiceHistory: state.choiceHistory,
});
