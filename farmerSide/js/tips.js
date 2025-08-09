document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

const navButtons = document.querySelectorAll('.nav-btn');

// 1. Highlight correct button on load
const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
navButtons.forEach(btn => {
  if (btn.dataset.page === currentPage) {
    btn.classList.add('active');
  } else {
    btn.classList.remove('active');
  }
});

// 2. Handle navigation clicks
navButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const page = this.dataset.page;
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
    }
  });

  // Hover effect
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });

  // Touch support for mobile
  let touchStartY = 0;
  btn.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  });
  btn.addEventListener('touchend', e => {
    if (Math.abs(touchStartY - e.changedTouches[0].clientY) < 10) {
      btn.click();
    }
  });
});
