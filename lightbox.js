let lbImages = [], lbIndex = 0;

function openLightbox(imgs, captions, thumbEl) {
  // Accepte une image seule ou un tableau
  lbImages = Array.isArray(imgs) ? imgs : [imgs];
  const caps = Array.isArray(captions) ? captions : [captions];
  lbIndex = 0;

  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lightbox-content');

  if (thumbEl) {
    const r = thumbEl.getBoundingClientRect();
    content.style.setProperty('--lb-ox', ((r.left + r.width/2) / window.innerWidth * 100).toFixed(1) + '%');
    content.style.setProperty('--lb-oy', ((r.top + r.height/2) / window.innerHeight * 100).toFixed(1) + '%');
  }

  // Stocker les captions dans un attribut data
  lb.dataset.captions = JSON.stringify(caps);

  updateLightboxSlide();
  document.body.style.overflow = 'hidden';
  lb.classList.remove('closing');
  lb.classList.add('open');
}

function updateLightboxSlide() {
  const lb = document.getElementById('lightbox');
  const caps = JSON.parse(lb.dataset.captions || '[]');
  document.getElementById('lightbox-img').src = lbImages[lbIndex];
  document.getElementById('lightbox-caption').textContent = caps[lbIndex] || '';
  document.getElementById('lb-counter').textContent = lbImages.length > 1 ? `${lbIndex + 1} / ${lbImages.length}` : '';
  document.getElementById('lb-prev').style.display = lbImages.length > 1 ? 'flex' : 'none';
  document.getElementById('lb-next').style.display = lbImages.length > 1 ? 'flex' : 'none';
}

function lbNav(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  updateLightboxSlide();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.add('closing');
  setTimeout(() => {
    lb.classList.remove('open', 'closing');
    document.body.style.overflow = '';
  }, 240);
}

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (!document.getElementById('lightbox-content').contains(e.target) && e.target.id !== 'lightbox-close') {
    closeLightbox();
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft')  lbNav(-1);
});
