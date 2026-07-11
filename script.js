const titleScreen=document.querySelector('#title-screen');
const openingScreen=document.querySelector('#opening-screen');
const blackout=document.querySelector('#blackout');
const forest=document.querySelector('#forest');
const narrationCards=[...document.querySelectorAll('.narration-card')];
const dialogueBox=document.querySelector('#dialogue-box');
const dialogueText=document.querySelector('#dialogue-text');
const nextButton=document.querySelector('#next-button');
const skipButton=document.querySelector('#skip-button');

const wait=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));
let sequenceSkipped=false;

async function typeText(text,speed=90){
  dialogueText.textContent='';
  for(const char of text){
    if(sequenceSkipped){dialogueText.textContent=text;return;}
    dialogueText.textContent+=char;
    await wait(speed);
  }
}

function hideNarration(){
  narrationCards.forEach(card=>card.classList.add('fade'));
}

function showFinalScene(){
  sequenceSkipped=true;
  titleScreen.classList.add('hide');
  openingScreen.classList.add('active');
  openingScreen.setAttribute('aria-hidden','false');
  blackout.classList.add('open');
  forest.classList.add('awake');
  hideNarration();
  dialogueBox.classList.add('show');
  dialogueBox.setAttribute('aria-hidden','false');
  dialogueText.textContent='여긴... 어디지?';
}

async function runOpening(){
  await wait(5000);
  if(sequenceSkipped)return;

  titleScreen.classList.add('hide');
  openingScreen.classList.add('active');
  openingScreen.setAttribute('aria-hidden','false');

  await wait(900);

  for(const card of narrationCards){
    if(sequenceSkipped)return;
    card.classList.add('show');
    await wait(2800);
    card.classList.add('fade');
    await wait(850);
  }

  if(sequenceSkipped)return;
  blackout.classList.add('open');
  forest.classList.add('awake');

  await wait(3200);
  if(sequenceSkipped)return;

  dialogueBox.classList.add('show');
  dialogueBox.setAttribute('aria-hidden','false');
  await typeText('여긴... 어디지?',100);
}

skipButton.addEventListener('click',showFinalScene);
nextButton.addEventListener('click',()=>{
  dialogueText.textContent='여긴... 어디지?';
});

document.addEventListener('keydown',event=>{
  if(event.key==='Escape')showFinalScene();
});

runOpening().catch(error=>{
  console.error('Opening sequence error:',error);
  showFinalScene();
});
