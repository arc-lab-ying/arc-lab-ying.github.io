// Native roster links and the complete profile sequence are the no-JS fallback.
const explorer = document.querySelector('.people-explorer');
const profiles = Array.from(explorer.querySelectorAll('[data-team-profile]'));
const status = explorer.querySelector('.explorer-status');
const controls = [];

for (const link of explorer.querySelectorAll('[data-select-profile]')) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = link.className;
  button.dataset.selectProfile = link.dataset.selectProfile;
  button.setAttribute('aria-label', link.getAttribute('aria-label'));
  button.setAttribute('aria-controls', link.dataset.selectProfile);
  button.setAttribute('aria-pressed', 'false');
  button.append(...link.childNodes);
  link.replaceWith(button);
  controls.push(button);
  button.addEventListener('click', event => {
    selectProfile(button.dataset.selectProfile, true);
    // Touch/mouse selection on a narrow screen brings the selected profile into view.
    if (event.detail > 0 && window.matchMedia('(max-width: 760px)').matches) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById(button.dataset.selectProfile).scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
    }
  });
}

function selectProfile(id, updateAddress = false) {
  const selected = profiles.find(profile => profile.id === id) || profiles[0];
  for (const profile of profiles) profile.hidden = profile !== selected;
  for (const button of controls) button.setAttribute('aria-pressed', String(button.dataset.selectProfile === selected.id));
  const name = selected.querySelector('h2').textContent;
  const role = selected.querySelector('.explorer-role').textContent;
  status.textContent = `Showing ${name}, ${role}.`;
  if (updateAddress) window.history.replaceState(null, '', '#' + selected.id);
}

// No arrow-key listener: concept navigation keeps its existing global shortcuts.
selectProfile(window.location.hash.slice(1));
explorer.classList.add('is-enhanced');
window.addEventListener('hashchange', () => {
  if (profiles.some(profile => '#' + profile.id === window.location.hash)) selectProfile(window.location.hash.slice(1));
});
