// Homepage only: continuous spatial falloff and a gently decaying blue trail.
const homeField = document.querySelector('.research-field[data-grid-field]');
if (homeField) {
  const matrix = homeField.querySelector('.cell-matrix');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let columns = 0;
  let rows = 0;
  let width = 0;
  let height = 0;
  let cells = [];
  let light = [];
  let painted = [];
  let point = null;
  let frame = 0;
  let previousTime = 0;

  function targetLight(index) {
    if (!point) return 0;
    const unit = Math.min(width / columns, height / rows);
    const dx = (((index % columns) + .5) * width / columns - point.x * width) / unit;
    const dy = ((Math.floor(index / columns) + .5) * height / rows - point.y * height) / unit;
    return .96 * Math.exp(-(dx * dx + dy * dy) / 3.125);
  }

  function paint(index, value) {
    if (Math.abs(value - painted[index]) < .001 && (value !== 0 || painted[index] === 0)) return;
    cells[index].style.setProperty('--light', value.toFixed(4));
    painted[index] = value;
  }

  function tick(now) {
    const elapsed = previousTime ? Math.min((now - previousTime) / 1000, .06) : 1 / 60;
    previousTime = now;
    let settling = false;
    for (let index = 0; index < cells.length; index++) {
      const target = targetLight(index);
      // A quick, smooth head; older cells fall away gradually without a residual plateau.
      const duration = target > light[index] ? .035 : .62;
      let value = target + (light[index] - target) * Math.exp(-elapsed / duration);
      if (Math.abs(value - target) < .0008) value = target;
      else settling = true;
      light[index] = value;
      paint(index, value);
    }
    frame = settling ? requestAnimationFrame(tick) : 0;
    if (!settling) previousTime = 0;
  }

  function update() {
    if (reducedMotion.matches) {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      for (let index = 0; index < cells.length; index++) {
        light[index] = targetLight(index);
        paint(index, light[index]);
      }
    } else if (!frame) {
      frame = requestAnimationFrame(tick);
    }
  }

  function moveTo(x, y) {
    const rect = homeField.getBoundingClientRect();
    point = { x: (x - rect.left) / rect.width, y: (y - rect.top) / rect.height };
    update();
  }

  function clearPoint() { point = null; update(); }

  function resize() {
    const style = getComputedStyle(homeField);
    const nextColumns = Number(style.getPropertyValue('--cells'));
    const nextRows = Number(style.getPropertyValue('--rows'));
    const rect = homeField.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (columns !== nextColumns || rows !== nextRows) {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      columns = nextColumns;
      rows = nextRows;
      matrix.replaceChildren();
      cells = Array.from({ length: columns * rows }, (_, index) => {
        const cell = document.createElement('span');
        cell.className = 'grid-cell' + ((index * 17 + 3) % 29 === 0 ? ' seed' : '');
        matrix.append(cell);
        return cell;
      });
      light = new Array(cells.length).fill(0);
      painted = new Array(cells.length).fill(0);
    }
    clearPoint();
  }

  homeField.addEventListener('pointermove', event => moveTo(event.clientX, event.clientY), { passive: true });
  homeField.addEventListener('pointerdown', event => moveTo(event.clientX, event.clientY), { passive: true });
  homeField.addEventListener('pointerleave', clearPoint);
  homeField.addEventListener('pointercancel', clearPoint);
  homeField.addEventListener('pointerup', event => { if (event.pointerType !== 'mouse') clearPoint(); });
  homeField.addEventListener('focusin', event => {
    const rect = event.target.getBoundingClientRect();
    moveTo(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
  homeField.addEventListener('focusout', event => { if (!homeField.contains(event.relatedTarget)) clearPoint(); });
  reducedMotion.addEventListener('change', update);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    point = null;
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    light.fill(0);
    for (let index = 0; index < cells.length; index++) paint(index, 0);
  });
  resize();
  new ResizeObserver(resize).observe(homeField);
}

// Decorative grid; native links remain usable without JavaScript or hover.
for (const field of document.querySelectorAll('[data-grid-field]:not(.research-field)')) {
  const matrix = field.querySelector('.cell-matrix');
  const trailTimers = new Map();
  let columns = 0;
  let rows = 0;
  let previousCell = -1;

  function rebuildGrid() {
    const style = getComputedStyle(field);
    const nextColumns = Number(style.getPropertyValue('--cells'));
    const nextRows = Number(style.getPropertyValue('--rows'));
    if (columns === nextColumns && rows === nextRows) return;
    columns = nextColumns;
    rows = nextRows;
    for (const timer of trailTimers.values()) window.clearTimeout(timer);
    trailTimers.clear();
    previousCell = -1;
    matrix.replaceChildren();
    for (let index = 0; index < columns * rows; index++) {
      const cell = document.createElement('span');
      cell.className = 'grid-cell' + ((index * 17 + 3) % 29 === 0 ? ' seed' : '');
      matrix.append(cell);
    }
  }

  function lightCell(column, row, prominent) {
    if (column < 0 || column >= columns || row < 0 || row >= rows) return;
    const index = row * columns + column;
    const cell = matrix.children[index];
    if (trailTimers.has(index)) window.clearTimeout(trailTimers.get(index));
    cell.classList.remove('hot', 'near');
    cell.classList.add(prominent ? 'hot' : 'near');
    trailTimers.set(index, window.setTimeout(() => {
      cell.classList.remove('hot', 'near');
      trailTimers.delete(index);
    }, prominent ? 950 : 700));
  }

  function lightAt(x, y) {
    const rect = field.getBoundingClientRect();
    const column = Math.floor((x - rect.left) / rect.width * columns);
    const row = Math.floor((y - rect.top) / rect.height * rows);
    const index = row * columns + column;
    if (index === previousCell) return;
    previousCell = index;
    lightCell(column, row, true);
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) lightCell(column + dx, row + dy, false);
  }

  field.addEventListener('pointermove', event => lightAt(event.clientX, event.clientY));
  field.addEventListener('pointerdown', event => lightAt(event.clientX, event.clientY));
  field.addEventListener('pointerleave', () => { previousCell = -1; });
  field.addEventListener('focusin', event => {
    const rect = event.target.getBoundingClientRect();
    previousCell = -1;
    lightAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
  new ResizeObserver(rebuildGrid).observe(field);
  rebuildGrid();
}

// The source gallery remains manual: no automatic slide or looping motion.
for (const gallery of document.querySelectorAll('[data-carousel]')) {
  const slides = gallery.querySelectorAll('.carousel-slide');
  const captions = gallery.querySelectorAll('.carousel-caption');
  const dots = gallery.querySelectorAll('[data-carousel-dot]');
  for (const [selected, dot] of Array.from(dots).entries()) {
    dot.addEventListener('click', () => {
      for (const [index, slide] of Array.from(slides).entries()) slide.classList.toggle('active', index === selected);
      for (const [index, caption] of Array.from(captions).entries()) caption.classList.toggle('active', index === selected);
      for (const [index, button] of Array.from(dots).entries()) {
        button.classList.toggle('active', index === selected);
        if (index === selected) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      }
    });
  }
  gallery.classList.add('is-ready');
}
