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
const navButtons = document.querySelectorAll('.nav-btn');
// Handle navigation buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      
      // Remove active class from all buttons
      navButtons.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      console.log('Navigating to:', page);
      
      // Handle navigation based on page
      switch(page) {
        case 'home':
          window.location.href = 'growmart.html';
          break;
        case 'sell':
          window.location.href = 'category-sell.html';
          break;
        case 'price':
          window.location.href = 'market-prices.html';
          break;
        case 'tips':
          window.location.href = 'tips.html';
          break;
        case 'profile':
          window.location.href = 'profile.html';
          break;
        default:
          console.log('Unknown page:', page);
      }
    });
  });

  // Add hover effects for better UX
  navButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Add touch support for mobile
  navButtons.forEach(btn => {
    let touchStartY = 0;
    let touchEndY = 0;
    
    btn.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    });
    
    btn.addEventListener('touchend', function(e) {
      touchEndY = e.changedTouches[0].clientY;
      
      // Check if it's a tap (not a scroll)
      if (Math.abs(touchStartY - touchEndY) < 10) {
        this.click();
      }
    });
  });
  document.querySelector('.see-more').addEventListener('click', function() {
    window.location.href = 'market-prices.html'; 
  });
  document.querySelector('.learn-more').addEventListener('click', function() {
    window.location.href = 'tips.html'; 
  });
