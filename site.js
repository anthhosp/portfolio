  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('on'), i * 80);
    });
  }, { threshold: 0.07 });
  els.forEach(el => io.observe(el));

(function () {
  var nav = document.querySelector('nav'), b = document.querySelector('.burger');
  if (!nav || !b) return;
  function close() { nav.classList.remove('open'); b.textContent = '☰'; b.setAttribute('aria-expanded', 'false'); }
  b.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    b.textContent = open ? '✕' : '☰';
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
})();
