// The grid is decorative. The four permanently lit anchors are the navigation.
const field = document.querySelector('.research-field');
const matrix = document.querySelector('.cell-matrix');
const trailTimers = new Map();
let columns = 16;
let rows = 10;
let previousCell = -1;

function rebuildGrid() {
  const style = getComputedStyle(field);
  columns = Number(style.getPropertyValue('--cells'));
  rows = Number(style.getPropertyValue('--rows'));
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
  for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1]]) lightCell(column + dx, row + dy, false);
}

field.addEventListener('pointermove', event => lightAt(event.clientX, event.clientY));
field.addEventListener('pointerdown', event => lightAt(event.clientX, event.clientY));
field.addEventListener('pointerleave', () => { previousCell = -1; });
for (const link of document.querySelectorAll('.research-tile')) {
  link.addEventListener('focus', () => {
    previousCell = -1;
    const rect = link.getBoundingClientRect();
    lightAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
}
let lastColumns = 0;
new ResizeObserver(() => {
  const currentColumns = Number(getComputedStyle(field).getPropertyValue('--cells'));
  if (currentColumns !== lastColumns) {
    lastColumns = currentColumns;
    rebuildGrid();
  }
}).observe(field);
rebuildGrid();
