/* Engine: exercise runner and flashcards. */
(function () {
  'use strict';
  const AP = window.AP, { $$, esc, shuffle, ICON } = AP;
  AP.cleanups = [];
  AP.cleanup = () => { AP.cleanups.forEach((f) => { try { f(); } catch (e) { /* ignore */ } }); AP.cleanups = []; };
  const TYPE_LABEL = { mcq: 'Choose the best answer', multi: 'Choose all that apply', fill: 'Type the answer', seq: 'Put the steps in order', match: 'Match each item (PBQ style)' };
  const fmtClock = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

  /* ======================= exercise runner ======================= */
  AP.runSet = function (opt) {
    const el = opt.el, items = opt.items.slice();
    let idx = 0, answered = false, cur = null, timerId = null, left = opt.timer || 0;
    const res = [];
    const keyH = (e) => {
      if (!document.body.contains(el.querySelector('.ex-wrap'))) return;
      if (e.key === 'Enter' && !e.shiftKey) {
        const nb = el.querySelector('[data-a=next]'); const cb = el.querySelector('[data-a=check]');
        if (answered && nb) { e.preventDefault(); nb.click(); } else if (!answered && cb) { e.preventDefault(); cb.click(); }
      } else if (!answered && cur && (cur.t === 'mcq' || cur.t === 'multi') && /^[1-6]$/.test(e.key) && e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') { const b = el.querySelectorAll('.opt')[+e.key - 1]; if (b) b.click(); }
    };
    addEventListener('keydown', keyH); AP.cleanups.push(() => removeEventListener('keydown', keyH));
    if (opt.timer) {
      timerId = setInterval(() => { left--; const t = el.querySelector('#tmr'); if (t) { t.textContent = fmtClock(Math.max(0, left)); t.classList.toggle('low', left < 300); } if (left <= 0) { clearInterval(timerId); AP.toast('Time is up.', 'bad'); finish(false, true); } }, 1000);
      AP.cleanups.push(() => clearInterval(timerId));
    }

    function ctxHtml(ex) {
      if (!ex.ctx) return '';
      const s = AP.ticket(ex.ctx); if (!s) return '';
      const open = idx === 0 || items[idx - 1].ctx !== ex.ctx;
      return `<details class="card tight" ${open ? 'open' : ''}><summary class="dim" style="cursor:pointer">${ICON.ticket} Ticket <b>#${esc(s.id.toUpperCase())}</b> · ${esc(s.title)}</summary><div class="ticket" style="margin-top:10px">${esc(s.text)}</div></details>`;
    }
    function render() {
      answered = false; cur = items[idx];
      const ex = cur, pct = Math.round((idx / items.length) * 100);
      if ((ex.t === 'mcq' || ex.t === 'multi') && !ex._o) ex._o = ex.tf ? ex.opts.slice() : shuffle(ex.opts);
      if (ex.t === 'multi') ex._sel = [];
      if (ex.t === 'seq' && !ex._s) { ex._s = shuffle(ex.lines.map((l, i) => i)); if (ex._s.every((v, i) => v === i) && ex.lines.length > 1) ex._s.reverse(); ex._pick = []; }
      if (ex.t === 'match' && !ex._r) { ex._r = shuffle(Array.from(new Set(ex.pairs.map((p) => p[1])))); ex._l = shuffle(ex.pairs.map((p, i) => i)); }
      let body = '';
      const label = (ex.sec ? ex.sec + ' · ' : '') + (ex.t === 'multi' ? `Choose ${ex.a.length}` : TYPE_LABEL[ex.t] || '');
      if (ex.t === 'mcq' || ex.t === 'multi') body = `<div class="q-text">${ex.q}</div><div class="opts">${ex._o.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join('')}</div>`;
      else if (ex.t === 'fill') body = `<div class="q-text">${ex.q.replace('___', '<span class="blank" id="blank">?</span>')}</div>${ex.hint ? `<div class="q-hint">Hint: ${esc(ex.hint)}</div>` : ''}<input type="text" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer">`;
      else if (ex.t === 'seq') body = `<div class="q-text">${ex.q}</div><div class="q-hint">Tap the steps in order, first to last. Tap again to undo.</div><div id="seq">${ex._s.map((li) => `<div class="seq-item" data-i="${li}"><span class="n"></span><span>${esc(ex.lines[li])}</span></div>`).join('')}</div>`;
      else if (ex.t === 'match') body = `<div class="q-text">${ex.q}</div><div class="card tight" style="margin-top:12px">${ex._l.map((pi) => `<div class="match-row" data-p="${pi}"><div class="lft">${esc(ex.pairs[pi][0])}</div><select><option value="">Choose…</option>${ex._r.map((r) => `<option>${esc(r)}</option>`).join('')}</select></div>`).join('')}</div>`;
      const flagged = AP.S().flags.includes(ex.id);
      el.innerHTML = `<div class="ex-wrap">
        <div class="ex-head"><button class="icon-btn" data-a="quit" aria-label="Quit">✕</button><div class="progress"><i style="width:${pct}%"></i></div>${opt.timer ? `<span class="timer-pill ${left < 300 ? 'low' : ''}" id="tmr">${fmtClock(left)}</span>` : ''}<span class="ex-count">${idx + 1}/${items.length}</span><button class="icon-btn flag-btn ${flagged ? 'on' : ''}" data-a="flag" title="Flag for later review" aria-label="Flag">${ICON.flag}</button></div>
        ${ctxHtml(ex)}
        <div class="q-type">${esc(label)}</div>${body}
        <div id="fb"></div>
        <div class="row" id="acts" style="margin-top:14px">${ex.t === 'mcq' && !opt.exam ? '' : `<button class="btn pri block" data-a="check">${opt.exam ? (idx + 1 < items.length ? 'Next' : 'Finish exam') : 'Check'}</button>`}</div></div>`;
      bind(ex);
      const inp = el.querySelector('#ans'); if (inp && matchMedia('(min-width: 900px)').matches) inp.focus();
      window.scrollTo(0, 0);
    }
    function bind(ex) {
      el.querySelector('[data-a=quit]').onclick = (e) => { const b = e.currentTarget; if (res.length && !b.dataset.sure) { b.dataset.sure = 1; AP.toast(opt.timer ? 'Tap ✕ again to end the exam and score it.' : 'Tap ✕ again to quit. Answers so far are saved.'); setTimeout(() => { delete b.dataset.sure; }, 3500); return; } finish(true); };
      el.querySelector('[data-a=flag]').onclick = (e) => { const st = AP.S(), b = e.currentTarget; if (st.flags.includes(ex.id)) st.flags = st.flags.filter((x) => x !== ex.id); else st.flags.unshift(ex.id); b.classList.toggle('on'); AP.save(); AP.toast(st.flags.includes(ex.id) ? 'Flagged. Find it under Practice → Flagged.' : 'Flag removed.'); };
      const cb = el.querySelector('[data-a=check]'); if (cb) cb.onclick = () => check(ex);
      if (ex.t === 'mcq' && !opt.exam) $$('.opt', el).forEach((b) => (b.onclick = () => check(ex, ex._o[+b.dataset.i], b)));
      if (ex.t === 'mcq' && opt.exam) $$('.opt', el).forEach((b) => (b.onclick = () => { ex._p1 = ex._o[+b.dataset.i]; $$('.opt', el).forEach((x) => x.classList.toggle('sel', x === b)); }));
      if (cb && ex.t === 'mcq' && opt.exam) cb.onclick = () => { if (ex._p1 == null) return AP.toast('Pick an answer (or flag it and guess: blanks score zero).'); check(ex, ex._p1, null); };
      if (ex.t === 'multi') $$('.opt', el).forEach((b) => (b.onclick = () => { if (answered) return; const v = ex._o[+b.dataset.i]; const p = ex._sel.indexOf(v); if (p >= 0) ex._sel.splice(p, 1); else ex._sel.push(v); b.classList.toggle('sel', p < 0); }));
      if (ex.t === 'seq') {
        const draw = () => $$('.seq-item', el).forEach((d) => { const p = ex._pick.indexOf(+d.dataset.i); d.classList.toggle('picked', p >= 0); d.querySelector('.n').textContent = p >= 0 ? p + 1 : ''; });
        $$('.seq-item', el).forEach((d) => (d.onclick = () => { if (answered) return; const i = +d.dataset.i, p = ex._pick.indexOf(i); if (p >= 0) ex._pick.splice(p, 1); else ex._pick.push(i); draw(); }));
      }
    }
    function check(ex, picked, btn) {
      if (answered) return;
      let score = 0, input = '', extra = '', best = Array.isArray(ex.a) ? ex.a[0] : ex.a, note = '';
      if (ex.t === 'mcq') {
        input = picked; score = picked === ex.a ? 1 : 0;
        $$('.opt', el).forEach((b) => { b.disabled = true; const o = ex._o[+b.dataset.i]; if (o === ex.a) b.classList.add('right'); else if (b === btn) b.classList.add('wrong'); });
      } else if (ex.t === 'multi') {
        if (!ex._sel.length) { AP.toast('Select your answers first.'); return; }
        const ok = ex._sel.length === ex.a.length && ex._sel.every((v) => ex.a.includes(v));
        score = ok ? 1 : 0; input = ex._sel.join(' + '); best = ex.a.join(' + ');
        $$('.opt', el).forEach((b) => { b.disabled = true; const o = ex._o[+b.dataset.i]; const s = ex._sel.includes(o), c = ex.a.includes(o); b.classList.remove('sel'); if (c) b.classList.add('right'); if (s && !c) b.classList.add('wrong'); if (c && !s) b.classList.add('miss'); });
        if (!ok && ex._sel.length !== ex.a.length) note = `You picked ${ex._sel.length}; the question wants exactly ${ex.a.length}.`;
      } else if (ex.t === 'fill') {
        input = el.querySelector('#ans').value; if (!input.trim()) { el.querySelector('#ans').focus(); return; }
        const r = AP.check(input, ex.a); score = r.score; best = r.best; note = r.note;
        el.querySelector('#blank').textContent = best; el.querySelector('#ans').disabled = true;
      } else if (ex.t === 'seq') {
        if (ex._pick.length < ex.lines.length) { AP.toast('Place every step first.'); return; }
        const okN = ex._pick.filter((v, i) => v === i).length; score = okN === ex.lines.length ? 1 : 0;
        input = ex._pick.map((v) => v + 1).join(','); best = '';
        extra = `<ol style="margin:6px 0 4px;padding-left:1.3em">${ex.lines.map((l, i) => `<li style="${ex._pick[i] === i ? '' : 'color:var(--bad)'}">${esc(l)}</li>`).join('')}</ol><div class="dim" style="font-size:.85em">Correct order shown. Red = you had a different step in that position.</div>`;
      } else if (ex.t === 'match') {
        const rows = $$('.match-row', el); let okN = 0, empty = 0;
        rows.forEach((r) => { if (!r.querySelector('select').value) empty++; });
        if (empty) { AP.toast('Match every item first.'); return; }
        rows.forEach((r) => { const p = ex.pairs[+r.dataset.p], sel = r.querySelector('select'); const ok = sel.value === p[1]; if (ok) okN++; r.classList.add(ok ? 'right' : 'wrong'); sel.disabled = true; if (!ok) r.insertAdjacentHTML('beforeend', `<div class="fix">→ ${esc(p[1])}</div>`); });
        score = okN === rows.length ? 1 : 0; input = okN + '/' + rows.length; best = '';
        note = okN === rows.length ? '' : `${okN} of ${rows.length} correct.`;
      }
      answered = true;
      const r = { ex, score, input };
      res.push(r);
      AP.record(ex, score);
      if (opt.exam) { el.querySelector('#acts').innerHTML = ''; idx++; if (idx < items.length) setTimeout(render, 0); else finish(false); return; }
      showFb(ex, r, best, note, extra);
    }
    function showFb(ex, r, best, note, extra) {
      const cls = r.score >= 1 ? 'ok' : r.score > 0 ? 'warn' : 'bad';
      const verdict = r.score >= 1 ? 'Correct.' : note === 'typo' ? 'Almost: one-character slip. Counted as half.' : r.score > 0 ? 'Partly right.' : 'Not quite.';
      const showAns = ex.t === 'fill' || ex.t === 'multi' ? r.score < 1 || ex.a.length > 1 : false;
      const others = ex.t === 'fill' && ex.a.length > 1 ? `<div class="dim" style="font-size:.88em">Also accepted: ${ex.a.filter((x) => x !== best).map(esc).join(' · ')}</div>` : '';
      const link = ex.src && ex.src.lesson && opt.mode !== 'lesson' ? `<a href="#/lesson/${ex.src.lesson}" class="dim" style="font-size:.88em">Review Day ${ex.src.lesson} →</a>` : '';
      el.querySelector('#fb').innerHTML = `<div class="feedback ${cls}"><div class="verdict">${verdict}</div>
        ${note && note !== 'typo' ? `<div class="dim" style="font-size:.9em;margin-bottom:6px">${esc(note)}</div>` : ''}
        ${showAns && best ? `<div class="ans">${esc(best)}</div>` : ''}${extra}${others}
        ${ex.why ? `<div class="why">${ex.why}</div>` : ''}${link}</div>`;
      el.querySelector('#acts').innerHTML = `<button class="btn pri block" data-a="next">${idx + 1 < items.length ? 'Next' : 'See results'} ${ICON.next}</button>`;
      el.querySelector('[data-a=next]').onclick = () => { idx++; if (idx < items.length) render(); else finish(false); };
      const sc = el.querySelector('#fb .feedback'); if (sc && sc.getBoundingClientRect().bottom > innerHeight) sc.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    function finish(quit, timeout) {
      if (timerId) clearInterval(timerId);
      AP.save(true);
      let total = res.reduce((a, r) => a + r.score, 0), n = res.length;
      if (opt.exam) { n = items.length; } // unanswered count as wrong in exam mode
      const pct = n ? Math.round((total / n) * 100) : 0;
      if (quit && !res.length) { opt.onQuit ? opt.onQuit() : history.back(); return; }
      const result = { pct, n, total, res, quit, timeout, used: opt.timer ? opt.timer - left : 0 };
      if (opt.onResult) opt.onResult(result);
      const wrong = res.filter((r) => r.score < 1);
      const secs = {};
      res.forEach((r) => { const s = r.ex.sec || ''; if (!s) return; secs[s] = secs[s] || [0, 0]; secs[s][0] += r.score; secs[s][1]++; });
      const secHtml = Object.keys(secs).length ? `<div class="card"><h4>By domain</h4>${Object.entries(secs).sort().map(([k, [a, b]]) => { const p = Math.round((a / b) * 100); return `<div class="dom-bar"><span>${esc(k)}</span><b style="color:${p >= 75 ? 'var(--ok)' : p >= 60 ? 'var(--warn)' : 'var(--bad)'}">${p}% <span class="dim" style="font-weight:400">(${a % 1 ? a.toFixed(1) : a}/${b})</span></b><div class="progress ${p >= 75 ? 'ok' : ''}"><i style="width:${p}%"></i></div></div>`; }).join('')}</div>` : '';
      const gaps = {};
      wrong.forEach((r) => { if (r.ex.src && r.ex.src.lesson) gaps[r.ex.src.lesson] = (gaps[r.ex.src.lesson] || 0) + 1; });
      const gapHtml = Object.keys(gaps).length ? `<div class="card"><h4>Gap report</h4>${Object.entries(gaps).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([d, c]) => `<div class="list-row"><div class="grow"><b>Day ${d}</b> · ${esc(AP.lesson(d).title)}</div><span class="pill bad">${c}</span><a class="btn sm" href="#/lesson/${d}">Review</a></div>`).join('')}</div>` : '';
      let head;
      if (opt.exam) {
        const sc = AP.scaled(pct), pass = opt.exam.pass, ok = sc >= pass;
        head = `<div class="eyebrow">${esc(opt.title)}</div><div class="score-scale">${sc}</div><div class="dim" style="margin-top:6px">estimated on the 100–900 scale · pass ${pass} · ${pct}% raw (${total % 1 ? total.toFixed(1) : total}/${n})</div>
          <p style="margin:12px 0 0">${ok ? (sc >= pass + 60 ? '<b style="color:var(--ok)">Comfortable pass.</b> If you score like this on two different mocks, book the exam.' : '<b style="color:var(--warn)">Borderline pass.</b> Push your weakest domain above 80% before booking.') : '<b style="color:var(--bad)">Not yet.</b> Work the gap report, then take another mock in 2 to 3 days.'}</p>
          <p class="dim" style="font-size:12.5px;margin:8px 0 0">${timeout ? 'Time ran out. ' : ''}${result.used ? 'Time used: ' + fmtClock(result.used) + '. ' : ''}CompTIA scaling is not public: treat this as a rough guide. Real PBQs are weighted more.</p>`;
      } else {
        const verdict = pct >= 90 ? 'Strong. Exam-level accuracy on this material.' : pct >= 80 ? 'Pass level. Retest on a later day to lock it in.' : pct >= 60 ? 'Developing. Re-read the lesson, then retry your mistakes.' : 'Not yet. Go back to the concept page before retrying.';
        head = `<div class="eyebrow">${esc(opt.title || 'Results')}</div><div class="sum-big">${pct}%</div><div class="dim" style="margin-top:6px">${total % 1 ? total.toFixed(1) : total} / ${n} ${quit ? '(stopped early)' : ''}</div><p style="margin:12px 0 0">${verdict}</p>`;
      }
      el.innerHTML = `<div class="ex-wrap">
        <div class="card" style="text-align:center;padding:28px 18px">${head}</div>
        ${secHtml}${gapHtml}
        ${wrong.length ? `<div class="card"><h4>Review your misses (${wrong.length})</h4>${wrong.map((r) => `<div class="mistake"><div class="dim" style="font-size:.85em">${esc(TYPE_LABEL[r.ex.t] || '')}${r.ex.src.lesson ? ' · Day ' + r.ex.src.lesson : ''}</div><div>${r.ex.q}</div>${r.input && r.ex.t !== 'seq' && r.ex.t !== 'match' ? `<div style="color:var(--bad);font-size:.92em">You: ${esc(r.input)}</div>` : ''}${r.ex.t === 'mcq' || r.ex.t === 'fill' || r.ex.t === 'multi' ? `<div style="color:var(--ok);font-size:.92em">Answer: ${esc(Array.isArray(r.ex.a) ? (r.ex.t === 'multi' ? r.ex.a.join(' + ') : r.ex.a[0]) : r.ex.a)}</div>` : r.ex.t === 'seq' ? `<ol style="font-size:.9em;color:var(--ok);margin:4px 0;padding-left:1.3em">${r.ex.lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ol>` : `<div style="font-size:.9em;color:var(--ok)">${r.ex.pairs.map((p) => esc(p[0]) + ' → ' + esc(p[1])).join('<br>')}</div>`}${r.ex.why ? `<div class="dim" style="font-size:.9em;margin-top:4px">${r.ex.why}</div>` : ''}</div>`).join('')}</div>` : ''}
        <div class="row">${wrong.length ? '<button class="btn pri" data-a="retry">' + ICON.redo + ' Retry misses</button>' : ''}${opt.exam ? '' : '<button class="btn" data-a="again">Run the set again</button>'}<button class="btn ghost" data-a="done">Done</button></div></div>`;
      const strip = (e) => { const c = Object.assign({}, e); delete c._o; delete c._s; delete c._pick; delete c._sel; delete c._r; delete c._l; return c; };
      const rb = el.querySelector('[data-a=retry]'); if (rb) rb.onclick = () => AP.runSet({ el, items: shuffle(wrong.map((r) => Object.assign(strip(r.ex), { _review: true }))), title: 'Retry misses', mode: opt.mode, onQuit: opt.onQuit });
      const ag = el.querySelector('[data-a=again]'); if (ag) ag.onclick = () => AP.runSet(Object.assign({}, opt, { items: shuffle(opt.items.map(strip)) }));
      el.querySelector('[data-a=done]').onclick = () => (opt.onQuit ? opt.onQuit() : history.back());
      window.scrollTo(0, 0);
    }
    render();
  };

  /* ======================= flashcards ======================= */
  AP.runCards = function (opt) {
    const S = AP.S(), d = opt.deck, el = opt.el;
    let q;
    if (opt.cram) q = shuffle(d.cards);
    else { const due = d.cards.filter((c) => S.srs[c.id] && S.srs[c.id].due <= Date.now()).sort((a, b) => S.srs[a.id].due - S.srs[b.id].due); const nw = d.cards.filter((c) => !S.srs[c.id]).slice(0, opt.newMax ?? 20); q = due.concat(nw); }
    if (!q.length) { el.innerHTML = `<div class="empty"><p>Nothing due in <b>${esc(d.name)}</b> right now.</p>${d.id !== 'all' ? `<a class="btn" href="#/cards/${d.id}?cram=1">Cram the whole deck anyway</a> ` : ''}<a class="btn ghost" href="#/cards">All decks</a></div>`; return; }
    let i = 0, flipped = false, done = 0, again = 0;
    const startN = q.length;
    const keyH = (e) => { if (!el.querySelector('.fc')) return; if (e.key === ' ') { e.preventDefault(); flip(); } else if (flipped && /^[1-4]$/.test(e.key)) rate(+e.key - 1); };
    addEventListener('keydown', keyH); AP.cleanups.push(() => removeEventListener('keydown', keyH));
    const rev = () => S.dir === 'rev';
    function render() {
      flipped = false; const c = q[i];
      const front = rev() ? c.b : c.f, back = rev() ? c.f : c.b;
      el.innerHTML = `<div class="ex-wrap"><div class="ex-head"><a class="icon-btn" href="#/cards" aria-label="Back">✕</a><div class="progress"><i style="width:${Math.round((done / (startN + again)) * 100)}%"></i></div><span class="ex-count">${q.length - i} left</span></div>
        <div class="row between" style="margin-bottom:6px"><span class="dim">${esc(d.name)}${opt.cram ? ' · cram' : ''}</span><button class="btn sm ghost" data-a="dir">${rev() ? 'Meaning → term' : 'Term → meaning'}</button></div>
        <div class="fc-stage"><div class="fc" id="fc"><div class="fc-face"><div class="fc-main" ${rev() ? 'style="font-size:1.15rem;line-height:1.45"' : ''}>${esc(front)}</div><div class="fc-tap">tap to flip · space</div></div>
        <div class="fc-face fc-back"><div class="fc-main" ${rev() ? 'style="font-size:1.6rem"' : ''}>${esc(back)}</div><div class="fc-sub">${esc(front)}</div></div></div></div>
        <div id="rate"><button class="btn block pri" data-a="flip">Show answer</button></div></div>`;
      el.querySelector('#fc').onclick = flip;
      el.querySelector('[data-a=flip]').onclick = flip;
      el.querySelector('[data-a=dir]').onclick = () => { S.dir = rev() ? '' : 'rev'; AP.save(); render(); };
    }
    function flip() {
      const fc = el.querySelector('#fc'); if (!fc) return;
      flipped = !flipped; fc.classList.toggle('flip', flipped);
      if (flipped) {
        el.querySelector('#rate').innerHTML = `<div class="rate"><button class="btn again" data-g="0">Again<small>1</small></button><button class="btn" data-g="1">Hard<small>2</small></button><button class="btn good" data-g="2">Good<small>3</small></button><button class="btn easy" data-g="3">Easy<small>4</small></button></div>`;
        $$('[data-g]', el).forEach((b) => (b.onclick = () => rate(+b.dataset.g)));
      }
    }
    function rate(g) {
      const c = q[i]; AP.rate(c, g); done++;
      if (g === 0) { q.splice(Math.min(q.length, i + 4), 0, c); again++; }
      i++; AP.save();
      if (i >= q.length) end(); else render();
    }
    function end() {
      AP.save(true);
      if (done >= 15) AP.markBlock('cards');
      const st = d.id === 'all' ? null : AP.deckStats(d);
      el.innerHTML = `<div class="ex-wrap"><div class="card" style="text-align:center;padding:28px"><div class="eyebrow">${esc(d.name)}</div><div class="sum-big">${done}</div><div class="dim">reviews · ${again} relearned</div>${st ? `<p>Learned (box 3+): <b>${st.learned}</b> / ${st.total}</p>` : ''}</div>
        <div class="row"><a class="btn pri" href="#/cards">All decks</a>${d.id !== 'all' ? '<button class="btn" data-a="cram">Cram again</button>' : ''}</div></div>`;
      const cb = el.querySelector('[data-a=cram]'); if (cb) cb.onclick = () => AP.runCards(Object.assign({}, opt, { cram: true }));
    }
    render();
  };
})();
