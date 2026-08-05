/* Deep-dive gallery — click a tile, the photographs open full size and swipe.
   Progressive enhancement: with JavaScript off every band reads exactly as before,
   because the extra photographs live in an inert <script type="application/json">
   block that the browser never renders. */
(function () {
  'use strict';
  var tiles = [].slice.call(document.querySelectorAll('[data-gallery]'));
  if (!tiles.length || !('querySelector' in document)) return;

  var box, figure, imgEl, capEl, dotsEl, counter, prevBtn, nextBtn, closeBtn;
  var shots = [], idx = 0, opener = null;

  function build() {
    box = document.createElement('div');
    box.className = 'gal';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photographs');
    box.innerHTML =
      '<button class="gal-x" type="button" aria-label="Close">&times;</button>' +
      '<button class="gal-nav gal-prev" type="button" aria-label="Previous photograph">&#8249;</button>' +
      '<figure class="gal-fig"><img alt=""><figcaption></figcaption></figure>' +
      '<button class="gal-nav gal-next" type="button" aria-label="Next photograph">&#8250;</button>' +
      '<p class="gal-count" aria-live="polite"></p>' +
      '<div class="gal-dots" role="tablist"></div>';
    document.body.appendChild(box);
    figure = box.querySelector('.gal-fig');
    imgEl = box.querySelector('.gal-fig img');
    capEl = box.querySelector('figcaption');
    dotsEl = box.querySelector('.gal-dots');
    counter = box.querySelector('.gal-count');
    prevBtn = box.querySelector('.gal-prev');
    nextBtn = box.querySelector('.gal-next');
    closeBtn = box.querySelector('.gal-x');

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { go(idx - 1); });
    nextBtn.addEventListener('click', function () { go(idx + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') go(idx - 1);
      else if (e.key === 'ArrowRight') go(idx + 1);
    });

    var x0 = null;
    figure.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    figure.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  function go(n) {
    if (!shots.length) return;
    idx = (n + shots.length) % shots.length;
    var s = shots[idx];
    imgEl.src = s.src;
    imgEl.alt = s.alt || '';
    capEl.textContent = s.alt || '';
    counter.textContent = shots.length > 1 ? (idx + 1) + ' of ' + shots.length : '';
    [].forEach.call(dotsEl.children, function (d, i) {
      d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
  }

  function open(list, from) {
    shots = list; opener = from;
    if (!box) build();
    dotsEl.innerHTML = '';
    if (shots.length > 1) {
      shots.forEach(function (_, i) {
        var d = document.createElement('button');
        d.type = 'button'; d.className = 'gal-dot'; d.setAttribute('role', 'tab');
        d.setAttribute('aria-label', 'Photograph ' + (i + 1));
        d.addEventListener('click', function () { go(i); });
        dotsEl.appendChild(d);
      });
    }
    var multi = shots.length > 1;
    prevBtn.hidden = nextBtn.hidden = !multi;
    box.classList.add('open');
    document.documentElement.classList.add('gal-lock');
    go(0);
    closeBtn.focus();
  }

  function close() {
    box.classList.remove('open');
    document.documentElement.classList.remove('gal-lock');
    imgEl.removeAttribute('src');
    if (opener && opener.focus) opener.focus();
    opener = null;
  }

  tiles.forEach(function (tile) {
    var data = tile.querySelector('script.gal-data');
    var list;
    try { list = JSON.parse(data ? data.textContent : '[]'); } catch (e) { return; }
    if (!list || !list.length) return;

    tile.classList.add('has-gal');
    tile.setAttribute('role', 'button');
    tile.setAttribute('tabindex', '0');
    tile.setAttribute('aria-label',
      (tile.querySelector('h3') ? tile.querySelector('h3').textContent + ' — ' : '') +
      'view ' + list.length + (list.length === 1 ? ' photograph' : ' photographs'));

    if (list.length > 1) {
      var badge = document.createElement('span');
      badge.className = 'gal-badge';
      badge.setAttribute('aria-hidden', 'true');
      badge.textContent = list.length + ' photos';
      tile.appendChild(badge);
    }

    tile.addEventListener('click', function (e) {
      if (e.target.closest('a,button')) return;
      open(list, tile);
    });
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(list, tile); }
    });
  });
})();
