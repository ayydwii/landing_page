let currentIndex = 0;
const slider = document.getElementById('slider');
const cards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function getVisibleCards() {
  if (window.innerWidth <= 480) return 1;   // HP
  if (window.innerWidth <= 768) return 2;   // Tablet
  return 3; // Desktop
}

function moveSlide(direction) {
  const visibleCards = getVisibleCards();
  const cardWidth = cards[0].offsetWidth + 30; 
  const maxIndex = cards.length - visibleCards;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = maxIndex;
  if (currentIndex > maxIndex) currentIndex = 0;

  slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
}

// Event tombol
prevBtn.addEventListener("click", () => moveSlide(-1));
nextBtn.addEventListener("click", () => moveSlide(1));

// Auto Slide tiap 4 detik
setInterval(() => {
  moveSlide(1);
}, 4000);

// Reset posisi ketika resize agar tidak bug
window.addEventListener("resize", () => {
  currentIndex = 0;
  slider.style.transform = "translateX(0)";
});
