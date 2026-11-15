/* Pages, router, boot. */
(function () {
  'use strict';
  const AP = window.AP, { $, $$, esc, shuffle, sample, ICON, LESSONS, TICKETS } = AP;
  const main = $('#main');
  const S = () => AP.S();

  /* ---------- shell ---------- */
  const NAV = [['#/', 'Today', 'home'], ['#/lessons', 'Lessons', 'book'], ['#/practice', 'Practice', 'target'], ['#/cards', 'Cards', 'cards'], ['#/me', 'Me', 'user']];
  const NAV_EXTRA = [['#/tickets', 'Ticket lab', 'ticket'], ['#/mocks', 'Mock exams', 'exam'], ['#/maps', 'Concept maps', 'map'], ['#/exam', 'Exam guide', 'info']];
  function shell(active) {
    $('#tabs').innerHTML = NAV.map(([h, t, i]) => `<a href="${h}" class="${active === h ? 'on' : ''}">${ICON[i]}<span>${t}</span></a>`).join('');
    $('#nav').innerHTML = NAV.map(([h, t, i]) => `<a href="${h}" class="${active === h ? 'on' : ''}">${ICON[i]}${t}</a>`).join('') + '<div class="sep"></div>' + NAV_EXTRA.map(([h, t, i]) => `<a href="${h}" class="${active === h ? 'on' : ''}">${ICON[i]}${t}</a>`).join('');
    topRight();
  }
  function topRight() {
    const c = AP.cloud.get(), cs = AP.cloud.status(), sec = S().log[AP.todayKey()] || 0, goal = (S().goal || 120) * 60;
    $('#top-right').innerHTML = `<span class="pill ${sec >= goal ? 'ok' : 'gold'}" title="Active study time today">${AP.fmtMin(sec)} / ${AP.fmtMin(goal)}</span><a href="#/me" class="icon-btn" title="${c ? 'Cloud save: ' + esc(c.name) : 'Saved on this device only'}"><span class="sync-dot ${c ? (cs.err ? 'err' : 'on') : ''}"></span></a>`;
    $('#side-foot').innerHTML = c ? `Syncing to <b>${esc(c.name)}</b>${cs.err ? '<br><span style="color:var(--bad)">sync issue</span>' : ''}` : 'Progress saved on this device.<br><a href="#/me">Turn on sync →</a>';
  }
  AP.onSync = topRight;
  setInterval(() => { if (!document.hidden) topRight(); }, 30000);
  function setTop(title, back) { $('#top-title').textContent = title; const b = $('#back'); b.hidden = !back; b.onclick = () => { if (typeof back === 'string') location.hash = back; else history.back(); }; document.title = title + ' · CompTIA A+ Prep'; }

  /* ---------- concept markup ---------- */
  // <tb>h;h\nr;r</tb> table · <f>term</f> mono · <n>tip</n> · <t>trap</t> · <k>exam key fact</k>
  function renderConcept(h) {
    h = h.replace(/<tb>([\s\S]*?)<\/tb>/g, (_, body) => {
      const rows = body.trim().split('\n').map((r) => r.split(';'));
      return `<div class="tbl-wrap"><table><thead><tr>${rows[0].map((c) => `<th>${c.trim()}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map((r) => `<tr>${r.map((c) => `<td>${c.trim()}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    });
    h = h.replace(/<f>([\s\S]*?)<\/f>/g, '<code>$1</code>');
    h = h.replace(/<n>([\s\S]*?)<\/n>/g, '<div class="note tip">$1</div>').replace(/<t>([\s\S]*?)<\/t>/g, '<div class="note trap">$1</div>').replace(/<k>([\s\S]*?)<\/k>/g, '<div class="note" style="border-left-color:var(--blue)"><b style="color:var(--blue)">Know cold · </b>$1</div>');
    return h;
  }
  function renderMap(m) {
    const node = (n, lvl) => {
      const [label, small, kids] = n; const has = kids && kids.length;
      return `<li><span class="node ${lvl === 0 ? 'root' : lvl === 1 ? 'l1' : ''} ${has && lvl > 0 ? 'tog' : ''}"><span>${esc(label)}</span>${has && lvl > 0 ? '<span class="chev">▾</span>' : ''}${small ? `<small>${esc(small)}</small>` : ''}</span>${has ? `<ul>${kids.map((k) => node(k, lvl + 1)).join('')}</ul>` : ''}</li>`;
    };
    return `<div class="cmap"><ul>${node(m, 0)}</ul></div>`;
  }
  function bindMap(root) { $$('.node.tog', root).forEach((n) => (n.onclick = () => { const li = n.parentNode; li.classList.toggle('closed'); n.querySelector('.chev').textContent = li.classList.contains('closed') ? '▸' : '▾'; })); }
  $('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') AP.closeModal(); });
  const domName = (exam, code) => { const d = AP.DOMAINS[exam].find((x) => x[0] === code); return d ? d[0] + ' ' + d[1] : code; };
  const countdown = (iso) => { if (!iso) return null; const d = Math.ceil((new Date(iso + 'T00:00:00') - new Date().setHours(0, 0, 0, 0)) / AP.DAY); return d; };

  /* ======================= TODAY ======================= */
  function blockLinks(k, d) {
    const L = AP.lesson(d), tk = TICKETS.filter((t) => t.day <= d).pop() || TICKETS[0];
    const a = (h, t, pri) => `<a class="btn sm ${pri ? 'pri' : ''}" href="${h}">${t}</a>`;
    const mist = S().mist.filter((id) => AP.EX[id]).length;
    return {
      learn: [`Day ${d}: ${L.title}`, a(`#/lesson/${d}`, 'Learn', 1) + a(`#/lesson/${d}/map`, 'Concept map')],
      practice: [`${AP.lessonEx(d).length} questions on today's objectives. Aim for 80%+.`, a(`#/lesson/${d}/practice`, 'Practice', 1) + a('#/quiz?mode=mixed', 'Mixed review')],
      cards: [`Deck: ${AP.deck(L.deck).name}, then everything due.`, a(`#/cards/${L.deck}`, 'Today\'s deck', 1) + a('#/cards/all', 'All due') + a('#/cards/ports', 'Ports')],
      lab: [`Ticket: ${tk.title}`, a(`#/ticket/${tk.id}`, 'Work the ticket', 1) + a('#/quiz?mode=pbq', 'PBQ drill')],
      review: [mist ? `${mist} open mistakes. Clear 10.` : 'Write the 5 facts you will most likely forget, from memory.', a('#/quiz?mode=mistakes', 'Fix mistakes', 1) + a('#/quiz?mode=flagged', 'Flagged')]
    }[k];
  }
  function pageToday() {
    setTop('Today'); const st = S(), raw = AP.rawDay(), d = AP.curDay(), L = AP.lesson(d), rec = AP.dayRec(d);
    const sec = st.log[AP.todayKey()] || 0, goal = (st.goal || 120) * 60, due = AP.dueReviews(), mist = st.mist.filter((id) => AP.EX[id]).length;
    const dueCards = AP.allDecks().reduce((a, dk) => a + AP.deckStats(dk).due, 0);
    let hero;
    if (raw < 1) hero = `<div class="eyebrow">Starts ${new Date(st.start + 'T00:00:00').toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</div><h1>Get ready</h1><p class="dim">Your plan has not started yet. Day 1 is below so you can preview it.</p>`;
    else if (raw > AP.PLAN_DAYS) hero = `<div class="eyebrow">Plan complete · day ${raw}</div><h1>Exam mode</h1><p class="dim">Daily now: due cards, lesson retests, one ticket, and a mock every second day until you hit 750+ twice. Then book it.</p>`;
    else hero = `<div class="eyebrow">Day ${d} of ${AP.PLAN_DAYS} · Core ${L.exam} · ${esc(domName(L.exam, L.dom))}</div><h1>${esc(L.title)}</h1>`;
    const blocks = AP.BLOCKS.map((b) => { const [desc, links] = blockLinks(b.k, d); const on = !!rec.blocks[b.k]; return `<div class="block"><button class="tick ${on ? 'on' : ''}" data-k="${b.k}" aria-label="Mark done">${ICON.check}</button><div style="flex:1;min-width:0"><div class="row between"><span class="bt">${b.t}</span><span class="bm">${b.m} min</span></div><div class="bd">${esc(desc)}</div><div class="row" style="gap:6px">${links}</div></div></div>`; }).join('');
    const doneN = AP.BLOCKS.filter((b) => rec.blocks[b.k]).length;
    const grid = LESSONS.map((l) => { const m = AP.mastery(l.day); const r = st.days[l.day]; const comp = r ? AP.BLOCKS.filter((b) => r.blocks[b.k]).length : 0; const cls = m >= 3 && comp >= 4 ? 'd3' : comp >= 3 || m >= 3 ? 'd2' : comp || m ? 'd1' : ''; return `<a href="#/lesson/${l.day}" class="${cls} ${l.day === d && raw >= 1 && raw <= AP.PLAN_DAYS ? 'cur' : ''}" title="Day ${l.day}: ${esc(l.title)}">${l.day}</a>`; }).join('');
    const c1 = countdown(st.exam1), c2 = countdown(st.exam2);
    const exams = [[1, c1], [2, c2]].map(([n, c]) => `<div class="card tight stat"><b>${c == null ? '–' : c < 0 ? 'done' : c}</b><span>${c == null ? `<a href="#/me">set Core ${n} date</a>` : c < 0 ? 'Core ' + n + ' exam passed' : 'days to Core ' + n}</span></div>`).join('');
    main.innerHTML = `<div class="hero">${hero}</div>
      ${L.mock && raw >= 1 ? `<a class="tile today" href="#/mock/${L.mock}" style="margin-bottom:14px"><div class="k">Mock exam day</div><div class="t">${esc(MOCKS[L.mock].title)}</div><div class="s">${esc(MOCKS[L.mock].desc)}${st.mocks[L.mock] ? ' · best ' + st.mocks[L.mock].best : ''}</div></a>` : ''}
      <div class="card"><div class="row between"><h3 style="margin:0">Today's ${AP.fmtMin(goal)}</h3><span class="pill ${doneN === 5 ? 'ok' : ''}">${doneN}/5 blocks</span></div>
        <div style="margin:12px 0 4px" class="row between"><span class="dim" style="font-size:13px">Active time: <b style="color:var(--tx)">${AP.fmtMin(sec)}</b></span><span class="dim" style="font-size:13px">${Math.min(100, Math.round((sec / goal) * 100))}%</span></div>
        <div class="progress ${sec >= goal ? 'ok' : ''}"><i style="width:${Math.min(100, (sec / goal) * 100)}%"></i></div>
        <div style="margin-top:8px">${blocks}</div></div>
      ${due.length || mist || dueCards ? `<div class="card"><h3>Reviews due</h3>
        ${due.map((l) => `<div class="list-row"><div class="grow"><b>Retest Day ${l.day}</b><div class="dim" style="font-size:13px">${esc(l.title)}</div></div><a class="btn sm pri" href="#/lesson/${l.day}/retest">Retest</a></div>`).join('')}
        ${dueCards ? `<div class="list-row"><div class="grow"><b>${dueCards} flashcards due</b></div><a class="btn sm" href="#/cards/all">Review</a></div>` : ''}
        ${mist ? `<div class="list-row"><div class="grow"><b>${mist} open mistakes</b><div class="dim" style="font-size:13px">Get each one right to clear it</div></div><a class="btn sm" href="#/quiz?mode=mistakes">Fix them</a></div>` : ''}</div>` : ''}
      <div class="grid g3">${exams}<div class="card tight stat"><b>${AP.readiness(1)}%</b><span>Core 1 readiness</span></div><div class="card tight stat"><b>${AP.readiness(2)}%</b><span>Core 2 readiness</span></div></div>
      <div class="card"><div class="row between"><h3 style="margin:0">${AP.PLAN_DAYS}-day map</h3><span class="dim" style="font-size:12px">1–14 Core 1 · 15–28 Core 2</span></div><div class="days" style="margin-top:12px;grid-template-columns:repeat(7,1fr)">${grid}</div>
        <div class="row" style="margin-top:12px;gap:14px;font-size:12px;color:var(--tx3)"><span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:#0f1a18"></i> started</span><span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:#13302b"></i> practised</span><span><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:#12251a"></i> solid</span></div></div>
      <div class="grid g3"><div class="card tight stat"><b>${AP.streak()}</b><span>day streak (30m+)</span></div><div class="card tight stat"><b>${AP.fmtMin(AP.totalSec())}</b><span>total study time</span></div></div>`;
    $$('.tick', main).forEach((t) => (t.onclick = () => { const r = AP.dayRec(d); r.blocks[t.dataset.k] = !r.blocks[t.dataset.k]; AP.save(); pageToday(); }));
  }

  /* ======================= LESSONS ======================= */
  function pageLessons() {
    setTop('Lessons'); const d = AP.curDay();
    const tile = (l) => { const m = AP.mastery(l.day), r = S().les[l.day]; return `<a class="tile ${l.day === d ? 'today' : ''} ${m >= 3 ? 'done' : ''}" href="#/lesson/${l.day}"><div class="row between"><span class="k">Day ${l.day} · ${esc(l.dom)}${l.mock ? ' · mock' : ''}</span>${AP.masteryDots(m)}</div><div class="t">${esc(l.title)}</div><div class="s">${esc(l.obj)}${r && r.tries ? ' · best ' + r.best + '%' : ''}</div></a>`; };
    main.innerHTML = `<div class="hero"><div class="eyebrow">28 days · 220-1201 then 220-1202</div><h1>Lessons</h1><p class="dim">Each day: objectives explained, exam traps, a concept map, ${'~'}18 practice questions (MCQ, multi-select, fill-in, ordering, PBQ matching), a flashcard deck and a help-desk ticket.</p></div>
      <h3>Core 1 · 220-1201</h3><div class="grid g2">${LESSONS.filter((l) => l.exam === 1).map(tile).join('')}</div>
      <h3>Core 2 · 220-1202</h3><div class="grid g2">${LESSONS.filter((l) => l.exam === 2).map(tile).join('')}</div>`;
  }
  function pageLesson(day, tab) {
    const L = AP.lesson(day); if (!L) return notFound();
    tab = tab || 'learn';
    setTop('Day ' + L.day + ' · Core ' + L.exam, '#/lessons');
    const rec = AP.lesRec(L.day);
    if (tab === 'retest') return startLessonSet(L, 'retest');
    const tabs = [['learn', 'Learn'], ['map', 'Concept map'], ['practice', 'Practice'], ['cards', 'Cards'], ['ticket', 'Ticket']];
    let body = '';
    if (tab === 'learn') {
      if (!rec.seen) { rec.seen = Date.now(); AP.save(); }
      body = `<div class="card"><h4>Objectives covered</h4><p class="dim" style="margin:0 0 8px">${esc(L.obj)}</p><h4>By the end you can</h4><ul style="margin:0;padding-left:1.2em">${L.goals.map((g) => `<li>${esc(g)}</li>`).join('')}</ul></div>
        <div class="concept">${renderConcept(L.concept)}</div>
        <hr><div class="row"><a class="btn pri" href="#/lesson/${L.day}/practice">Practice now ${ICON.next}</a><a class="btn" href="#/lesson/${L.day}/map">Concept map</a><a class="btn ghost" href="#/cards/${L.deck}">Flashcards</a></div>`;
      if (!rec.read) setTimeout(() => { const r = AP.lesRec(L.day); if (!r.read && location.hash.startsWith('#/lesson/' + L.day)) { r.read = Date.now(); if (L.day === AP.curDay()) AP.markBlock('learn'); } }, 240000);
    } else if (tab === 'map') {
      body = `<p class="dim">Tap a branch to fold it. Cover the right side with your thumb and recall each item before you read it.</p>${renderMap(L.map)}`;
    } else if (tab === 'practice') {
      const exs = AP.lessonEx(L.day), m = AP.mastery(L.day), nr = AP.nextReview(L.day);
      const cnt = (t) => exs.filter((e) => e.t === t).length;
      body = `<div class="card"><div class="row between"><div><div class="eyebrow">Mastery</div><div class="row">${AP.masteryDots(m)} <b>${AP.MASTERY[m]}</b></div></div><div style="text-align:right"><div class="eyebrow">Best</div><b>${rec.best || 0}%</b></div></div>
          <p class="dim" style="margin-bottom:0">80%+ = exam-ready. Pass again on a later day (retests at 1, 3, 7, 14 days) to reach Retained.${nr ? ' Next retest: <b>' + nr.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + '</b>.' : ''}</p></div>
        <div class="grid g2">
          <button class="tile" data-set="full"><div class="k">${exs.length} questions</div><div class="t">Full set</div><div class="s">All types, shuffled. Counts toward mastery.</div></button>
          <button class="tile" data-set="quick"><div class="k">10 questions</div><div class="t">Quick 10</div><div class="s">Weighted toward your weak items.</div></button>
          ${cnt('mcq') ? `<button class="tile" data-set="mcq"><div class="k">${cnt('mcq')}</div><div class="t">Multiple choice</div><div class="s">Single answer, like most exam items.</div></button>` : ''}
          ${cnt('multi') ? `<button class="tile" data-set="multi"><div class="k">${cnt('multi')}</div><div class="t">Multi-select</div><div class="s">"Choose two / three". All or nothing.</div></button>` : ''}
          ${cnt('fill') ? `<button class="tile" data-set="fill"><div class="k">${cnt('fill')}</div><div class="t">Recall</div><div class="s">Type ports, commands and terms.</div></button>` : ''}
          ${cnt('seq') + cnt('match') ? `<button class="tile" data-set="pbq"><div class="k">${cnt('seq') + cnt('match')}</div><div class="t">PBQ style</div><div class="s">Ordering and matching.</div></button>` : ''}
        </div>`;
    } else if (tab === 'cards') {
      const dk = AP.deck(L.deck);
      body = `<div class="row" style="margin-bottom:12px"><a class="btn pri" href="#/cards/${dk.id}">${ICON.cards} Study this deck</a><a class="btn" href="#/cards/${dk.id}?cram=1">Cram all</a></div>
        <div class="card">${dk.cards.map((c) => `<div class="list-row"><div class="grow"><b style="font-weight:600">${esc(c.f)}</b><div class="dim" style="font-size:13.5px">${esc(c.b)}</div></div></div>`).join('')}</div>`;
    } else if (tab === 'ticket') {
      const tks = TICKETS.filter((t) => t.day === L.day);
      body = tks.length ? tks.map((t) => `<a class="tile" href="#/ticket/${t.id}" style="margin-bottom:10px"><div class="k">Ticket #${esc(t.id.toUpperCase())} · ${t.q.length} questions</div><div class="t">${esc(t.title)}</div><div class="s">${esc(t.text.slice(0, 110))}…</div></a>`).join('') : '<p class="dim">No ticket for this day. Open the <a href="#/tickets">Ticket lab</a>.</p>';
    }
    main.innerHTML = `<div class="eyebrow">Day ${L.day} · Core ${L.exam} · ${esc(domName(L.exam, L.dom))}</div><h1>${esc(L.title)}</h1>
      <div class="lesson-tabs">${tabs.map(([k, t]) => `<button class="${k === tab ? 'on' : ''}" data-t="${k}">${t}</button>`).join('')}</div><div id="lbody">${body}</div>`;
    $$('.lesson-tabs button', main).forEach((b) => (b.onclick = () => { location.hash = '#/lesson/' + L.day + (b.dataset.t === 'learn' ? '' : '/' + b.dataset.t); }));
    if (tab === 'map') bindMap(main);
    $$('[data-set]', main).forEach((b) => (b.onclick = () => startLessonSet(L, b.dataset.set)));
  }
  function startLessonSet(L, kind) {
    let items = AP.lessonEx(L.day);
    if (kind === 'quick' || kind === 'retest') items = AP.pickWeighted(items, kind === 'retest' ? 12 : 10);
    else if (kind === 'pbq') items = items.filter((e) => e.t === 'seq' || e.t === 'match');
    else if (kind !== 'full') items = items.filter((e) => e.t === kind);
    setTop('Day ' + L.day + ' practice', '#/lesson/' + L.day + '/practice');
    AP.runSet({ el: main, items: shuffle(items), mode: 'lesson', title: `Day ${L.day} · ${kind === 'retest' ? 'retest' : kind}`,
      onResult: (r) => { if (r.quit && r.n < 5) return; if (kind === 'full' || kind === 'quick' || kind === 'retest') AP.lessonResult(L.day, r.pct); if (r.n >= 8) AP.markBlock('practice'); },
      onQuit: () => { location.hash = '#/lesson/' + L.day + '/practice'; } });
  }

  /* ======================= PRACTICE HUB ======================= */
  function pagePractice() {
    setTop('Practice'); const st = S(), d = AP.curDay(), scope = st.scope || 'today';
    const mist = st.mist.filter((id) => AP.EX[id]).length, fl = st.flags.filter((id) => AP.EX[id]).length;
    const t = (h, k, title, s) => `<a class="tile" href="${h}"><div class="k">${k}</div><div class="t">${title}</div><div class="s">${s}</div></a>`;
    main.innerHTML = `<div class="hero"><h1>Practice</h1><p class="dim">Every question explains why after you answer. Wrong answers are saved until you get them right.</p></div>
      <div class="row" style="margin-bottom:14px"><span class="dim" style="font-size:13px">Scope:</span><div class="seg" style="margin:0;flex:0 0 auto">${[['today', 'Days 1–' + d], ['c1', 'Core 1'], ['c2', 'Core 2'], ['all', 'Everything']].map(([k, l]) => `<button data-sc="${k}" class="${scope === k ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      <h3>Quizzes</h3><div class="grid g2">
        ${t('#/quiz?mode=mixed', '20 questions', 'Mixed quiz', 'All types, weighted toward what you miss.')}
        ${t('#/quiz?mode=mistakes', mist + ' saved', 'Mistakes review', 'Every question you missed. Clear them by getting them right.')}
        ${t('#/quiz?mode=flagged', fl + ' flagged', 'Flagged questions', 'The ones you marked with the flag.')}
        ${t('#/quiz?mode=mcq', 'single answer', 'MCQ sprint', '20 multiple-choice questions.')}
        ${t('#/quiz?mode=multi', 'choose 2 or 3', 'Multi-select', '12 all-or-nothing questions.')}
        ${t('#/quiz?mode=fill', 'recall', 'Type it', '15 ports, commands, tools and terms.')}
        ${t('#/quiz?mode=pbq', 'ordering + matching', 'PBQ drill', '8 performance-style tasks.')}
      </div>
      <h3>By domain</h3><div class="grid g2">${[1, 2].map((ex) => AP.DOMAINS[ex].map(([code, name, w]) => t(`#/quiz?exam=${ex}&dom=${code}`, `Core ${ex} · ${code} · ${w}%`, esc(name), '15 questions from this domain only.')).join('')).join('')}</div>
      <h3>Labs and exams</h3><div class="grid g2">
        ${t('#/tickets', TICKETS.length + ' tickets', 'Ticket lab', 'Real help-desk scenarios: diagnose, choose the fix, order the steps.')}
        ${t('#/cards/ports', 'must know', 'Ports & protocols', 'The single highest-yield deck on Core 1.')}
        ${t('#/mocks', '4 exams', 'Mock exams', 'Timed, scored on the 100–900 scale, with a domain breakdown.')}
        ${t('#/maps', LESSONS.length + ' maps', 'Concept maps', 'Every topic as a tree for fast recall.')}
      </div>`;
    $$('[data-sc]', main).forEach((b) => (b.onclick = () => { st.scope = b.dataset.sc; AP.save(); pagePractice(); }));
  }
  function scopePool() {
    const sc = S().scope || 'today', d = AP.curDay();
    return Object.values(AP.EX).filter((e) => e.src.lesson && (sc === 'all' || (sc === 'c1' && e.src.exam === 1) || (sc === 'c2' && e.src.exam === 2) || (sc === 'today' && e.src.lesson <= d)));
  }
  function pageQuiz(q) {
    const mode = q.mode || (q.dom ? 'dom' : 'mixed'); let pool = scopePool(), items, title;
    if (mode === 'mistakes' || mode === 'flagged') {
      const ids = mode === 'mistakes' ? S().mist : S().flags;
      items = ids.map((id) => AP.EX[id]).filter(Boolean).slice(0, 25).map((e) => Object.assign({}, e, { _review: mode === 'mistakes' }));
      title = mode === 'mistakes' ? 'Mistakes review' : 'Flagged questions';
      if (!items.length) { setTop(title, '#/practice'); main.innerHTML = `<div class="empty"><h3>Nothing here yet</h3><p>${mode === 'mistakes' ? 'Every wrong answer lands here until you get it right.' : 'Tap the flag on any question to save it here.'}</p><a class="btn" href="#/practice">Back to practice</a></div>`; return; }
    } else if (mode === 'dom') { pool = Object.values(AP.EX).filter((e) => e.src.exam === +q.exam && e.src.dom === q.dom); items = AP.pickWeighted(pool, 15); title = 'Core ' + q.exam + ' · ' + domName(+q.exam, q.dom); }
    else if (mode === 'mixed') { items = AP.pickWeighted(pool, 20); title = 'Mixed quiz'; }
    else if (mode === 'pbq') { items = AP.pickWeighted(pool.filter((e) => e.t === 'seq' || e.t === 'match'), 8); title = 'PBQ drill'; }
    else { const n = { mcq: 20, multi: 12, fill: 15 }[mode] || 15; items = AP.pickWeighted(pool.filter((e) => e.t === mode), n); title = { mcq: 'MCQ sprint', multi: 'Multi-select', fill: 'Type it' }[mode]; }
    if (!items.length) { setTop(title, '#/practice'); main.innerHTML = '<div class="empty"><p>No questions in this scope yet. Widen the scope on the Practice page.</p><a class="btn" href="#/practice">Back</a></div>'; return; }
    setTop(title, '#/practice');
    AP.runSet({ el: main, items: shuffle(items), title, mode, onResult: (r) => { if ((mode === 'mistakes' || mode === 'flagged') && r.n >= 5) AP.markBlock('review'); if (mode === 'pbq' && r.n >= 5) AP.markBlock('lab'); if (r.n >= 10) AP.markBlock('practice'); }, onQuit: () => { location.hash = '#/practice'; } });
  }

  /* ======================= TICKETS ======================= */
  function pageTickets() {
    setTop('Ticket lab', '#/practice');
    const grp = (ex) => TICKETS.filter((t) => t.exam === ex).map((t) => { const r = S().tk[t.id]; return `<a class="tile ${r >= 80 ? 'done' : ''}" href="#/ticket/${t.id}"><div class="row between"><span class="k">#${esc(t.id.toUpperCase())} · Day ${t.day} · ${esc(t.dom)}</span>${r != null ? `<span class="pill ${r >= 80 ? 'ok' : ''}">${r}%</span>` : ''}</div><div class="t">${esc(t.title)}</div><div class="s">${esc(t.text.slice(0, 90))}…</div></a>`; }).join('');
    main.innerHTML = `<div class="hero"><h1>Ticket lab</h1><p class="dim">Scenario questions are how A+ tests judgment. Read the ticket like a tech: what changed, what is the scope, what is the most likely cause, what do you do first.</p></div>
      <h3>Core 1</h3><div class="grid g2">${grp(1)}</div><h3>Core 2</h3><div class="grid g2">${grp(2)}</div>`;
  }
  function pageTicket(id) {
    const t = AP.ticket(id); if (!t) return notFound();
    setTop('Ticket #' + id.toUpperCase(), '#/tickets');
    const items = AP.ticketEx(id).map((e) => Object.assign({}, e, { ctx: id }));
    AP.runSet({ el: main, items, title: t.title, mode: 'ticket', onResult: (r) => { S().tk[id] = Math.max(S().tk[id] || 0, r.pct); AP.markBlock('lab'); AP.save(true); }, onQuit: () => { location.hash = '#/tickets'; } });
  }

  /* ======================= CARDS ======================= */
  function pageCards() {
    setTop('Flashcards'); const d = AP.curDay(), decks = AP.allDecks();
    const totDue = decks.reduce((a, k) => a + AP.deckStats(k).due, 0);
    const row = (k) => { const s = AP.deckStats(k); return `<a class="list-row" href="#/cards/${k.id}" style="color:var(--tx)"><div class="grow"><div class="row" style="gap:8px">${k.day ? `<span class="tag">day ${k.day}</span>` : '<span class="tag">core</span>'}<b style="font-weight:500">${esc(k.name)}</b></div><div class="dim" style="font-size:12.5px;margin-top:3px">${s.learned}/${s.total} learned · ${s.new} new${s.due ? ` · <span style="color:var(--gold)">${s.due} due</span>` : ''}</div><div class="progress ok" style="margin-top:6px;max-width:260px"><i style="width:${Math.round((s.learned / s.total) * 100)}%"></i></div></div>${ICON.next}</a>`; };
    main.innerHTML = `<div class="hero"><h1>Flashcards</h1><p class="dim">Spaced repetition: cards you know come back less often. Rate honestly. 20 new cards per session.</p></div>
      <div class="row" style="margin-bottom:14px"><a class="btn pri" href="#/cards/all">${ICON.cards} Review all due (${totDue})</a><a class="btn" href="#/cards/${AP.lesson(d).deck}">Today's deck</a></div>
      <h3>High-yield decks</h3><div class="card">${decks.filter((k) => !k.day).map(row).join('')}</div>
      <h3>Daily decks</h3><div class="card">${decks.filter((k) => k.day).sort((a, b) => a.day - b.day).map(row).join('')}</div>`;
  }
  function pageDeck(id, q) {
    if (id === 'all') { const cards = []; AP.allDecks().forEach((k) => k.cards.forEach((c) => { if (S().srs[c.id] && S().srs[c.id].due <= Date.now()) cards.push(c); })); setTop('All due cards', '#/cards'); return AP.runCards({ el: main, deck: { id: 'all', name: 'All due cards', cards }, newMax: 0 }); }
    const k = AP.deck(id); if (!k) return notFound();
    setTop(k.name, '#/cards'); AP.runCards({ el: main, deck: k, cram: !!q.cram });
  }

  /* ======================= MOCKS ======================= */
  const MOCKS = {
    c1check: { title: 'Core 1 checkpoint', desc: '40 questions from Days 1–7 · 40 minutes', exam: 1, days: [1, 7], n: 40, min: 40, pass: 675 },
    c1: { title: 'Core 1 full mock (220-1201)', desc: '90 questions · 90 minutes · weighted like the real exam', exam: 1, days: [1, 14], n: 90, min: 90, pass: 675, weighted: true },
    c2check: { title: 'Core 2 checkpoint', desc: '40 questions from Days 15–21 · 40 minutes', exam: 2, days: [15, 21], n: 40, min: 40, pass: 700 },
    c2: { title: 'Core 2 full mock (220-1202)', desc: '90 questions · 90 minutes · weighted like the real exam', exam: 2, days: [15, 28], n: 90, min: 90, pass: 700, weighted: true }
  };
  AP.MOCKS = MOCKS;
  function buildMock(M) {
    const pool = Object.values(AP.EX).filter((e) => e.src.exam === M.exam && ((e.src.lesson && e.src.lesson >= M.days[0] && e.src.lesson <= M.days[1]) || (e.src.ticket && AP.ticket(e.src.ticket).day >= M.days[0] && AP.ticket(e.src.ticket).day <= M.days[1])));
    let items = [];
    if (M.weighted) {
      AP.DOMAINS[M.exam].forEach(([code, , w]) => { const p = pool.filter((e) => e.src.dom === code); items = items.concat(sample(p, Math.round((M.n * w) / 100))); });
      if (items.length < M.n) items = items.concat(sample(pool.filter((e) => !items.includes(e)), M.n - items.length));
      items = items.slice(0, M.n);
    } else items = sample(pool, M.n);
    // put PBQs first, like the real exam
    items = shuffle(items);
    items.sort((a, b) => ((b.t === 'seq' || b.t === 'match') ? 1 : 0) - ((a.t === 'seq' || a.t === 'match') ? 1 : 0));
    return items.map((e) => Object.assign({}, e, { sec: domName(M.exam, e.src.dom) }));
  }
  function pageMocks() {
    setTop('Mock exams', '#/practice');
    main.innerHTML = `<div class="hero"><h1>Mock exams</h1><p class="dim">Exam conditions: timer running, no feedback until the end, PBQs first. Flag anything you guess and review flags afterwards.</p></div>
      <div class="grid g2">${Object.entries(MOCKS).map(([k, M]) => { const r = S().mocks[k]; return `<a class="tile ${r && r.best >= M.pass ? 'done' : ''}" href="#/mock/${k}"><div class="row between"><span class="k">Core ${M.exam} · pass ${M.pass}</span>${r ? `<span class="pill ${r.best >= M.pass ? 'ok' : 'bad'}">best ${r.best}</span>` : ''}</div><div class="t">${esc(M.title)}</div><div class="s">${esc(M.desc)}${r ? ' · ' + r.n + ' attempt' + (r.n > 1 ? 's' : '') : ''}</div></a>`; }).join('')}</div>
      <div class="card" style="margin-top:14px"><h4>Ready to book?</h4><p class="dim" style="margin:0">Rule of thumb used here: two full mocks at 750+ on different days, every domain above 75%, and no lesson below "Exam-ready". Retaking a mock repeats questions, so your second score is optimistic. Use the domain breakdown more than the number.</p></div>`;
  }
  function pageMock(id) {
    const M = MOCKS[id]; if (!M) return notFound();
    setTop(M.title, '#/mocks'); const prev = S().mocks[id];
    const pool = buildMock(M);
    main.innerHTML = `<div class="eyebrow">Core ${M.exam} · Days ${M.days[0]}–${M.days[1]}</div><h1>${esc(M.title)}</h1>
      <div class="card"><h4>Rules</h4><ul style="padding-left:1.2em;margin:0"><li>${pool.length} questions, ${M.min} minutes. The clock keeps running if you switch tabs.</li><li>No feedback until you finish. Unanswered questions score zero, so never leave one blank.</li><li>Performance-style tasks come first, like the real exam. If one eats time, flag it, answer your best guess and move on.</li><li>Score is shown on the 100–900 scale. Passing for Core ${M.exam} is <b>${M.pass}</b>.</li></ul>
      ${prev ? `<p style="margin-bottom:0">Best: <b>${prev.best}</b> · last: ${prev.last} · attempts: ${prev.n}</p>` : ''}</div>
      <button class="btn pri block" id="go">${ICON.clock} Start the clock</button>`;
    $('#go').onclick = () => {
      AP.runSet({ el: main, items: pool, title: M.title, mode: 'mock', timer: M.min * 60, exam: { pass: M.pass },
        onResult: (r) => {
          if (r.quit && r.res.length < pool.length / 3) return;
          const sc = AP.scaled(r.pct), m = (S().mocks[id] = S().mocks[id] || { best: 0, n: 0, hist: [] });
          m.best = Math.max(m.best, sc); m.last = sc; m.n++; m.at = Date.now(); m.hist = (m.hist || []).concat([[AP.todayKey(), sc]]).slice(-20); AP.markBlock('practice'); AP.save(true);
        }, onQuit: () => { location.hash = '#/mocks'; } });
    };
  }

  /* ======================= MAPS ======================= */
  function pageMaps() {
    setTop('Concept maps', '#/practice');
    main.innerHTML = `<div class="hero"><h1>Concept maps</h1><p class="dim">Every topic as a tree. Open one, cover it, and recall the branches out loud.</p></div>${LESSONS.map((L) => `<details class="card tight"><summary style="cursor:pointer"><b>Day ${L.day}</b> · ${esc(L.title)}</summary>${renderMap(L.map)}<a class="btn sm" href="#/lesson/${L.day}">Open lesson</a></details>`).join('')}`;
    bindMap(main);
  }

  /* ======================= EXAM GUIDE ======================= */
  function pageExam() {
    setTop('Exam guide', '#/');
    const dom = (ex) => `<div class="tbl-wrap"><table><thead><tr><th>Domain</th><th>Weight</th><th>Lessons</th></tr></thead><tbody>${AP.DOMAINS[ex].map(([c, n, w]) => `<tr><td>${c} ${esc(n)}</td><td>${w}%</td><td>${LESSONS.filter((l) => l.exam === ex && l.dom === c).map((l) => `<a href="#/lesson/${l.day}">D${l.day}</a>`).join(' ')}</td></tr>`).join('')}</tbody></table></div>`;
    main.innerHTML = `<div class="hero"><h1>Exam guide</h1><p class="dim">CompTIA A+ is two exams. You need both, from the same series: 220-1201 (Core 1) and 220-1202 (Core 2).</p></div>
      <div class="card"><h3 style="margin-top:0">Format (both exams)</h3><ul style="padding-left:1.2em"><li>Up to <b>90 questions</b> in <b>90 minutes</b>.</li><li>Multiple choice (single and multiple response), drag-and-drop and <b>performance-based questions</b> (PBQs: simulations, matching, ordering, configuring).</li><li>Scored 100–900. Pass: <b>Core 1 = 675</b>, <b>Core 2 = 700</b>.</li><li>Taken at a Pearson VUE test centre or online proctored. Check the current voucher price on CompTIA's site before you buy.</li></ul></div>
      <div class="card"><h3 style="margin-top:0">Core 1 · 220-1201</h3>${dom(1)}</div>
      <div class="card"><h3 style="margin-top:0">Core 2 · 220-1202</h3>${dom(2)}</div>
      <div class="card"><h3 style="margin-top:0">Exam-day tactics</h3><ul style="padding-left:1.2em">
        <li><b>PBQs come first.</b> If one is taking more than 6 to 8 minutes, give your best answer, flag it and come back at the end.</li>
        <li><b>Read the last sentence first.</b> "What should the technician do FIRST / NEXT / BEST?" changes the answer. FIRST usually means the least invasive, cheapest or safest step.</li>
        <li><b>Follow the troubleshooting method</b> on scenario questions: identify, theory, test, plan, implement, verify, document. Questions often hide the answer in which step you are on.</li>
        <li><b>Eliminate.</b> Two options are usually clearly wrong. Decide between the last two using the exact wording (e.g. "wireless" vs "wired", "Home" vs "Pro").</li>
        <li><b>Never leave a blank.</b> No penalty for guessing.</li>
        <li><b>Pace:</b> about 1 minute per question after PBQs. Check the clock at question 30 and 60.</li>
        <li><b>Scope words:</b> "user", "all users", "after an update", "only on Wi-Fi" point to the cause.</li></ul></div>
      <div class="card"><h3 style="margin-top:0">How this plan works</h3><p style="margin-top:0">Days 1–13: Core 1 objectives · Day 14: Core 1 review + full mock · Days 15–27: Core 2 objectives · Day 28: Core 2 review + full mock. Checkpoints on Day 7 and Day 21. About 2 hours a day (change the goal in Me).</p><p class="dim" style="margin-bottom:0">Book Core 1 for shortly after Day 14 if your mock is 750+, and keep going with Core 2. Or book both after Day 28.</p></div>`;
  }

  /* ======================= ME ======================= */
  function pageMe() {
    setTop('Me'); const st = S(), c = AP.cloud.get(), cs = AP.cloud.status();
    const ex = Object.values(st.ex); const cc = ex.reduce((a, r) => a + r.c, 0), ww = ex.reduce((a, r) => a + r.w, 0);
    const learned = AP.allDecks().reduce((a, k) => a + AP.deckStats(k).learned, 0);
    const domCard = (n) => `<div class="card"><div class="row between"><h3 style="margin:0">Core ${n} by domain</h3><span class="pill gold">${AP.readiness(n)}% ready</span></div><p class="dim" style="font-size:13px;margin:6px 0 0">Accuracy on the latest attempt of each question · coverage = share of the domain's questions you have tried.</p>${AP.domStats(n).map((d) => `<div class="dom-bar"><span>${d.code} ${esc(d.name)} <span class="dim" style="font-size:12px">· ${d.w}%</span></span><b>${d.acc == null ? '<span class="dim">–</span>' : d.acc + '%'} <span class="dim" style="font-weight:400;font-size:12px">· ${d.cover}% covered</span></b><div class="progress ${d.acc >= 75 ? 'ok' : ''}"><i style="width:${d.acc || 0}%"></i></div></div>`).join('')}</div>`;
    main.innerHTML = `<div class="hero"><h1>Me</h1></div>
      <div class="card" id="acct">${AP.cloud.mode() === 'claude' ? `<div class="row between"><div><div class="eyebrow">Sync</div><b>${c ? 'Synced to your Claude account' : 'Saved on this device only'}</b></div><span class="sync-dot ${c ? (cs.err ? 'err' : 'on') : ''}"></span></div>
        <p class="dim" style="margin-bottom:0">${c ? 'Open this page signed in to Claude on any device and your progress follows you. Last synced: ' + (c.at ? new Date(c.at).toLocaleString() : 'not yet') + '.' : 'Claude sync is not available in this view. Use a save code below.'}${cs.err ? ' <span style="color:var(--bad)">' + esc(cs.err) + '</span>' : ''}</p>${c ? '<div class="row" style="margin-top:10px"><button class="btn pri sm" id="sync">Sync now</button></div>' : ''}`
        : c ? `<div class="row between"><div><div class="eyebrow">Cloud save</div><b>${esc(c.name)}</b></div><span class="sync-dot ${cs.err ? 'err' : 'on'}"></span></div>
        <p class="dim">Progress syncs automatically about every 20 seconds after changes, and when you leave the page. Sign in with the same name on your phone and laptop. Last synced: ${c.at ? new Date(c.at).toLocaleString() : 'not yet'}.${cs.err ? ' <span style="color:var(--bad)">' + esc(cs.err) + '</span>' : ''}</p>
        <div class="row"><button class="btn pri" id="sync">Sync now</button><button class="btn ghost" id="out">Sign out</button></div>` : authForm(false)}</div>
      <div class="grid g3"><div class="card tight stat"><b>${AP.fmtMin(AP.totalSec())}</b><span>study time</span></div><div class="card tight stat"><b>${AP.streak()}</b><span>day streak</span></div><div class="card tight stat"><b>${cc + ww ? Math.round((cc / (cc + ww)) * 100) : 0}%</b><span>accuracy (${cc + ww})</span></div><div class="card tight stat"><b>${learned}</b><span>cards learned</span></div><div class="card tight stat"><b>${Object.keys(st.tk).length}/${TICKETS.length}</b><span>tickets worked</span></div><div class="card tight stat"><b>${st.mist.filter((i) => AP.EX[i]).length}</b><span>open mistakes</span></div></div>
      ${domCard(1)}${domCard(2)}
      <div class="card"><h3 style="margin-top:0">Mastery tracker</h3><p class="dim" style="margin-top:0">0 not started · 1 read · 2 developing (&lt;80%) · 3 exam-ready (80%+) · 4 retained (passed again on a later day)</p>
        ${LESSONS.map((L) => { const m = AP.mastery(L.day), r = st.les[L.day], nr = AP.nextReview(L.day); return `<a class="list-row" href="#/lesson/${L.day}/practice" style="color:var(--tx)"><span class="tag">D${L.day}</span><div class="grow" style="font-size:14px">${esc(L.title)}<div class="dim" style="font-size:12px">${r && r.tries ? 'best ' + r.best + '% · ' + r.tries + ' tries' : 'no attempts'}${nr ? ' · retest ' + nr.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}</div></div>${AP.masteryDots(m)}</a>`; }).join('')}</div>
      <div class="card"><h3 style="margin-top:0">Mock history</h3>${Object.entries(MOCKS).map(([k, M]) => { const r = st.mocks[k]; return `<div class="list-row"><div class="grow">${esc(M.title)}${r && r.hist ? `<div class="dim" style="font-size:12px">${r.hist.map((h) => h[1]).join(' → ')}</div>` : ''}</div>${r ? `<span class="pill ${r.best >= M.pass ? 'ok' : 'bad'}">${r.best}</span>` : '<span class="dim" style="font-size:13px">not taken</span>'}<a class="btn sm" href="#/mock/${k}">Open</a></div>`; }).join('')}</div>
      <div class="card"><h3 style="margin-top:0">Settings</h3>
        <label>Day 1 of the plan</label><input type="date" id="sd" value="${st.start}">
        <label>Core 1 exam date (optional)</label><input type="date" id="e1" value="${st.exam1 || ''}">
        <label>Core 2 exam date (optional)</label><input type="date" id="e2" value="${st.exam2 || ''}">
        <label>Daily study goal</label><div class="seg">${[60, 90, 120, 180].map((g) => `<button data-g="${g}" class="${(st.goal || 120) === g ? 'on' : ''}">${AP.fmtMin(g * 60)}</button>`).join('')}</div>
        <label>Text size</label><div class="seg">${[15, 16, 17, 18].map((f) => `<button data-f="${f}" class="${st.font === f ? 'on' : ''}">${f}</button>`).join('')}</div></div>
      <div class="card"><h3 style="margin-top:0">Data</h3><p class="dim" style="margin-top:0">Save code: copy your progress to paste on another device without an account.</p>
        <div class="row"><button class="btn sm" id="cp">Copy save code</button><button class="btn sm" id="ld">Load a save code</button><button class="btn sm ghost" id="rs" style="color:var(--bad)">Reset this device</button></div></div>
      <p class="dim" style="font-size:12px;text-align:center">CompTIA A+ 220-1201 / 220-1202 · 28-day plan. Not affiliated with CompTIA.</p>`;
    bindAuth(false);
    if (c) { $('#sync').onclick = async () => { $('#sync').textContent = 'Syncing…'; const ok = await AP.cloud.sync(); AP.toast(ok ? 'Synced.' : 'Sync failed.', ok ? 'ok' : 'bad'); pageMe(); }; const o = $('#out'); if (o) o.onclick = async () => { await AP.cloud.logout(); topRight(); pageMe(); }; }
    $('#sd').onchange = (e) => { if (e.target.value) { st.start = e.target.value; AP.save(true); AP.toast('Start date updated.'); } };
    $('#e1').onchange = (e) => { st.exam1 = e.target.value; AP.save(true); AP.toast('Saved.'); };
    $('#e2').onchange = (e) => { st.exam2 = e.target.value; AP.save(true); AP.toast('Saved.'); };
    $$('[data-g]', main).forEach((b) => (b.onclick = () => { st.goal = +b.dataset.g; AP.save(); topRight(); pageMe(); }));
    $$('[data-f]', main).forEach((b) => (b.onclick = () => { st.font = +b.dataset.f; applyFont(); AP.save(); pageMe(); }));
    $('#cp').onclick = () => { const code = AP.packSave(); (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(() => AP.toast('Save code copied.', 'ok')).catch(() => AP.modal(`<h3>Save code</h3><textarea readonly style="min-height:160px">${esc(code)}</textarea><button class="btn" onclick="AP.closeModal()">Close</button>`)); };
    $('#ld').onclick = () => { AP.modal(`<h3>Load a save code</h3><p class="dim">This replaces the progress on this device.</p><textarea id="lc" placeholder="AP1.…" style="min-height:140px"></textarea><div class="row" style="margin-top:10px"><button class="btn pri" id="lcg">Load</button><button class="btn ghost" onclick="AP.closeModal()">Cancel</button></div>`); $('#lcg').onclick = () => { const o = AP.unpackSave($('#lc').value); if (!o) return AP.toast('That is not a valid save code.', 'bad'); AP.setState(o); AP.closeModal(); AP.save(true); AP.toast('Progress loaded.', 'ok'); route(); }; };
    $('#rs').onclick = (e) => { const b = e.target; if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = 'Tap again to erase this device'; return; } AP.resetLocal(); AP.toast('This device was reset.'); route(); };
  }
  function authForm(welcome) {
    return `${welcome ? '' : '<div class="eyebrow">Cloud save</div><p style="margin-top:4px">Create a name and password to keep your progress on your phone and laptop. No email needed.</p>'}
      <div class="seg" id="am"><button data-m="login" class="on">Sign in</button><button data-m="register">Create account</button></div>
      <input type="text" id="an" placeholder="Name (3–20 letters, numbers, - or _)" maxlength="20" autocomplete="username" autocapitalize="off" autocorrect="off" spellcheck="false" style="margin-top:10px">
      <input type="password" id="ap" placeholder="Password (6+ characters)" maxlength="72" autocomplete="current-password" style="margin-top:10px">
      <button class="btn pri block" id="ago" style="margin-top:12px">Sign in</button>
      <p class="dim" id="amsg" style="font-size:13px">There is no password reset. Pick one you will remember, and don't reuse an important password.</p>`;
  }
  function bindAuth(welcome) {
    const am = $('#am'); if (!am) return; let mode = 'login';
    $$('#am button').forEach((b) => (b.onclick = () => { mode = b.dataset.m; $$('#am button').forEach((x) => x.classList.toggle('on', x === b)); $('#ago').textContent = mode === 'login' ? 'Sign in' : 'Create account'; $('#ap').autocomplete = mode === 'login' ? 'current-password' : 'new-password'; }));
    const go = async () => {
      const msg = $('#amsg'); msg.style.color = ''; msg.textContent = 'Connecting…';
      const r = await AP.cloud.auth(mode, $('#an').value, $('#ap').value);
      if (!r.ok) { msg.style.color = 'var(--bad)'; msg.textContent = r.msg; return; }
      const st = S(); if (!st.welcomed) { st.welcomed = true; st.start = AP.todayKey(); }
      if (mode === 'login' && r.data) {
        if (AP.isFresh(st)) { AP.setState(Object.assign(r.data, { welcomed: true })); AP.toast('Welcome back, <b>' + esc(r.name) + '</b>. Progress loaded.', 'ok'); }
        else {
          AP.modal(`<h3>Two saves found</h3><p>This device has progress, and so does the cloud for <b>${esc(r.name)}</b>. Which one do you keep?</p>
            <p class="dim" style="font-size:13px">Cloud: last saved ${r.data.savedAt ? new Date(r.data.savedAt).toLocaleString() : '?'}<br>This device: last saved ${new Date(st.savedAt).toLocaleString()}</p>
            <div class="row"><button class="btn pri" id="kc">Use the cloud save</button><button class="btn" id="kd">Keep this device</button></div>`);
          $('#kc').onclick = () => { AP.setState(Object.assign(r.data, { welcomed: true })); AP.closeModal(); AP.toast('Cloud save loaded.', 'ok'); location.hash = '#/'; route(); };
          $('#kd').onclick = async () => { AP.closeModal(); await AP.cloud.sync(); AP.toast('This device\'s progress is now in the cloud.', 'ok'); location.hash = '#/'; route(); };
          return;
        }
      } else { AP.toast(mode === 'register' ? 'Account created. Progress will sync.' : 'Signed in.', 'ok'); await AP.cloud.sync(); }
      AP.save(true); topRight();
      if (welcome) location.hash = '#/'; route();
    };
    $('#ago').onclick = go; $('#ap').onkeydown = (e) => { if (e.key === 'Enter') go(); };
  }
  function pageWelcome() {
    setTop('CompTIA A+ Prep');
    $('#tabs').style.display = 'none';
    main.innerHTML = `<div class="welcome"><div class="big">A+ in <em>28 days</em>.</div>
      <p class="dim">Core 1 (220-1201) and Core 2 (220-1202), start to finish: every objective explained, exam traps, concept maps, 500+ practice questions, PBQ-style tasks, help-desk tickets, spaced-repetition flashcards and timed mock exams scored on the 100–900 scale.</p>
      ${AP.cloud.inClaude() ? `<button class="btn pri block" id="skip">Start Day 1</button>
      <p class="dim" style="font-size:12.5px;text-align:center">Progress syncs to your Claude account automatically.</p></div>` : `<div class="card">${authForm(true)}</div>
      <button class="btn ghost block" id="skip">Continue without an account</button>
      <p class="dim" style="font-size:12.5px;text-align:center">Without an account, progress stays on this device. You can sign in later from Me.</p></div>`}`;
    bindAuth(true);
    $('#skip').onclick = () => { S().welcomed = true; S().start = AP.todayKey(); AP.save(true); location.hash = '#/'; route(); };
  }
  function notFound() { setTop('Not found', '#/'); main.innerHTML = '<div class="empty"><h3>Page not found</h3><a class="btn" href="#/">Go to Today</a></div>'; }
  function applyFont() { document.documentElement.style.setProperty('--fs', (S().font || 16) + 'px'); }

  /* ======================= router ======================= */
  const ROUTES = [
    [/^\/?$/, '#/', () => pageToday()],
    [/^\/lessons$/, '#/lessons', () => pageLessons()],
    [/^\/lesson\/(\d+)(?:\/(\w+))?$/, '#/lessons', (m) => pageLesson(m[1], m[2])],
    [/^\/practice$/, '#/practice', () => pagePractice()],
    [/^\/quiz$/, '#/practice', (m, q) => pageQuiz(q)],
    [/^\/tickets$/, '#/tickets', () => pageTickets()],
    [/^\/ticket\/(\w+)$/, '#/tickets', (m) => pageTicket(m[1])],
    [/^\/cards$/, '#/cards', () => pageCards()],
    [/^\/cards\/(\w+)$/, '#/cards', (m, q) => pageDeck(m[1], q)],
    [/^\/mocks$/, '#/mocks', () => pageMocks()],
    [/^\/mock\/(\w+)$/, '#/mocks', (m) => pageMock(m[1])],
    [/^\/maps$/, '#/maps', () => pageMaps()],
    [/^\/exam$/, '#/exam', () => pageExam()],
    [/^\/me$/, '#/me', () => pageMe()]
  ];
  function route() {
    AP.cleanup(); AP.closeModal();
    const h = location.hash.replace(/^#/, '') || '/';
    const [path, qs] = h.split('?');
    const q = Object.fromEntries(new URLSearchParams(qs || ''));
    if (!S().welcomed) { pageWelcome(); return; }
    $('#tabs').style.display = '';
    for (const [re, nav, fn] of ROUTES) { const m = path.match(re); if (m) { shell(nav); fn(m, q); window.scrollTo(0, 0); return; } }
    shell(''); notFound();
  }
  AP.route = route;
  addEventListener('hashchange', route);

  /* ---------- boot ---------- */
  applyFont();
  route();
  (async () => {
    const r = await AP.cloud.boot();
    if (r === 'pulled') { AP.toast('Progress loaded from your Claude account.', 'ok'); applyFont(); if (!document.querySelector('.ex-wrap')) route(); }
    else { if (r === 'expired') AP.toast('Cloud sign-in expired. Sign in again from Me.', 'bad'); topRight(); }
  })();
})();
