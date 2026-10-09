function openVeille() {
  const m = document.getElementById('modal-veille');
  const box = document.getElementById('modal-box');
  const bg = document.getElementById('modal-bg');
  m.style.visibility = 'visible';
  m.style.pointerEvents = 'all';
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    bg.style.opacity = '1';
    box.style.opacity = '1';
    box.style.transform = 'translateY(0) scale(1)';
  }, 10);
}
function closeVeille() {
  const m = document.getElementById('modal-veille');
  const box = document.getElementById('modal-box');
  const bg = document.getElementById('modal-bg');
  bg.style.opacity = '0';
  box.style.opacity = '0';
  box.style.transform = 'translateY(16px) scale(0.97)';
  setTimeout(() => {
    m.style.visibility = 'hidden';
    m.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  }, 260);
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVeille(); });
