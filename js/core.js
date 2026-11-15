/* Core: utilities, state, saving, cloud sync, spaced repetition, progress. */
(function () {
  'use strict';
  const AP = (window.AP = {});
  const LESSONS = window.LESSONS.sort((a, b) => a.day - b.day);
  const TICKETS = window.TICKETS, DECKS = window.DECKS;
  Object.assign(AP, { LESSONS, TICKETS, DECKS });
  AP.PLAN_DAYS = 28;

  /* ---------- utils ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sample = (a, n) => shuffle(a).slice(0, n);
  const DAY = 864e5;
  const todayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const fmtMin = (sec) => { const m = Math.round(sec / 60); return m >= 60 ? Math.floor(m / 60) + 'h ' + String(m % 60).padStart(2, '0') + 'm' : m + 'm'; };
  const ICON = {
    home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/><path d="M9 7h6"/></svg>',
    target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/></svg>',
    cards: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 012 2v12"/></svg>',
    user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    map: '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M12 7v4M12 11l-6 5M12 11l6 5"/></svg>',
    bolt: '<svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
    redo: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 0115-6.7L21 8"/><path d="M21 3v5h-5"/></svg>',
    flag: '<svg viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>',
    ticket: '<svg viewBox="0 0 24 24"><path d="M3 8a2 2 0 002-2h14a2 2 0 002 2v2a2 2 0 000 4v2a2 2 0 00-2 2H5a2 2 0 00-2-2v-2a2 2 0 000-4z"/><path d="M14 6v12" stroke-dasharray="2 2"/></svg>',
    exam: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
    chip: '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>'
  };
  Object.assign(AP, { $, $$, esc, shuffle, sample, DAY, todayKey, fmtMin, ICON });

  /* ---------- toast / modal ---------- */
  AP.toast = (html, kind) => { const t = document.createElement('div'); t.className = 'toast ' + (kind || ''); t.innerHTML = html; $('#toasts').appendChild(t); setTimeout(() => t.remove(), 3200); };
  AP.modal = (html) => { $('#modal-card').innerHTML = html; $('#modal').hidden = false; };
  AP.closeModal = () => { $('#modal').hidden = true; $('#modal-card').innerHTML = ''; };

  /* ---------- state ---------- */
  const SAVE_KEY = 'aplus-prep-v1';
  const fresh = () => ({ v: 1, savedAt: 0, start: todayKey(), exam1: '', exam2: '', goal: 120, font: 16, welcomed: false, ex: {}, les: {}, srs: {}, days: {}, tk: {}, mocks: {}, mist: [], log: {}, flags: [] });
  function load() { try { const o = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); return o && o.v ? Object.assign(fresh(), o) : null; } catch (e) { return null; } }
  let S = load() || fresh();
  AP.S = () => S;
  AP.setState = (o) => { S = Object.assign(fresh(), o); saveLocal(); };
  function saveLocal() { S.savedAt = Date.now(); try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ } }
  AP.save = (now) => { saveLocal(); AP.cloud.push(!!now); };
  AP.isFresh = (o) => !o || (!Object.keys(o.ex || {}).length && !Object.keys(o.srs || {}).length && !Object.keys(o.log || {}).length);
  AP.packSave = () => 'AP1.' + btoa(unescape(encodeURIComponent(JSON.stringify(S))));
  AP.unpackSave = (code) => { try { const o = JSON.parse(decodeURIComponent(escape(atob(code.trim().slice(4))))); return o && o.v ? o : null; } catch (e) { return null; } };
  AP.resetLocal = () => { S = fresh(); S.welcomed = true; saveLocal(); };

  /* ---------- day / plan ---------- */
  AP.rawDay = () => { const st = new Date(S.start + 'T00:00:00'); return Math.floor((new Date().setHours(0, 0, 0, 0) - st.getTime()) / DAY) + 1; };
  AP.curDay = () => Math.max(1, Math.min(AP.PLAN_DAYS, AP.rawDay()));
  AP.dayRec = (n) => (S.days[n] = S.days[n] || { blocks: {}, sec: 0 });
  AP.BLOCKS = [
    { k: 'learn', t: 'Learn the objectives', m: 40 },
    { k: 'practice', t: 'Practice questions', m: 30 },
    { k: 'cards', t: 'Flashcards', m: 20 },
    { k: 'lab', t: 'Ticket lab / PBQ', m: 20 },
    { k: 'review', t: 'Fix mistakes + recall', m: 10 }
  ];
  AP.markBlock = (k) => { const r = AP.dayRec(AP.curDay()); if (!r.blocks[k]) { r.blocks[k] = true; AP.save(); AP.toast('Block done: <b>' + AP.BLOCKS.find((b) => b.k === k).t + '</b>', 'ok'); } };

  /* ---------- active-time tracking ---------- */
  let lastAct = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((e) => addEventListener(e, () => { lastAct = Date.now(); }, { passive: true }));
  setInterval(() => {
    if (document.hidden || Date.now() - lastAct > 120000 || !S.welcomed) return;
    const k = todayKey(); S.log[k] = (S.log[k] || 0) + 15; AP.dayRec(AP.curDay()).sec += 15;
    if ((S.log[k] % 60) === 0) saveLocal();
    if ((S.log[k] % 300) === 0) AP.cloud.push(false);
  }, 15000);
  AP.streak = () => { let n = 0; const d = new Date(); if ((S.log[todayKey(d)] || 0) < 1800) d.setDate(d.getDate() - 1); while ((S.log[todayKey(d)] || 0) >= 1800) { n++; d.setDate(d.getDate() - 1); } return n; };
  AP.totalSec = () => Object.values(S.log).reduce((a, b) => a + b, 0);

  /* ---------- exercises ---------- */
  // ['m', q, opts, correctIdx, why]  ['mm', q, opts, [idx..], why]  ['f', q, ans|[ans], why, hint]
  // ['s', prompt, [steps in order], why]  ['x', prompt, [[left,right]..], why]  ['t', statement, bool, why]
  function normEx(t, id, meta) {
    const o = { id, src: meta };
    // Authoring shortcut: when no index is given, the first option is correct (options are shuffled on screen).
    if (t[0] === 'm') { const hasIdx = typeof t[3] === 'number'; Object.assign(o, { t: 'mcq', q: t[1], opts: t[2], a: t[2][hasIdx ? t[3] : 0], why: hasIdx ? t[4] : t[3] }); }
    else if (t[0] === 't') Object.assign(o, { t: 'mcq', q: t[1], opts: ['True', 'False'], a: t[2] ? 'True' : 'False', why: t[3], tf: true });
    else if (t[0] === 'mm') { const hasIdx = Array.isArray(t[3]); const n = /THREE/.test(t[1]) ? 3 : 2; Object.assign(o, { t: 'multi', q: t[1], opts: t[2], a: hasIdx ? t[3].map((i) => t[2][i]) : t[2].slice(0, n), why: hasIdx ? t[4] : t[3] }); }
    else if (t[0] === 'f') Object.assign(o, { t: 'fill', q: t[1], a: [].concat(t[2]), why: t[3], hint: t[4] });
    else if (t[0] === 's') Object.assign(o, { t: 'seq', q: t[1], lines: t[2], why: t[3] });
    else if (t[0] === 'x') Object.assign(o, { t: 'match', q: t[1], pairs: t[2], why: t[3] });
    return o;
  }
  const EX = {};
  LESSONS.forEach((L) => L.ex.forEach((t, i) => { const id = 'L' + L.day + '-' + i; EX[id] = normEx(t, id, { lesson: L.day, exam: L.exam, dom: L.dom }); }));
  TICKETS.forEach((s) => s.q.forEach((t, i) => { const id = 'T' + s.id + '-' + i; EX[id] = normEx(t, id, { ticket: s.id, exam: s.exam, dom: s.dom }); }));
  AP.EX = EX;
  AP.lessonEx = (day) => Object.values(EX).filter((e) => e.src.lesson === day);
  AP.ticketEx = (tid) => Object.values(EX).filter((e) => e.src.ticket === tid);
  AP.lesson = (d) => LESSONS.find((l) => l.day === +d);
  AP.ticket = (id) => TICKETS.find((s) => s.id === id);

  AP.record = (ex, score) => {
    const r = (S.ex[ex.id] = S.ex[ex.id] || { c: 0, w: 0 });
    if (score >= 1) r.c++; else r.w++;
    r.t = Date.now(); r.ok = score >= 1;
    if (score < 1) { S.mist = [ex.id].concat(S.mist.filter((x) => x !== ex.id)).slice(0, 300); }
    else if (ex._review) S.mist = S.mist.filter((x) => x !== ex.id);
  };
  AP.weight = (id) => { const r = S.ex[id]; if (!r) return 2; return 1 + r.w * 1.5 - r.c * 0.4 + (r.ok ? 0 : 2); };
  AP.pickWeighted = (list, n) => list.map((e) => ({ e, k: Math.random() * Math.max(0.3, AP.weight(e.id)) })).sort((a, b) => b.k - a.k).slice(0, n).map((x) => x.e);

  /* ---------- answer checking ---------- */
  const normA = (s) => String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”"]/g, '').replace(/\s+/g, ' ').trim().replace(/[.;!?]+$/, '');
  const normB = (s) => normA(s).replace(/[\s\-_.]/g, '');
  function lev(a, b) { if (Math.abs(a.length - b.length) > 3) return 9; const m = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) m[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return m[a.length][b.length]; }
  AP.check = (input, answers) => {
    const A = normA(input), B = normB(input);
    if (!A) return { score: 0, best: answers[0], note: 'empty' };
    for (const a of answers) if (normA(a) === A || normB(a) === B) return { score: 1, best: a };
    let best = answers[0], bd = 99;
    for (const a of answers) { const d = lev(normB(a), B); if (d < bd) { bd = d; best = a; } }
    if (bd === 1 && normB(best).length > 6 && !/^\d+$/.test(normB(best))) return { score: 0.5, best, note: 'typo' };
    return { score: 0, best };
  };
  AP.normA = normA; AP.normB = normB;

  /* ---------- lessons: mastery ---------- */
  const REV = [1, 3, 7, 14];
  AP.lesRec = (d) => (S.les[d] = S.les[d] || { seen: 0, best: 0, tries: 0, pass: [] });
  AP.lessonResult = (d, pct) => {
    const r = AP.lesRec(d); r.tries++; r.best = Math.max(r.best, pct); r.last = Date.now(); r.lastPct = pct;
    if (pct >= 80) { const k = todayKey(); if (!r.pass.includes(k)) r.pass.push(k); }
    AP.save(true);
  };
  AP.mastery = (d) => { const r = S.les[d]; if (!r || !r.seen) return 0; if (!r.tries) return 1; if (r.best < 80) return 2; return r.pass.length >= 2 ? 4 : 3; };
  AP.nextReview = (d) => { const r = S.les[d]; if (!r || !r.pass.length) return null; const n = r.pass.length; if (n > REV.length) return null; const last = new Date(r.pass[n - 1] + 'T00:00:00'); return new Date(last.getTime() + REV[n - 1] * DAY); };
  AP.dueReviews = () => LESSONS.filter((L) => { const n = AP.nextReview(L.day); return n && n.getTime() <= Date.now(); });
  AP.MASTERY = ['Not started', 'Introduced', 'Developing', 'Exam-ready', 'Retained'];
  AP.masteryDots = (m) => `<span class="mastery ${m === 4 ? 'm4' : ''}" title="${AP.MASTERY[m]}">${[1, 2, 3, 4].map((i) => `<i class="${i <= m ? 'on' : ''}"></i>`).join('')}</span>`;

  /* ---------- domains ---------- */
  AP.DOMAINS = {
    1: [['1.0', 'Mobile Devices', 13], ['2.0', 'Networking', 23], ['3.0', 'Hardware', 25], ['4.0', 'Virtualization & Cloud', 11], ['5.0', 'HW & Network Troubleshooting', 28]],
    2: [['1.0', 'Operating Systems', 28], ['2.0', 'Security', 28], ['3.0', 'Software Troubleshooting', 23], ['4.0', 'Operational Procedures', 21]]
  };
  AP.domStats = (exam) => AP.DOMAINS[exam].map(([code, name, w]) => {
    let c = 0, n = 0, total = 0;
    Object.values(EX).forEach((e) => { if (e.src.exam === exam && e.src.dom === code) { total++; const r = S.ex[e.id]; if (r) { n++; if (r.ok) c++; } } });
    return { code, name, w, seen: n, total, acc: n ? Math.round((c / n) * 100) : null, cover: total ? Math.round((n / total) * 100) : 0 };
  });
  AP.readiness = (exam) => { const ds = AP.domStats(exam); let s = 0, wt = 0; ds.forEach((d) => { wt += d.w; s += d.w * ((d.acc || 0) / 100) * Math.min(1, d.cover / 70); }); return Math.round((s / wt) * 100); };
  AP.scaled = (pct) => Math.round(100 + pct * 8);

  /* ---------- flashcards (Leitner) ---------- */
  const IV = [0, 1, 2, 4, 8, 16, 35];
  AP.deck = (id) => DECKS[id];
  AP.allDecks = () => Object.values(DECKS);
  AP.deckStats = (d) => { let n = 0, due = 0, learned = 0; d.cards.forEach((c) => { const r = S.srs[c.id]; if (!r) n++; else { if (r.due <= Date.now()) due++; if (r.b >= 3) learned++; } }); return { new: n, due, learned, total: d.cards.length }; };
  AP.rate = (c, g) => {
    const r = (S.srs[c.id] = S.srs[c.id] || { b: 0, due: 0, n: 0 }); r.n++;
    if (g === 0) r.b = 0; else if (g === 2) r.b = Math.min(6, r.b + 1); else if (g === 3) r.b = Math.min(6, r.b + 2);
    const days = g === 0 ? 0 : g === 1 ? Math.max(1, IV[r.b] / 2) : IV[r.b];
    r.due = g === 0 ? Date.now() + 60000 : new Date().setHours(4, 0, 0, 0) + days * DAY;
  };

  /* ---------- cloud save ----------
     Two backends, chosen automatically:
     1. 'claude'   : opened as a claude.ai artifact -> per-person doc in the artifact db (no password).
     2. 'supabase' : opened anywhere else (GitHub Pages, phone home screen) -> name + password account,
                     Supabase RPCs ap_register / ap_login / ap_load / ap_save / ap_logout (publishable key). */
  const SB = { url: 'https://cvgzypgaabjwunrfzmlr.supabase.co', key: 'sb_publishable_LXFQVsj-5f6wiTAqMeqy2g_zyplMHlT', store: 'aplus-prep-cloud' };
  const cs = { busy: false, lastTry: -1e9, err: '', pending: false, ready: false, mode: 'supabase' };
  let ref = null, cloud = null;
  try { cloud = JSON.parse(localStorage.getItem(SB.store) || 'null'); } catch (e) { cloud = null; }
  const storeCloud = () => { if (cs.mode !== 'supabase') return; try { if (cloud) localStorage.setItem(SB.store, JSON.stringify(cloud)); else localStorage.removeItem(SB.store); } catch (e) { /* */ } };
  const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
  async function rpc(fn, args, keepalive) {
    const r = await fetch(SB.url + '/rest/v1/rpc/' + fn, { method: 'POST', keepalive: !!keepalive, headers: { 'Content-Type': 'application/json', apikey: SB.key, Authorization: 'Bearer ' + SB.key }, body: JSON.stringify(args) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }
  const ERR = { name: 'Name: 3 to 20 letters, numbers, dashes or underscores.', password: 'Password needs at least 6 characters.', taken: 'That name is taken. Pick another, or sign in if it is yours.', invalid: 'Wrong name or password.', locked: 'Too many wrong tries. Wait 10 minutes.', busy: 'Too many new accounts right now. Try again later.', size: 'Progress data is too large to store.' };
  // Inside claude.ai the page is served from claude's own origin; window.claude.use exists only there.
  const inClaude = () => !!(window.claude && typeof window.claude.use === 'function');
  async function connectClaude() {
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!db || !user) return null;
      const id = await user.id(); if (!id) return null;
      return db.collection('data/users/' + id).doc('progress');
    } catch (e) { return null; }
  }
  async function doPush(keepalive) {
    if (!cloud) return false;
    cs.busy = true; cs.lastTry = performance.now(); let ok = false;
    try {
      if (cs.mode === 'claude') { await withTimeout(ref.set({ s: JSON.stringify(S), at: S.savedAt || Date.now() }), 10000); ok = true; }
      else {
        const r = await rpc('ap_save', { p_token: cloud.token, p_data: S }, keepalive);
        if (r.ok) ok = true;
        else if (r.error === 'session') { cloud = null; storeCloud(); AP.toast('Signed out of cloud save. Sign in again from Me.', 'bad'); }
        else cs.err = 'Cloud refused the save (' + r.error + ').';
      }
      if (ok) { cloud.at = Date.now(); cs.err = ''; storeCloud(); }
    } catch (e) { cs.err = 'Could not reach cloud save. Progress is still saved on this device.'; }
    cs.busy = false; AP.onSync && AP.onSync(); return ok;
  }
  AP.cloud = {
    get: () => cloud, status: () => cs, mode: () => cs.mode, inClaude,
    push(now) { if (!cloud || cs.busy) return; if (!now && performance.now() - cs.lastTry < 20000) { if (!cs.pending) { cs.pending = true; setTimeout(() => { cs.pending = false; AP.cloud.push(true); }, 20000); } return; } doPush(false); },
    sync: () => doPush(false),
    async auth(fn, name, pass) {
      name = (name || '').trim().toLowerCase();
      if (!/^[a-z0-9_-]{3,20}$/.test(name)) return { ok: false, msg: ERR.name };
      if ((pass || '').length < 6) return { ok: false, msg: ERR.password };
      saveLocal();
      let r; try { r = await rpc(fn === 'register' ? 'ap_register' : 'ap_login', fn === 'register' ? { p_name: name, p_pass: pass, p_data: S } : { p_name: name, p_pass: pass }); } catch (e) { return { ok: false, msg: 'Could not reach the cloud. Check your connection.' }; }
      if (!r.ok) return { ok: false, msg: ERR[r.error] || 'Something went wrong (' + r.error + ').' };
      cloud = { name: r.name, token: r.token, at: Date.now() }; storeCloud();
      return { ok: true, data: r.data || null, name: r.name };
    },
    async logout() { const t = cloud && cloud.token; cloud = null; storeCloud(); if (t) rpc('ap_logout', { p_token: t }).catch(() => {}); },
    async boot() {
      try {
        if (inClaude()) {
          cs.mode = 'claude'; cloud = null;
          ref = await withTimeout(connectClaude(), 11000);
          cs.ready = true;
          if (!ref) return 'none';
          cloud = { name: 'your Claude account', at: 0 };
          const snap = await withTimeout(ref.get(), 10000);
          const d = snap && (typeof snap.data === 'function' ? snap.data() : snap);
          if (d && d.s) {
            const o = JSON.parse(d.s); cloud.at = d.at || 0;
            if (o && o.v && (o.savedAt || 0) > (S.savedAt || 0) + 2000) { S = Object.assign(fresh(), o); try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* */ } return 'pulled'; }
          }
          if (S.welcomed) doPush();
          return 'ok';
        }
        cs.ready = true;
        if (!cloud) return 'none';
        const r = await withTimeout(rpc('ap_load', { p_token: cloud.token }), 8000);
        if (!r.ok) { cloud = null; storeCloud(); return 'expired'; }
        if (r.data && (r.data.savedAt || 0) > (S.savedAt || 0) + 2000) { S = Object.assign(fresh(), r.data); try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* */ } return 'pulled'; }
        return 'ok';
      } catch (e) { cs.ready = true; cs.err = 'Cloud save unavailable right now.'; return 'offline'; }
    }
  };
  const leaving = () => { saveLocal(); if (cloud) doPush(true); };
  addEventListener('visibilitychange', () => { if (document.hidden) leaving(); });
  addEventListener('pagehide', leaving);
})();
