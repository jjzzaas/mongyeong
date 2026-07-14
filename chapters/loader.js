(()=>{
  const params=new URLSearchParams(location.search);
  const requested=Number(params.get('chapter')||1);
  const selected=requested===2?2:1;
  window.SELECTED_CHAPTER=selected;
  window.CHAPTER_1=selected===2?window.CHAPTER_2:window.CHAPTER_1;
})();