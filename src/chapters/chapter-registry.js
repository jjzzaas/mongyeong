export const CHAPTER_COUNT = 100;

const padChapter = (number) => String(number).padStart(3, '0');

const getRangeFolder = (chapter) => {
  const start = Math.floor((chapter - 1) / 10) * 10 + 1;
  const end = Math.min(start + 9, CHAPTER_COUNT);
  return `${padChapter(start)}-${padChapter(end)}`;
};

const chapterTitles = {
  1: '낯선 세계',
  2: '길드와 임시 숙소',
  3: '첫 임무',
  4: '훈련의 시작',
  5: '개인 훈련과 정식 의뢰',
  6: '첫 정식 의뢰',
};

export const chapterRegistry = Array.from({ length: CHAPTER_COUNT }, (_, index) => {
  const chapter = index + 1;
  const number = padChapter(chapter);
  const isCreated = chapter <= 6;

  return {
    id: chapter,
    title: chapterTitles[chapter] || `CHAPTER ${chapter}`,
    status: isCreated ? 'complete' : 'empty',
    path: `./${getRangeFolder(chapter)}/chapter-${number}.js`,
  };
});

export const getChapterInfo = (chapter) =>
  chapterRegistry.find((item) => item.id === chapter) || null;