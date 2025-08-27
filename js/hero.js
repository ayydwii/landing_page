const heroBg = document.querySelector(".hero-bg");
const dots = document.querySelectorAll(".dot");

const images = [
  "../img/hero1.jpg",
  "../img/hero2.jpg",
  "../img/hero3.jpg"
];

let index = 0;

function changeBackground() {
  heroBg.style.backgroundImage = `url(${images[index]})`;

  // update dots
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

  index = (index + 1) % images.length;
}

// pertama kali load
changeBackground();
// ganti otomatis tiap 4 detik
setInterval(changeBackground, 4000);
