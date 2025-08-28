// script.js
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const cards = Array.from(document.querySelectorAll('.testimonial-card'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // safety check
  if (!slider || cards.length === 0 || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let autoSlideInterval = null;

  function getVisibleCards() {
    if (window.innerWidth <= 480) return 1;   // HP
    if (window.innerWidth <= 768) return 2;   // Tablet
    return 3; // Desktop
  }

  function getCardWidth() {
    const card = cards[0];
    const rect = card.getBoundingClientRect();
    const style = window.getComputedStyle(card);
    const marginLeft = parseFloat(style.marginLeft) || 0;
    const marginRight = parseFloat(style.marginRight) || 0;
    return Math.round(rect.width + marginLeft + marginRight);
  }

  function updateSlider() {
    const visible = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visible);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    const translateX = -currentIndex * getCardWidth();
    slider.style.transform = `translateX(${translateX}px)`;
  }

  function moveSlide(direction) {
    const visible = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visible);

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = maxIndex;
    if (currentIndex > maxIndex) currentIndex = 0;

    updateSlider();
  }

  // tombol
  prevBtn.addEventListener('click', () => { moveSlide(-1); restartAuto(); });
  nextBtn.addEventListener('click', () => { moveSlide(1); restartAuto(); });

  // auto slide
  function startAuto() {
    stopAuto();
    autoSlideInterval = setInterval(() => moveSlide(1), 4000);
  }
  function stopAuto() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }
  function restartAuto() {
    stopAuto();
    startAuto();
  }

  // pause auto slide saat user hover slider (tapi tombol tetap bisa diklik)
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // handle resize (debounced sedikit)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateSlider, 120);
  });

  // init
  updateSlider();
  startAuto();
});
