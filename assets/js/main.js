(() => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const target = a.getAttribute('href').split('/').pop();
    if (target === current) a.classList.add('active');
  });
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  const typed = document.querySelector('[data-typed]');
  if (typed) {
    const words = ['Software Developer', 'Problem Solver', 'CS Student'];
    let word = 0, char = 0, deleting = false;
    const tick = () => {
      const text = words[word];
      typed.textContent = text.slice(0, char);
      if (!deleting && char < text.length) char++;
      else if (!deleting) { deleting = true; setTimeout(tick, 1300); return; }
      else if (char > 0) char--;
      else { deleting = false; word = (word + 1) % words.length; }
      setTimeout(tick, deleting ? 45 : 85);
    };
    tick();
  }
  const tilt = document.querySelector('[data-tilt]');
  if (tilt && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tilt.addEventListener('pointermove', e => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      tilt.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
    });
    tilt.addEventListener('pointerleave', () => tilt.style.transform = 'rotateY(0) rotateX(0)');
  }
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
