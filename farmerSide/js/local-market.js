document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const backArrow = document.querySelector('.back-btn');

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

  // Handle back arrow
  backArrow.addEventListener('click', function() {
    console.log('Going back');
    // Navigate back to previous page
    window.history.back();
    // Or navigate to a specific page
    // window.location.href = 'market-price.html';
  });

  // Add loading state for images
  const marketImage = document.querySelector('.market-image');
  if (marketImage) {
    marketImage.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    marketImage.addEventListener('error', function() {
      this.style.opacity = '0.5';
      console.warn('Failed to load image:', this.src);
    });
  }

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = 'smooth';

  // Add page transition effects
  document.body.style.transition = 'opacity 0.3s ease';
  
  // Fade in effect on page load
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // Add keyboard navigation support
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Go back when Escape key is pressed
      window.history.back();
    }
  });

  // Add visual feedback for interactions
  const marketCard = document.querySelector('.market-card');
  if (marketCard) {
    marketCard.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    });
    
    marketCard.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    });
  }

  // Export functions for use in other scripts
  window.localMarketUtils = {
    goBack: () => {
      window.history.back();
    },
    navigateTo: (page) => {
      const btn = document.querySelector(`[data-page="${page}"]`);
      if (btn) {
        btn.click();
      }
    }
  };
}); 
document.querySelector('.lang-btn').addEventListener('click', () => {
  const langBtn = document.querySelector('.lang-text');
  if (langBtn.textContent === 'EN') {
      langBtn.textContent = 'BN';
  } else {
      langBtn.textContent = 'EN';
  }
});
