const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

if (toggle && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const captions = Array.from(carousel.querySelectorAll('.carousel-caption'));
  const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
  let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));
  let timer;

  if (slides.length < 2) {
    return;
  }

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === current);
    });

    captions.forEach((caption, captionIndex) => {
      caption.classList.toggle('active', captionIndex === current);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === current;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const stopAuto = () => {
    window.clearInterval(timer);
  };

  const startAuto = () => {
    stopAuto();
    timer = window.setInterval(() => {
      showSlide(current + 1);
    }, 4200);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAuto();
    });
  });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);

  showSlide(current);
  startAuto();
});

const researcherList = document.querySelector('[data-researchers]');
const moreResearchers = document.querySelector('[data-more-researchers]');

if (researcherList && moreResearchers) {
  const additionalResearchers = Array.from(researcherList.children).slice(3);

  if (additionalResearchers.length) {
    moreResearchers.querySelector('.team-researcher-list').append(...additionalResearchers);
    moreResearchers.hidden = false;
  }
}

const yearNavigation = document.querySelector('.publication-years');

if (yearNavigation) {
  const expandAll = yearNavigation.querySelector('.publication-expand-all');
  const yearSelect = yearNavigation.querySelector('select');
  const years = Array.from(document.querySelectorAll('.publication-year-group'), (group) => ({
    hash: `#${group.getAttribute('aria-labelledby')}`,
    button: group.querySelector('.publication-year-toggle'),
    items: group.querySelector('.publication-year-items'),
  }));

  const setYearExpanded = ({ button, items }, expanded) => {
    button.setAttribute('aria-expanded', String(expanded));
    items.hidden = !expanded;
  };

  const updateYearNavigation = () => {
    const expandedYears = years.filter(({ items }) => !items.hidden);
    yearSelect.value = expandedYears.length === 1 ? expandedYears[0].hash : '';
  };

  const showYearFromHash = (hash) => {
    const selectedYear = years.find((year) => year.hash === hash);

    if (selectedYear || !hash) {
      for (const year of years) {
        setYearExpanded(year, !selectedYear || year === selectedYear);
      }
      updateYearNavigation();
    }
  };

  for (const year of years) {
    year.button.disabled = false;
    year.button.addEventListener('click', () => {
      setYearExpanded(year, year.items.hidden);
      updateYearNavigation();
    });
  }

  yearSelect.addEventListener('change', () => {
    const hash = yearSelect.value;
    showYearFromHash(hash);
    window.location.hash = hash;
  });

  expandAll.addEventListener('click', () => {
    if (years.some(({ hash }) => hash === window.location.hash)) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    showYearFromHash('');
  });

  window.addEventListener('hashchange', () => showYearFromHash(window.location.hash));
  showYearFromHash(window.location.hash);
  yearNavigation.hidden = false;
}
