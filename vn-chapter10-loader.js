const entryUrl = new URL('./vn-3.2.js?v=vn-3.2-chapter10-source', window.location.href);
const response = await fetch(entryUrl, { cache: 'no-store' });
if (!response.ok) throw new Error(`비주얼 노벨 엔트리 로드 실패: ${response.status}`);

let source = await response.text();
const baseUrl = new URL('./', window.location.href).href;
source = source.replaceAll("from './", `from '${baseUrl}`);
source = source.replace(
  "import { chapter009 } from '" + baseUrl + "src/chapters/001-010/chapter-009.js';",
  "import { chapter009 } from '" + baseUrl + "src/chapters/001-010/chapter-009.js';\nimport { chapter010 } from '" + baseUrl + "src/chapters/001-010/chapter-010.js';",
);
source = source.replace(
  'const chapters = [chapter001, chapter002, chapter003, chapter004, chapter005, chapter006, chapter007, chapter008, chapter009];',
  'const chapters = [chapter001, chapter002, chapter003, chapter004, chapter005, chapter006, chapter007, chapter008, chapter009, chapter010];',
);

const moduleUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
try {
  await import(moduleUrl);
} finally {
  URL.revokeObjectURL(moduleUrl);
}
