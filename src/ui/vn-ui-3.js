const shell = document.querySelector('.vn-shell');
const logButton = document.querySelector('#logButton');
const restartButton = document.querySelector('#restart');

if (shell && logButton) {
  restartButton.textContent = '챕터 다시하기';

  const bar = document.createElement('nav');
  bar.className = 'vn-bottom-bar';
  bar.setAttribute('aria-label', '비주얼 노벨 편의 기능');

  const makeButton = ({ id, icon, label, onClick }) => {
    const button = document.createElement('button');
    button.id = id;
    button.type = 'button';
    button.className = 'vn-bottom-button';
    button.innerHTML = `<span class="vn-bottom-button__icon" aria-hidden="true">${icon}</span>${label}`;
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      onClick?.(button);
    });
    return button;
  };

  const recordButton = makeButton({
    id: 'bottomLogButton',
    icon: '▤',
    label: '기록',
    onClick: () => logButton.click(),
  });

  const autoButton = makeButton({
    id: 'autoModeButton',
    icon: '▶',
    label: '자동',
    onClick: (button) => {
      button.classList.toggle('is-active');
      button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
    },
  });

  const skipButton = makeButton({
    id: 'skipModeButton',
    icon: '▶▶',
    label: '건너뛰기',
    onClick: (button) => {
      button.classList.toggle('is-active');
      button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
    },
  });

  const settingsButton = makeButton({
    id: 'settingsButton',
    icon: '⚙',
    label: '설정',
    onClick: () => window.alert('설정 기능은 다음 업데이트에서 연결됩니다.'),
  });

  const menuButton = makeButton({
    id: 'menuButton',
    icon: '☰',
    label: '메뉴',
    onClick: () => window.alert('메뉴 기능은 다음 업데이트에서 연결됩니다.'),
  });

  bar.append(recordButton, autoButton, skipButton, settingsButton, menuButton);
  shell.appendChild(bar);
}
