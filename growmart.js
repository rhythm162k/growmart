document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.ad-slide');
  const dots = document.querySelectorAll('.ad-nav .dot');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  let current = 0;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  leftArrow.addEventListener('click', function () {
    let next = (current - 1 + slides.length) % slides.length;
    showSlide(next);
  });
  rightArrow.addEventListener('click', function () {
    let next = (current + 1) % slides.length;
    showSlide(next);
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
      showSlide(i);
    });
  });

  // Optional: swipe support for mobile
  let startX = null;
  const track = document.querySelector('.carousel-track');
  if (track) {
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 40) {
        // swipe right
        let next = (current - 1 + slides.length) % slides.length;
        showSlide(next);
      } else if (startX - endX > 40) {
        // swipe left
        let next = (current + 1) % slides.length;
        showSlide(next);
      }
      startX = null;
    });
  }

  showSlide(0);
}); 