// Optional: pause carousel saat hover
const carousel = document.querySelector('#carouselExampleFade');
if (carousel) {
  carousel.addEventListener('mouseenter', () => {
    bootstrap.Carousel.getInstance(carousel).pause();
  });
  carousel.addEventListener('mouseleave', () => {
    bootstrap.Carousel.getInstance(carousel).cycle();
  });
}
