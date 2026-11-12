// Decorative grid; native links remain usable without JavaScript or hover.
for (const field of document.querySelectorAll('[data-grid-field]')) {
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
