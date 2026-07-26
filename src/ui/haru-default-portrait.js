const CHARACTER_PORTRAITS = [
  {
    name: '하루',
    path: './public/images/characters/haru/file_0000000068a48206b6b471ee80304517.png',
    alt: '하루 기본 일러스트',
  },
  {
    name: '모모',
    path: './public/images/characters/momo/file_00000000ee508206985aef654422f2cf.png',
    alt: '모모 기본 일러스트',
  },
  {
    name: '세나',
    path: './public/images/characters/sena/file_00000000e99482069a3458ed24672560.png',
    alt: '세나 기본 일러스트',
  },
];

function mountCharacterPortraits() {
  const shell = document.querySelector('.vn-shell');
  const speaker = document.querySelector('#speaker');
  const dialogue = document.querySelector('#dialogue');

  if (!shell || !speaker || !dialogue) return false;
  if (shell.querySelector('.character-default-portrait')) return true;

  const vignette = shell.querySelector('.vn-vignette');
  const portraits = CHARACTER_PORTRAITS.map((character) => {
    const portrait = document.createElement('img');
    portrait.className = `character-default-portrait character-${character.name === '하루' ? 'haru' : character.name === '모모' ? 'momo' : 'sena'}`;
    portrait.src = character.path;
    portrait.alt = character.alt;
    portrait.dataset.characterName = character.name;
    portrait.setAttribute('aria-hidden', 'true');
    shell.insertBefore(portrait, vignette || shell.firstChild);
    return portrait;
  });

  const syncPortraits = () => {
    const speakerName = speaker.textContent.trim();
    const dialogueVisible = !dialogue.classList.contains('vn-hidden');

    portraits.forEach((portrait) => {
      const isCurrentSpeaker = portrait.dataset.characterName === speakerName;
      portrait.classList.toggle('is-visible', isCurrentSpeaker && dialogueVisible);
    });
  };

  new MutationObserver(syncPortraits).observe(speaker, {
    childList: true,
    characterData: true,
    subtree: true,
  });

  new MutationObserver(syncPortraits).observe(dialogue, {
    attributes: true,
    attributeFilter: ['class'],
  });

  portraits.forEach((portrait) => {
    portrait.addEventListener('load', syncPortraits, { once: true });
    portrait.addEventListener('error', () => {
      portrait.classList.remove('is-visible');
      console.warn(`캐릭터 일러스트를 불러오지 못했습니다: ${portrait.src}`);
    });
  });

  syncPortraits();
  return true;
}

if (!mountCharacterPortraits()) {
  const appObserver = new MutationObserver(() => {
    if (mountCharacterPortraits()) appObserver.disconnect();
  });

  appObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
