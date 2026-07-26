const AUTO_STATE_KEY = 'mongyeong-vn-auto-enabled';
const AUTO_TICK_MS = 350;
const AUTO_STABLE_MS = 1150;

function isHidden(element) {
  return !element || element.classList.contains('vn-hidden') || element.hidden;
}

function setupAutoAndLogControls() {
  const shell = document.querySelector('.vn-shell');
  const autoButton = document.querySelector('#autoModeButton');
  const logButton = document.querySelector('#logButton');
  const logPanel = document.querySelector('#dialogueLog');
  const logContent = document.querySelector('#dialogueLogContent');
  const choices = document.querySelector('#choices');
  const centerText = document.querySelector('#centerText');
  const dialogue = document.querySelector('#dialogue');
  const text = document.querySelector('#text');
  const startScreen = document.querySelector('#startScreen');
  const developerPanel = document.querySelector('.developer-panel');

  if (!shell || !autoButton || !logButton || !logPanel || !logContent || !choices || !centerText || !dialogue || !text || !startScreen) return;

  let autoEnabled = localStorage.getItem(AUTO_STATE_KEY) === 'true';
  let lastText = '';
  let stableSince = performance.now();
  let lastAdvanceAt = 0;

  function renderAutoState() {
    autoButton.classList.toggle('is-active', autoEnabled);
    autoButton.setAttribute('aria-pressed', String(autoEnabled));
    autoButton.setAttribute('aria-label', autoEnabled ? '자동 진행 끄기' : '자동 진행 켜기');
  }

  function setAutoEnabled(nextEnabled) {
    autoEnabled = Boolean(nextEnabled);
    localStorage.setItem(AUTO_STATE_KEY, String(autoEnabled));
    stableSince = performance.now();
    lastText = text.textContent || '';
    renderAutoState();
  }

  autoButton.addEventListener('click', () => {
    setAutoEnabled(autoButton.classList.contains('is-active'));
  });

  function shouldSuspendAuto() {
    if (!autoEnabled || !isHidden(startScreen) || !isHidden(logPanel) || (developerPanel && !developerPanel.hidden)) return true;
    if (!isHidden(choices)) return true;

    const systemScreenVisible = !isHidden(centerText) && isHidden(dialogue);
    if (systemScreenVisible) return true;

    return false;
  }

  window.setInterval(() => {
    const currentText = text.textContent || '';
    if (currentText !== lastText) {
      lastText = currentText;
      stableSince = performance.now();
      return;
    }

    if (shouldSuspendAuto()) return;

    const now = performance.now();
    if (now - stableSince < AUTO_STABLE_MS || now - lastAdvanceAt < AUTO_STABLE_MS) return;

    lastAdvanceAt = now;
    stableSince = now;
    shell.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }, AUTO_TICK_MS);

  function showNewestLogFirst() {
    const entries = Array.from(logContent.querySelectorAll('.vn-log__entry'));
    if (entries.length > 1) entries.reverse().forEach((entry) => logContent.appendChild(entry));
    logContent.scrollTop = 0;
  }

  logButton.addEventListener('click', () => {
    window.requestAnimationFrame(() => {
      showNewestLogFirst();
      window.requestAnimationFrame(() => { logContent.scrollTop = 0; });
    });
  });

  renderAutoState();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupAutoAndLogControls, { once: true });
} else {
  setupAutoAndLogControls();
}
