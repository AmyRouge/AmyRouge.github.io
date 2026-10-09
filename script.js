(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // scroll reveal with a small stagger inside each group
  const items = [...document.querySelectorAll('.reveal')];
  items.forEach((el) => {
    const sibs = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    el.style.setProperty('--d', Math.min(sibs.indexOf(el), 6) * 0.07 + 's');
  });
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add('in'));

  // cycling role line (types out, holds, erases)
  const role = document.getElementById('role');
  if (role && !reduce) {
    const roles = JSON.parse(role.dataset.roles);
    let i = 0, n = roles[0].length, dir = 0, wait = 0;
    setInterval(() => {
      if (wait > 0) { wait--; return; }
      const word = roles[i];
      if (dir === 0) { n++; if (n >= word.length) { dir = 1; wait = 26; } }
      else { n--; if (n <= 0) { dir = 0; i = (i + 1) % roles.length; n = 0; wait = 4; } }
      role.textContent = roles[i].slice(0, n) || ' ';
    }, 55);
  }

  // card spotlight follows the cursor
  document.addEventListener('pointermove', (e) => {
    const c = e.target.closest && e.target.closest('.card');
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', e.clientX - r.left + 'px');
    c.style.setProperty('--my', e.clientY - r.top + 'px');
  }, { passive: true });

  // highlight the nav link for the section in view
  const links = [...document.querySelectorAll('.nav nav a')];
  const secs = links.map((a) => document.querySelector(a.hash));
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.hash === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach((s) => s && so.observe(s));
  }

  // the wave video: keep it still for reduced-motion visitors
  const v = document.querySelector('.wave');
  if (v && reduce) { v.removeAttribute('autoplay'); v.pause(); }

  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
