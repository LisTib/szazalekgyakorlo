// A feladatgenerátorok és a lépések ellenőrzése: node tests/verify.js
const fs = require('fs');
const html = fs.readFileSync(require('path').join(__dirname, '..', 'index.html'), 'utf8');
const eng = html.split('// ENGINE START')[1].split('// ENGINE END')[0];
const E = new Function(eng + '; return {SC, CH, TOPICS, genBasic, genChange, makeTask, start, commit, expected, derive, story, sayAnswer, quickMistake, D, dparse, dstr, deq, ddiv, dmul, hund, pct, answerOf};')();
let bad = 0, count = 0;
const fail = (...a) => { bad++; if (bad < 20) console.log('HIBA', ...a); };
const H = E.D(100);

function checkTask(q, tag) {
  count++;
  const txt = E.story(q);
  if (/undefined|NaN|null|\[object/.test(txt + E.sayAnswer(q))) fail('hibás szöveg', tag, txt);
  // É · 100 = A · p
  if (!E.deq(E.dmul(q.E, H), E.dmul(q.A, q.P))) fail('ellentmondó adatok', tag, txt);
  if (q.sc.int && (q.E.s || q.A.s)) fail('nem egész mennyiség', tag, txt);
  if (q.change) {
    if (q.sc.int && (q.N.s || q.O.s)) fail('nem egész (változás)', tag);
    if (!E.deq(E.pct(q.O, q.pc), q.Dd)) fail('változás hibás', tag);
  }
  // levezetés
  const W = E.derive(q);
  if (W.stage !== 'done') fail('nem ér véget', tag);
  if (/NaN|undefined|null/.test(JSON.stringify(W.rows))) fail('hibás sor', tag);
  // 1% = É : p ugyanaz, mint A : 100
  if (!E.deq(E.ddiv(q.E, q.P), E.hund(q.A))) fail('1% nem egyezik', tag);
  // a helyes válasz nem számít tipikus hibának
  if (E.quickMistake(q, E.answerOf(q))) fail('a helyes válasz hibának látszik', tag, txt);
  // a kiírt számok visszaolvashatók
  for (const k of ['A', 'E', 'P']) if (!E.deq(E.dparse(E.dstr(q[k], true)), q[k])) fail('dparse/dstr', tag, k);
}

for (const unk of ['A', 'E', 'P']) {
  for (const L of [1, 2, 3]) {
    for (const sc of E.SC) for (let i = 0; i < 150; i++) {
      const q = E.genBasic(sc, L, unk);
      if (!q) { fail('nem generálható', sc.id, unk, 'L' + L); break; }
      checkTask(q, sc.id + ' ' + unk + ' L' + L);
    }
  }
  for (const sc of E.CH) for (let i = 0; i < 300; i++) {
    const q = E.genChange(sc, 3, unk);
    if (!q) { fail('nem generálható', sc.id, unk); break; }
    checkTask(q, sc.id + ' ' + unk + ' változás');
  }
}
for (const t of E.TOPICS) for (const L of [1, 2, 3]) for (let i = 0; i < 300; i++) {
  const q = E.makeTask(t.id, L, '');
  if (!q) { fail('makeTask null', t.id, L); continue; }
  if (t.id !== 'mixed' && q.unk !== t.id) fail('rossz típus', t.id);
  if (L < 3 && q.change) fail('változás könnyebb szinten', t.id, L);
}
// lépések ellenőrzése: a várt értékek minden lépésben
{
  const q = E.genChange(E.CH[0], 3, 'A');
  const W = E.start(q, true);
  if (W.stage !== 'goal' || E.expected(W).unk !== 'A') fail('goal');
  E.commit(W); const x = E.expected(W);
  if (!E.deq(x.E, q.N) || !E.deq(E.dadd ? x.P : x.P, q.P) || q.P.n + q.pc.n * (10n ** BigInt(q.P.s - q.pc.s >= 0 ? q.P.s - q.pc.s : 0)) === 0n) fail('data', E.dstr(x.P));
}
// beolvasás
const chk = (a, b, m) => { if (!a || E.dstr(a) !== b) fail(m, a && E.dstr(a), b); };
chk(E.dparse('12.000'), '12000', 'pontos ezres tagolás');
chk(E.dparse('12 000 Ft'), '12000', 'mértékegység');
chk(E.dparse('12,5%'), '12,5', 'százalékjel');
chk(E.dparse('8.4'), '8,4', 'tizedespont');
chk(E.dparse('240 Ft-ot'), '240', 'toldalék');

console.log('ellenőrzött feladat:', count, 'hibás:', bad);
process.exit(bad ? 1 : 0);
